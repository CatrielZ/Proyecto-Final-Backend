const logger = require ("../utils/logger");
const WSresponse = require ("../libs/WSresponse")

const logout = (req, res)=>{
    if (req.isAuthenticated()){
        const name = req.user.firstName;
        req.logout({}, err => err && logger.error(err));
        return res.status(200).json(new WSresponse(name, "logged out successfully"));
    };

    res.status(400).json(new WSresponse(null, "error, you aren't logged in", true));
}

module.exports = {logout}