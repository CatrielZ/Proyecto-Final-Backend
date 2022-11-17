const __dirname = require("../dirname");
const multer = require("multer");
 
const makeRandomString = (length = 8) => {
    return Math.random().toString(16).substring(2, length);
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname + "/public/uploads");
    },
    filename: (req, file, cb)=>{
        cb(null, `avatar-${req.body.firstName}-${makeRandomString()}-${file.originalname}`);
    }
});

export const multerUpload = multer({storage});