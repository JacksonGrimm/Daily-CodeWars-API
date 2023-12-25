const router = require("express").Router();

const dailyCodeWars = require("./dailyCodeWars");

const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
});

router.use("/api", limiter, dailyCodeWars);

module.exports = router;
