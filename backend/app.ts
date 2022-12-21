const express = require("express");
const corsArray = "http://localhost:3333";
const app = express();
const port = 3000;
const cors = require("cors");
import  routes  from "./routes/v1";
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  cors({
    origin: corsArray,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true,
    optionsSuccessStatus: 204,
  });
  next();
});
app.use("/api/v1", routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
