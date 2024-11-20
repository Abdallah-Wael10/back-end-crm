const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        validate :[validator.isEmail,"email must be a valid email"], 
    },
    password :{
        type: String,
        required: true
    },
    phone : { 
        type: String,
        required: true
    },




})

module.exports = mongoose.model('admin', adminSchema);