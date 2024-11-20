const mongoose = require('mongoose');
const adminLeadsSchema = new mongoose.Schema({
    clientName : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    whatsappNumber :{
        type: String,
        required: true
    },
    sources :{
        type: String,
        required: true
    },
    services : {
        type: String,
        required: true
    },
    carModel:{
        type: String,
        required: true
    },
    expectedRevenue:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },   
     leadStatus:{
        type: String,
        required: true
    }


})

module.exports = mongoose.model('adminlead', adminLeadsSchema);