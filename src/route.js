const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const route = new express.Router();
const hbs = require("hbs");
const StockData = require("./schema");
require("./conct");
const dynamicStore = path.join(__dirname, "../templates/views");
const partialStore = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", dynamicStore);
hbs.registerPartials(partialStore);
route.get("/fetch-top-tickers", async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = response.data;

    //  Get top 10 tickers
    const topTickers = Object.values(tickers)
      .sort((a, b) => b.volume - a.volume)
      .slice(10, 11)
      .map((ticker) => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      }));

    // Save to database
    await StockData.insertMany(topTickers);
    res.status(200).send("top 10 datas are inserted");
  } catch (error) {
    res.status(500).send("Error fetching tickers: " + error.message);
  }
});
route.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(404).send(error);
  }
});
route.get("/tickers", async (req, res) => {
  try {
    const tickers = await StockData.find({});
    res.send(tickers);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Server error");
  }
});

module.exports = route;
