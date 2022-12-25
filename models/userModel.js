const db = require("./database.js");

module.exports = {
    getAllUsers: async () => {
        try {
            const data = await db.any('select * from "Users"');
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getUserByUsername: async (username) => {
        try {
            const data = await db.one('select * from "Users" where "Username"=$1', [username]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getUserById: async (id) => {
        try {
            const data = await db.one('select * from "Users" where "UserID"=$1', [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    insertUser: async (user) => {
        try {
            const maxId = await db.one('select max("UserID") from "Users"');
            if (maxId.max === null) {
                id = 1;
            } else id = parseInt(maxId.max) + 1;

            const data = await db.one('Insert into "Users" values ($1, $2, $3, $4, $5, $6)', [
                id,
                user.username,
                user.password,
                user.fullname,
                user.token,
                user.address,
            ]);
            return data;
        } catch (e) {
            console.log(e);
        }
    }
};
