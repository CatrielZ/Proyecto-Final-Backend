const MongoClient = require ("./mongoClient")
class DBFactory {
    static createDBclient(databaseName) {
        if (databaseName == "GymBro") {
            return new MongoClient();
        } else{
            throw {
          message: `Error in DBFactory, ${databaseName} not exist`,
          status: 500,
        };
      }
    }
}
module.exports = DBFactory;