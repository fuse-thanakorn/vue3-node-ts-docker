const express = require('express');
const router = express.Router();
const stocks = require("./stocks");


router.use("/stocks",stocks);

export default router;
