const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
  title: String,
  url: String,
  products: [String],
  screenshots: [String],
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData;
