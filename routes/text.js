const express = require('express')
const router = express.Router()

router
    .route("/")
    .get((req,res) => {
        ssn = req.session

        if(ssn.username)
        {
            res.render('main')
        }
        else
        {
            res.redirect('/')
        }
    })

module.exports = router