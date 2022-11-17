const WSresponse = require ("../libs/WSresponse");
const logger = require ("../utils/logger")

const auth = (req, res, next)=>{
    if (req.isAuthenticated()) return next();
    return res.status(401).json(new WSresponse(null, 'Debes iniciar sesión para continuar', true, -1));
};


const adminAuth = (req, res, next)=>{
    if (req.isAuthenticated()){
        const role = req.user.role;
        if (role === "admin") return next();
    }
    return res.status(401).json(new WSresponse(null, `ruta ${req.originalUrl} método ${req.method} no autorizada`, true, -1));
};

const multerFileValidator = (req, res, next)=>{
    const file = req.file;
    
    if (!file){
        logger.warn('Error al subir archivo de imagen (avatar) con multer');
        //return res.status(400).json(new WSresponse(null, 'Error al subir archivo de imagen (avatar)', true));
        return next();
    };

    req.body.avatar = `/uploads/${file.filename}`;
    next();
}

const generalError = (err, req, res, next) => {
    logger.error(err.stack);
    //res.status(500).send('Something broke!');
    res.render("error.ejs", {error: 'Something broke! [Status: 500]'});
}

const notFound = (req, res)=>{
    res.status(404).json(new WSresponse(null, `ruta ${req.originalUrl} método ${req.method} no implementada`, true, -2));
};

module.exports = {
    auth,
    adminAuth,
    multerFileValidator,
    generalError,
    notFound
}