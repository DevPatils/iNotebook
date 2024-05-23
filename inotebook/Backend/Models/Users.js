const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
        
    
    },
    password :{
        type: String,
        required: true
    },  
    date :{
        type: Date,
        default: Date.now
    }
  });
  const user =mongoose.model('Users', Userschema); 
  user.createIndexes();
  module.exports = user;