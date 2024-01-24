const mongoose = require("mongoose");
const logger = require("./logger")

async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.MONGODB);
    //   console.log("Connected to MongoDB...");
    logger.info("Connected to MongoDB...")
    } catch (err) {
    //   console.error("Could not connect to MongoDB...", err);
    logger.error(err.message, err)
      process.exit(1);
    }
  }
  
  connectToMongoDB();

  module.exports = connectToMongoDB