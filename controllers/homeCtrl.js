const homeHps = require("../helpers/homeHps");
const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const jwt = require("jsonwebtoken");

exports.homePage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const products = await productModel.getAllProducts(page);
    const categories = await categoryModel.getAllCategories();

    let user;

    try {
        user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECURE);
    } catch (error) {
        console.log(error);
    }

    res.render("home", { helpers: homeHps, categories, products, user, page, title: "Categories" });
};
