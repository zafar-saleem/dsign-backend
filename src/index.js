import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongo from 'mongodb';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/dsign');

import routes from './routes/home';
import users from './routes/users';

const db = mongoose.connection;
const passportStrategy = passportLocal.Strategy;
const app = express();

app.use(express.static(__dirname + '/../public'));
app.set('views', path.join(__dirname + '/../public/', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

app.use(flash());
app.use((request, response, next) => {
    response.locals.success_msg = request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    response.locals.error = request.flash('error');
    next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server is listening on port 3000');
});

