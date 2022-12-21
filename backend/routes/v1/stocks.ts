const express = require("express");
const router = express.Router();
const stock_path =
  "https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json";
import axios from "axios";
router.get("/GetFundsByRange", async (req, res) => {
  try {
    const response = await axios.get(stock_path);
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
