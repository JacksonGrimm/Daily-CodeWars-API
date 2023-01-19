//server
const express = require("express");
const routes = require("./routes");
const { startScrape, removeID } = require("./utils/webScrapper");

const { nextTick } = require("process");
// const aws = require("./utils/aws");
// check new day
const checkNewDay = async function (req, res, next) {
  let newDate = new Date();
  newDate = newDate.getDate();
  if (newDate !== lastDate || lastDate === "") {
    lastDate = newDate;
    console.log("its a new day!!!");
    await removeID();
  }
  next();
};
//check if its a new month
// const newMonth = function (req, res, next) {
//   let newDate = new Date();
//   newDate = newDate.getDate();
//   if (newDate === 28 || lastDate === "") {
//     console.log("get new ids");
//     startScrape();
//   }
//   next();
// };

const PORT = process.env.PORT || 3001;
const app = express();

let lastDate = "";
app.use(newMonth);
app.use(checkNewDay);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
