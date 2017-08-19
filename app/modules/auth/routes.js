var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var signupRouter = express.Router();
//var categoriesRouter = express.Router();

var authMiddleware = require('./middlewares/auth');


loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
        
    })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM users WHERE user_username="${req.body.user_name}" AND user_password="${req.body.user_password}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');

            var user = results[0];
            var admin = results[0];

            if (user.password !== req.body.password) return res.redirect('/login?incorrect');

            delete user.password;


            if(req.body.user_name && req.body.user_password == "admin"){
                req.session.user = admin;
                console.log('ADMIN ANG NAG LOG IN');
                return res.redirect('login/admin');
            }
            
            console.log("NORMAL ANG NAG LOG IN");
            req.session.user = user;
            return res.redirect('/login/normal');
        });
    });
loginRouter.get('/normal',authMiddleware.hasAuth,(req,res) => {
    res.render('auth/views/normalNav',req.query);
    console.log(req.session);
});
loginRouter.get('/admin',authMiddleware.hasAuth,(req,res) => {
    console.log(req.session);
    res.render('auth/views/adminNav');
});

loginRouter.get('/users',authMiddleware.hasAuth,(req,res) => {
    res.render('auth/views/indexx');
});

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

signupRouter.get('/',(req,res) =>{
    res.render("auth/views/signup");
});

signupRouter.post('/', (req,res) => {
    console.log('sigup POST');
    var db = require('../../lib/database')();
    db.query(`INSERT INTO \`users\` (\`user_username\`, \`user_password\`, \`user_email\`, \`user_birthdate\`, \`user_usertype\`)
    VALUES("${req.body.user_username}", "${req.body.user_password}", "${req.body.user_email}", "${req.body.user_birthdate}","${req.body.user_usertype}");`, (err,results,fields) =>{
    if (err) throw err;
    return res.redirect('/login');
    
    });
});


// categoriesRouter.get('/',(req,res) =>{
//     res.render("./admin/users/views/categories");
// });

// categoriesRouter.route('/')
//     .get(authMiddleware.noAuthed, (req, res) => {
//         res.render('./admin/users/views/categories');
//     });




exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = signupRouter;
//exports.categories = categoriesRouter;