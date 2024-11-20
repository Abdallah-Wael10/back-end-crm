const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config() 
const cors = require('cors')
const database= require('./config/db')
database
app.use(cors())
const userLeadsRouter = require("./routes/userLeads.route")
const adminLeadsRouter = require("./routes/adminLeads.route")
const usersRouter = require("./routes/users")
const adminRouter = require("./routes/admin")
app.get('/', function (req, res) {
  res.json("welcome to  crm")
})
app.use("/api/users", usersRouter)
app.use("/api/admin", adminRouter)

app.use("/api/userLeads", userLeadsRouter)
app.use("/api/adminLeads", adminLeadsRouter)
 
app.listen(process.env.PORT || 5000, function () {
    console.log('Server is running on port 5000')
  
}) 