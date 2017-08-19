var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, results, fields) => {
        return res.render('admin/users/views/index', {category:results});
    });
});

router.post('/new', (req, res) => {
    var queryString = `INSERT INTO \`categories\` (\`category_name\`)
    VALUES("${req.body.category_name}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});

router.get('/validate',(req,res) =>{
    res.render('admin/users/views/form');
});

router.get('/new', (req, res) => {
    res.render('admin/users/views/form');
});

router.get('/validateEdit',(req,res) =>{
    res.render('admin/users/views/editID');
});

router.post('/editCategory2',(req,res) =>{
    db.query(`UPDATE \`categories\` SET category_name=("${req.body.category_name}") WHERE category_id=${req.body.category_id}`,(err,results,fields) =>{
        if(err) throw err;
        res.redirect('/admin/categories');
    });
});

router.get('/adminPrivilege', (req,res) => {
    res.render('admin/users/views/addAndedit');
});

router.post('/addAndedit', (req, res) => {
    db.query(`SELECT * FROM users`, (err, results, fields) => {
        if(`${req.body.user_name}`=="admin" && `${req.body.user_password}`== "admin" && `${req.body.user_email}`=="adminAko@gmail.com"){
            console.log("please gumana ka na");
            return res.render('admin/users/views/addAndedit', {category:results});
        }
        else 
            console.log("DI KA ADMIN BOI");
            return res.redirect('/login');
        
    });
});


router.get('/post', (req,res) => {
    db.query(`SELECT * FROM categories`, (err, results, fields) => {
            res.render('admin/users/views/formpost',{categories: results, user: req.session.user});
    });
});



router.post('/post', (req, res) => {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    console.log(dt);

    var queryString = `INSERT INTO \`post\` (\`post_title\`,\`post_content\`,\`post_category\`,\`post_author\`)
    VALUES("${req.body.post_title}","${req.body.post_content}",${req.body.category_id},${req.body.post_author})`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});

router.get('/:id', (req,res) => {
    db.query(`SELECT * FROM post WHERE post_category=${req.params.id}`, (err, results, fields) => {
            res.render('admin/users/views/formpost2',{post: results});
    });
});

router.post('/editPost',(req,res) =>{
    db.query(`UPDATE \`post\` SET post_title=("${req.body.post_title}"), post_content=("${req.body.post_content}") WHERE post_id=${req.body.post_id} AND post_author=${req.body.post_author}`,(err,results,fields) =>{
        if(err) throw err;
        res.redirect('/admin/categories');
    });
});

router.post('/deletePost',(req,res) =>{
    db.query(`DELETE FROM \`post\` WHERE post_id=${req.body.post_id} AND post_author=${req.body.post_author}`,(err,results,fields) =>{
        if(err) throw err;
        res.redirect('/admin/categories');
    });
});

// router.get('/:id/remove', (req, res) => {
//     db.query(`DELETE FROM post WHERE post_id=${req.body.id}`, (err, results, fields) => {
//         if (err) throw err;
//         res.redirect('/admin/categories');
//     });
// });
module.exports = router;