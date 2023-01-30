const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const scrapeCodeWars = async () => {
  try {
    const response = await axios.get(
      "https://www.codewars.com/kata/search/javascript?q=&beta=false&order_by=sort_date+desc&sample=true"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    let ids = [];
    $(".list-item-kata").each((_idx, el) => ids.push($(el).attr("id")));
    return ids;
  } catch (error) {
    console.log(error);
  }
};
const storeID = async (newIDs) => {
  fs.readFile(
    path.join(__dirname, "/data/codeWarsIDs.json"),
    "utf8",
    (error, data) => {
      return error ? console.log(error) : fileData(data, newIDs);
    }
  );
  const fileData = (data, newIDs) => {
    //parses fileDaya
    data = JSON.parse(data);
    //sets new data to the array value of file data
    let newData = data;

    newIDs.forEach((element) => {
      //only pushes new elements to the newData array so there is no duplicates
      if (!data.includes(element)) {
        newData.push(element);
      }
    });
    console.log(newData.length);
    newData = JSON.stringify(newData);
    //save file
    fs.writeFile(
      path.join(__dirname, "/data/codeWarsIDs.json"),
      newData,
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  };
};
const startScrape = async () => {
  const data = fs.promises.writeFile(
    path.join(__dirname, "/data/codeWarsIDs.json"),
    "[]",
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  console.log("wrote file");
  for (let i = 0; 1 > i; i++) {
    ids = await scrapeCodeWars();
    console.log(ids);
    storeID(ids);
  }
};

const removeID = async () => {
  try {
    let data = await fs.promises.readFile(
      path.join(__dirname, "/data/codeWarsIDs.json"),
      "utf8",
      (error, data) => {
        return error ? console.log(error) : fileData(data);
      }
    );
    //parses fileData
    data = JSON.parse(data);
    //sets new data to the array value of file data
    const singleID = data.pop();
    //writes over data with new data
    data = JSON.stringify(data);
    fs.writeFile(
      path.join(__dirname, "/data/codeWarsIDs.json"),
      data,
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
    console.log(singleID);
    return singleID;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getOneID = async () => {
  let data = await fs.promises.readFile(
    path.join(__dirname, "/data/codeWarsIDs.json"),
    "utf8",
    (error, data) => {
      return error ? console.log(error) : fileData(data);
    }
  );
  //parses fileData
  data = JSON.parse(data);
  const singleID = data.pop();
  console.log(singleID);
  return singleID;
};
module.exports = { startScrape, getOneID, removeID };
