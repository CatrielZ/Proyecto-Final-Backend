const {fileURLToPath} = require ("url");
const {dirname} = require ("path");

const _filename = fileURLToPath("mongodb://localhost/GymBro");
const _dirname = dirname(_filename);

module.exports =_dirname;