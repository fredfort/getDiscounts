const express = require('express');
const Auth = require('../auth/auth');
const route = express.Router();

const auth = new Auth();


// ROUTES 
route.get('/', (req, res) => {
  const user = {
    id: 1,
    firstName: 'Fred'
  }
  auth.signToken(user).then((token) => {
    res.json({ token, user });
  });

});

route.post('/', (req, res) => {

});

route.put('/', auth.verifyToken, (req, res) => {
  res.send('TO BE IMPLEMENTED');
});

route.delete('/:productId', auth.verifyToken, (req, res) => {
  res.send('TO BE IMPLEMENTED');
});

module.exports = route;