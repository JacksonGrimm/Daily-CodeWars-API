const router = require("express").Router();
const axios = require("axios");
const { getOneID, startScrape } = require("../utils/webScrapper");
const dotenv = require("dotenv");
dotenv.config();

router.get("/getDailyChallenge", async (req, res) => {
  const getFromCodeWars = async (ID) => {
    try {
      const data = await axios.get(
        `https://www.codewars.com/api/v1/code-challenges/${ID}`
      );
      res.send(data.data);
    } catch (error) {
      console.log(ID);
      console.log(error);
    }
  };
  ID = await getOneID();
  getFromCodeWars(ID);
});

router.get(`/getDailyChallenge/${process.env.PASS}`, async (req, res) => {
  await startScrape();
});

module.exports = router;
