const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const homeRouter = require("./routers/homeRouter.js");
const categoryRouter = require("./routers/categoryRouter.js");
const productRouter = require("./routers/productRouter.js");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();

const port = process.env.PORT_SERVER_SHOP || 20470;

app.use(morgan("tiny"));

app.set("trust proxy", 1);
app.use(
    session({
        secret: "this is a super secret session sign in string",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 10 * 60 * 60 * 1000 },
    }),
);
app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use("/", homeRouter);

app.use("/category", categoryRouter);

app.use("/product", productRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
