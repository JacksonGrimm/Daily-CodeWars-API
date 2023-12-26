const router = require("express").Router();
const axios = require("axios");

const { ScrapeJsCodeWars } = require("../utils/webScrapper");

const dotenv = require("dotenv");
dotenv.config();

router.get("/getDailyChallenge", async (req, res) => {
  try {
    const id = await ScrapeJsCodeWars.getId();
    const response = await axios.get(
      `https://www.codewars.com/api/v1/code-challenges/${id}`
    );
    console.log(`QUERY SUCCESSFUL: ${JSON.stringify(req.headers)} \n`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.get(`/getDailyChallenge/${process.env.API_KEY}`, async (req, res) => {
  await ScrapeJsCodeWars.startScrape();
  console.log(await ScrapeJsCodeWars.getId());

  res.send("getting Ids...");
  res.status(200);
});

module.exports = router;
