//server
const express = require("express");
const routes = require("./routes");
const { startScrape, removeID } = require("./utils/webScrapper");
const dotenv = require("dotenv");
const cors = require("cors");
const { nextTick } = require("process");
const DateCheck = require("./utils/dayCheck");
const PORT = process.env.PORT || 3001;
const app = express();

const dateCheck = new DateCheck();

// app.use(newMonth);
app.use((req, res, next) => {
  //check the date method
  dateCheck.checkNewDay();
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);
dotenv.config();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
