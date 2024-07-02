const mongoose = require("mongoose");
mongoose.set("bufferCommands", true);
// name, last, buy, Sell, volume, base_unit
const stockStructure = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
  },
  last: {
    type: String,
    uppercase: true,
  },
  buy: {
    type: String,
    uppercase: true,
  },
  sell: {
    type: String,
    uppercase: true,
  },
  volume: {
    type: String,
    uppercase: true,
  },
  base_unit: {
    type: String,
    uppercase: true,
  },
});
const StockData = new mongoose.model("StockData", stockStructure);
module.exports = StockData;
