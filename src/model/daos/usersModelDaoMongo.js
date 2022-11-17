const {MongoContainer} = require ("./containers/containerDaoMongo.js")
const logger =require ("../../utils/logger");
const userModel = require ("../usuarioModel")

let instance = null;

class UserDAO extends MongoContainer {
    constructor(){
        super("user", userModel);
    }

    static getInstance(){
        if(!instance){
            instance = new UserDAO();
        }
        
        return instance;
    }

    async getByEmail(email){
        try {
            const data = await this.model.findOne({email});
            return data; 
        } catch (error) {
            logger.warn(`error al obtener user por EMAIL: ${error}`);
        }
    }
}

module.exports = UserDAO