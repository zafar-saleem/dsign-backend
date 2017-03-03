import express from 'express';
import UserModel from '../models/UserModel';
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

    if (errors) {
        response.json(errors);

        return;
    }

    UserModel.findOne({ email: email }, (error, item) => {
        if (item) {
            response.json({ errors: true, message: 'User already exist', param: 'email' });
            return;
        }

        let newUser = new UserModel({
            email: email,
            password: password
        });

        UserModel.createUser(newUser, (error, user) => {
            if (error) throw error;

            console.log(user);

            let res = {
                errors: false,
                user: user,
                redirectUrl: '/pages/dashboard.html'
            };

            response.json(res);
        });
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

