const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAuthToken = (id) =>
    jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET);

module.exports = generateAuthToken;
