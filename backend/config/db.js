const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

// const url='mongodb://127.0.0.1:27017/helloAppDB';
const url=process.env.MONGOS_URL;
// console.log(url);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
