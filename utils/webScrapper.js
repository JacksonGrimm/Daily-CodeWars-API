const axios = require("axios");
const cheerio = require("cheerio");

class ScrapeCodeWars {
  constructor(url, date) {
    this.url = url;
    this.date = date;

    this.currentId;
  }

  isNewDay = () => {
    return new Date().getDate() !== this.date.getDate();
  };

  queryCodeWars = async () => {
    try {
      const response = await axios.get(this.url);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getResponseIds = (response) => {
    const $ = cheerio.load(response.data);
    let ids = [];
    $(".list-item-kata").each((id, el) => ids.push($(el).attr("id")));
    return ids;
  };

  storeIds = (ids) => {
    this.ids = ids;
  };

  startScrape = async () => {
    const codeWarsResponse = await this.queryCodeWars();
    const codeWarsIds = this.getResponseIds(codeWarsResponse);
    this.storeIds(codeWarsIds);
  };

  getId = async () => {
    if (!this.ids || this.ids.length <= 0) {
      await this.startScrape();
      this.currentId = undefined;
    }

    if (this.isNewDay()) {
      this.date = new Date();
      this.currentId = undefined;
      return this.getId();
    }

    if (!this.currentId) {
      const id = this.ids.pop();
      this.currentId = id;
      this.storeIds(this.ids.filter((el) => el !== id));
    }

    return this.currentId;
  };
}

const ScrapeJsCodeWars = new ScrapeCodeWars(
  "https://www.codewars.com/kata/search/javascript?q=&beta=false&order_by=sort_date+desc&sample=true",
  new Date()
);

module.exports = { ScrapeJsCodeWars };
