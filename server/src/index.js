const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

const route = require("./routes");

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors());

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
