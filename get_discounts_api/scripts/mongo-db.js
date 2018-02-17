var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/getDiscounts';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Database created!');
  var dbo = db.db('getDiscounts');
  dbo.createCollection('products', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['description', 'quantity', 'active'],
        properties: {
          description: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          quantity: {
            bsonType: 'int',
            minimum: 0,
            description: 'must be a positive integer and is required'
          },
          active: {
            bsonType: 'bool',
            description: 'must be a boolean and is required'
          }
        }
      }
    }
  }, function (err, res) {
    if (err) throw err;
    console.log('Collection created!');
    db.close();
  });
});