const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const posts = require("./routes/posts");

const error = require("./utilities/error");

const app = express();
const port = 3000;