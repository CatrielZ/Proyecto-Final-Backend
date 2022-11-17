const {config} = require("dotenv")
const os = require ("os")

config();

module.exports = {
  MODO: process.env.MODO || "FORK",
  URLMongo: process.env.URLMONGO || 'mongodb://localhost:27017/GymBro',
  PORT: process.env.PORT || 3000,
  DATABASE: process.env.DATABASE || "mongoDB",
  SESSION_TIME: process.env.SESSION_TIME || 20000,
  TEST_MAIL: process.env.TEST_MAIL,
  PASS_MAIL: process.env.PASS_MAIL,
  processInfo: {
    args: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage.rss(),
    path: process.argv[0],
    pid: process.pid,
    folder: process.argv[1],
    cpus: os.cpus().length
  }
}