const express = require('express');
const { getScrapedData } = require('../controllers/scrape_controller')

const router = express.Router();

router.get('/', async (req, res) => {
  const scrapedData = await getScrapedData();
  res.render('index', { scrapedData });
});

router.post('/', async (req, res) => {
  const { url } = req.body;
  const scrapedData = await scrapeWebsite(url)
  res.render('index', { scrapedData });
});

module.exports = router