const mongoose = require("mongoose");
const password = encodeURIComponent("Arnab12@");
const DB = `mongodb+srv://Arnab:${password}@atlascluster.esd35xx.mongodb.net/InternshipTrial?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
