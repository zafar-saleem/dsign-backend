import express from 'express';
const router = express.Router();

router.get('/register', (request, response) => {
    response.render('register');
});

router.get('/login', (request, response) => {
    response.render('login');
});

module.exports = router;

