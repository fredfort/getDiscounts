const express = require('express');
const manager = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Auth = require('./auth/auth');
const productRoutes = require('./product/product-routes');
const userRoutes = require('./user/user-routes');

app.set('port', process.env.PORT || 3000);
const auth = new Auth();

//DATABASE CONNECTION 
var uri = "mongodb://mongo:27017";
mongoose.connect(uri + "/getDiscounts");
var db = mongoose.connection;
db.on('error', () =>  console.log("Mongodb connection error"))
db.once('open', () =>  console.log("Connected to getDiscounts"));


// CORS 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next();
});

// PARSER FOR POST REQUEST 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ROUTES
app.use('/product', auth.verifyToken, productRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API works\n');
});



// LISTEN CHANGES
app.listen(3000, () => console.log('Example app listening on port '+ app.get('port')));