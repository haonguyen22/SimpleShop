const db = require("./database.js");
const pageSize = 10;

module.exports = {
    getAllProducts: async (page = 1) => {
        try {
            const size = await db.one('select count(*) from "Products"');
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const data = await db.any(`SELECT * FROM "Products" LIMIT ${pageSize} OFFSET ${offset}`);
            return {
                pageTotal,
                data,
            };
        } catch (e) {
            console.log(e);
        }
    },
    getProductByID: async (id) => {
        try {
            const data = await db.one('select * from "Products" where "ProductID"=$1', [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getAllProductsByCategoryID: async (CategoryID, page = 1) => {
        try {
            const size = await db.one('select count(*) from "Products" where "CategoryID"=$1', [CategoryID]);
            const pageTotal = Math.ceil(size.count / pageSize);
            const offset = (page - 1) * pageSize;
            const data = await db.any(
                `SELECT * FROM "Products" where "CategoryID"=$1 LIMIT ${pageSize} OFFSET ${offset}`,
                [CategoryID],
            );
            return {
                pageTotal,
                data,
            };
        } catch (e) {
            console.log(e);
        }
    }
};
