//server
const express = require("express");
const routes = require("./routes");
const { startScrape, removeID } = require("./utils/webScrapper");
const dotenv = require("dotenv");
const cors = require("cors");

const { nextTick } = require("process");
// const aws = require("./utils/aws");
// check new day

let pastDay = "";
let newMonth = false;
const checkNewDay = async function (req, res, next) {
  let newDate = new Date();
  newDate = newDate.getDate();
  if (newDate === 1) {
    newMonth = false;
  }
  //checks if new month is true so it doesnt run on ever request on the 30th
  if (newDate === 30 && newMonth === false) {
    newMonth = true;
    console.log("getting new ids");
    await startScrape();
  }
  console.log(newDate, pastDay);
  if (newDate !== pastDay) {
    //get the new Index
    console.log("its a new Day!");
    pastDay = newDate;
    await removeID();
  }
  next();
};

const PORT = process.env.PORT || 3001;
const app = express();

// app.use(newMonth);
app.use(checkNewDay);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);
dotenv.config();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
