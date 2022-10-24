const express = require('express')
const router = express.Router()

router
    .route("/")
    .get((req,res) => {
        ssn = req.session

        if(ssn.username)
        {
            console.log(ssn)
            res.redirect('/text')
        }
        else
        {
            res.render('index')
            ssn.username = ''
        }
    })
    .post((req,res) => {
        ssn = req.session
        ssn.username = req.body.login

        res.redirect('/text');
    })

module.exports = router