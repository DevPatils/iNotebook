const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/i-NoteBook"

const connectToMongo = () => {
    mongoose.connect(mongoUri);
    console.log("Connected to Mongo successfully");
}

module.exports = connectToMongo;