const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logfile.log" }),
        new winston.transports.MongoDB({ db: process.env.MONGODB, level: 'error' }),
        new winston.transports.File({ filename: "uncaughtExceptions.log" }),
        new winston.transports.File({ filename: "uncaughtRejections.log" }),
    ],
});

module.exports = logger;
