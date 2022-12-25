const homeHps = require("../helpers/homeHps");
const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

exports.homePage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const products = await productModel.getAllProducts(page);
    const categories = await categoryModel.getAllCategories();

    res.render("home", { helpers: homeHps, categories, products, page, title: "Categories" });
};
