const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getLoginPage = (req, res) => {
    return res.render("login", { style: "login", title: "login" });
};

exports.postLogin = async (req, res, next) => {
    const { username, password, check } = req.body;
    let expire = parseInt(req.body.expire);

    if (!check) expire = 600000; // Default: 10 minutes

    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.render("login", {
                title: "Đăng nhập",
                username,
                password,
                status: "Username hoặc password không đúng",
            });
        }
        try {
            const cmp = await bcrypt.compare(password, user.Password);
            let token;
            if (cmp) {
                token = jwt.sign(user, process.env.ACCESS_TOKEN_SECURE, {
                    expiresIn: `${expire}`,
                });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: `${expire}`,
                });

                res.redirect("http://localhost:20470/");
            } else {
                return res.render("login", {
                    title: "Đăng nhập",
                    username,
                    password,
                    status: "Username hoặc password không đúng",
                });
            }
        } catch (err) {
            console.log(err);
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getRegisterPage = (req, res) => {
    res.render("register", { style: "register", title: "Register" });
};

exports.postRegister = async (req, res) => {
    const { username, password, fullname, address } = req.body;
    let token = " ";

    const passHashed = await bcrypt.hashSync(password, saltRounds);

    const isUsernameExist = await userModel.getUserByUsername(username);
    const newUser = {
        username,
        password: passHashed,
        fullname,
        token,
        address,
    };

    if (!isUsernameExist) {
        await userModel.insertUser(newUser);
        res.render("register", {
            title: "Đăng ký",
            username,
            password,
            fullname,
            address,
            status: "Đăng ký thành công",
            success: true,
        });
    } else {
        res.render("register", {
            title: "Đăng ký",
            username,
            password,
            fullname,
            address,
            status: "Username đã tồn tại, vui lòng chọn username khác",
            success: false,
        });
    }
};

exports.logOut = (req, res, next) => {
    res.cookie("token", "", { maxAge: 1 });
    return res.redirect("login");
};

