const mongoose = require("mongoose")
const logger = require ("../../utils/logger")
const dbClient = require ("./DBClientClass.js")
const config = require ("../../config/config")

class MongoClient extends DBClient {
    constructor() {
      super();
      this.client = mongoose;
    }
  
    async connect() {
      try {
        this.client.connect(config.URLMongo, (err, res)=>{
          if (err) throw err;
          return logger.info("Mongo Database connected");
        })
      } catch (err) {
          throw {message: 'Error in connecting MongoDB', status: 500};
      }
    }
  
    async disconnect() {
      try {
        await this.client.connection.close();
  
        logger.info("Database disconnected");
      } catch (err) {
          throw {message: 'Error in disconnecting MongoDB', status: 500};
      }
    }
  }

  module.exports = MongoClient;