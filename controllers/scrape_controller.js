const puppeteer = require('puppeteer');
const ScrapedData = require('../models/scraped_data');

exports.scrapeWebsite = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const title = await page.title();
  const products = await page.evaluate(() => {
    const products = Array.from(document.querySelectorAll('.product'));
    return products.map((product) => product.textContent);
  });
  const screenshots = [];
  for (let i = 0; i < 3; i++) {
    screenshots.push(`screenshot-${i}.png`);
    await page.screenshot({ path: `./public/${screenshots[i]}` });
  }

  await browser.close();

  const scrapedData = new ScrapedData({ title, url, products, screenshots });
  await scrapedData.save();
  return scrapedData;
};

exports.getScrapedData = async () => {
  const scrapedData = await ScrapedData.findOne().sort({ createdAt: -1 }).exec();
  return scrapedData;
}