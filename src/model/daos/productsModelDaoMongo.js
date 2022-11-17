const {MongoContainer} = require ("./containers/containerDaoMongo");
const logger = require ("../../utils/logger")
const productModel = require("../productModel")


let instance = null;

class ProductDAO extends MongoContainer {
    constructor(){
        super("product", productModel);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductDAO();
        }
        
        return instance;
    }
    
    async getByCategory(category, sort = {}){
        try {
            const data = await this.model.find({categoria: category}).sort(sort);
            return data;
        } catch (error) {
            logger.warn(`error in getting products by category (productsModel.DAO): ${error}`);
            throw {message:'error in getting products', status: 500};
        }
    }

    async updateStockById(idProd, quantitySold){
        try {
            await this.model.updateOne({_id: idProd}, {$inc: {stock: -quantitySold}});
        } catch (error) {
            logger.warn(`error in updating Stock by Id (productsModel.DAO): ${error}`);
            throw {message: `error in updating Stock Product`, status: 500};
        }
    }
}

module.exports = ProductDAO;