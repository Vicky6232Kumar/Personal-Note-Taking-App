const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    obj = {
        "name" : "ashwin",
        "roll" : "ce21btech11008"
    }
    res.json(obj)
})
module.exports = router