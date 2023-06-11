const connectToMongo =require('./db')
const express = require('express')
var cors = require('cors')
require('dotenv').config()
 
connectToMongo()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(process.env.PORT, () => {
  console.log(`iNoteBook app listening on port ${process.env.PORT}`)
})