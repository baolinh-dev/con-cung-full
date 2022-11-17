const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/con_cung");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("failed to connect to mongodb");
  }
}
module.exports = { connect };