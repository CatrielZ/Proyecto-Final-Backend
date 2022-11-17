const {createTransport} =  require("nodemailer")
const config = require("../config/config");

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: config.TEST_MAIL,
        pass: config.PASS_MAIL
    }
});

export default transporter;