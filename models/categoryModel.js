const db = require("./database.js");

module.exports = {
    getAllCategories: async () => {
        try {
            const data = await db.any('select * from "Categories" order by "CategoryID" ASC');
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getCategoryByID: async (id) => {
        try {
            const data = await db.one('select * from "Categories" where "CategoryID"=$1', [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    }
};
