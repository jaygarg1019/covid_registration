const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login2', (req, res) => {
    res.render('index');
});

router.get('/add_vaccine', (req, res) => {
    console.log("here it is!!")
    res.send('Vaccine Added');
});

router.get('/register_nurse', (req, res) => {
    console.log("here it is!!")
    res.send('Vaccine Added');
});






module.exports = router;