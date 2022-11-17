const ProductDaoMongo = require ("./productsModelDaoMongo");
const UserDaoMongo = require ("../usuarioModel");

const logger = require ("../../utils/logger")

class DAOFactory {
    static createDao(name, database) {
      try {
        if (database == "mongoDB") {
          switch (name) {
            case "product": return ProductsDaoMongo.getInstance();
            case "user": return UsersDaoMongo.getInstance();
            default:
              throw {
                message: `Error in DAOFactory, ${name} DAO not exist`,
                status: 500,
              };
          }
        }else{
            throw {
              message: `Error in DAOFactory, ${database} not exist`,
              status: 500,
            };
          }
        } catch (error) {
          logger.error(error.message);
        }
    
      }
    }

    module.exports = DAOFactory;