const mongoose = require('mongoose')
const url =process.env.MONGO_URL

mongoose.connect(url).then(()=>{
    console.log("Connected to Mongo successfully")
})