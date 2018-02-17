const fs = require('fs');
const path = require('path');
const jwtToken = require('jsonwebtoken');
const secretKey = fs.readFileSync(path.resolve(__dirname, 'private.key'));

class Auth {


  constructor(){
    this.authOptions =  {
      expiresIn: '30 days'
    };
  }

  signToken(payload) {
    return new Promise(resolve => {
      jwtToken.sign({ user : payload }, secretKey, this.authOptions, (err, token) => {
        resolve(token);
      });
    })
  }

  verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader !== undefined) {
      const token = bearerHeader.split(' ')[1];
      jwtToken.verify(token, secretKey, (err, authData) => {
        if(err){
          res.sendStatus(403);
        }else{
          req.authData = authData;
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
}

module.exports = Auth;


