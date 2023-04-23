require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

const route = require("./routes");

var whitelist = ["https://helendo-weld.vercel.app", "localhost:8321"];
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const db = require("./config/db");

// Connect to DB
db.connect();

// Http logger
app.use(morgan("common"));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
