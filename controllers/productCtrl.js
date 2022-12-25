const hps = require("./../helpers/homeHps.js");
const productModel = require("./../models/productModel.js");
const categoryModel = require("./../models/categoryModel.js");

exports.getProductByCategoryID = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const CategoryID = parseInt(req.params.id);

    const products = await productModel.getAllProductsByCategoryID(CategoryID, page);
    const category = await categoryModel.getCategoryByID(CategoryID);
    const categories = await categoryModel.getAllCategories();

    res.render("home", { helpers: hps, category, categories, products, page, title: category.CatName });
};
