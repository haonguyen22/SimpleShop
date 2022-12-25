const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECURE, (err, decodedToken) => {
            if (err) {
                return res.redirect("https://localhost:3113/user/login");
            } else {
                next();
            }
        });
    } 
    else return res.redirect("https://localhost:3113/user/login");
};
