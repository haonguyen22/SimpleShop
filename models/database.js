const pgp = require("pg-promise")();

const cn = require("../configs/cnStr.js");

const db = pgp(cn);

module.exports = db;
