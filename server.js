//server
const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
