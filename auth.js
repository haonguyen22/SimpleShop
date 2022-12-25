const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const https = require("https");
const fs = require("fs");

const userRouter = require("./routers/userRouter.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT_AUTH || 3113;

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

app.use("/user", userRouter);

const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
