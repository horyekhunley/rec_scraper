const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const { engine } = require('express-handlebars');
const scrapeRoutes = require('./routes/scrape_route');

const app = express();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Set up Handlebars template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})
// Set up routes
app.use('/', scrapeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
