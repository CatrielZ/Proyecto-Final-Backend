const usersService = require ("../service/usersService.js");
const logger = require ("../utils/logger");
const WSresponse = require ("../libs/WSresponse")


const getById = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const data = await usersService.getById(idUser);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const getCurrentUser = async (req, res)=>{
    try {
        const email = req.user?.email || "anonimo";
        const data = await usersService.getByEmail(email);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const registerUser = async (req, res)=>{
    try {
        const newUser = req.body;
    
        const data = await usersService.registerUser(newUser);

        res.status(201).json(new WSresponse(data, "user registered successfully"));
    } catch (error) {
        if (error.status == 403) res.render("error.ejs", {error: error.message});
        logger.warn(error);
    }
};

const updateById = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const newDataObj = req.body;
        await usersService.updateById(idUser, newDataObj);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

module.exports = {
    getById,
    getCurrentUser,
    registerUser,
    updateById
}