import express from 'express';
const router = express.Router();

router.get('/register', (request, response) => {
    // response.render('register');
    console.log(request);
});

router.post('/register', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    let repeatPassword = request.body.repeatPassword;

    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Please provide valid email address').isEmail();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('repeatPassword', 'Repeat password is required').notEmpty();

    let errors = request.validationErrors();

    response.json({
        error: true,
        errors: errors
    });
});

router.get('/login', (request, response) => {
    response.render('login');
});

router.post('/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    request.checkBody('email', 'Please provide an email address').notEmpty();
    request.checkBody('email', 'Please provide valid email address').isEmail();
    request.checkBody('password', 'Please provide password').notEmpty();

    let errors = request.validationErrors();

    response.json(errors);
    // console.log(request.body);
});

module.exports = router;

