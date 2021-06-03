const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const equal = require('./Contentfull/index');
app.use(cookieParser('secret'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "hbs");


app.get('/getValue',(req,res)=>{
    res.cookie('tokenUser','AFFD-4321-dsaf-fdas-341fr');
    res.render('test.hbs');
});

app.post('/',(req,res)=>{
    let {tokenUser} = req.cookies;
    console.log(tokenUser);
    //let {linkIn} = req.body;
    let linkIn = 'www.ironfx.com';
    equal(linkIn).then(data=>{
        console.log(data);
        res.redirect(createLink(data));
    }).catch(err=>{
        console.error(err);
    })
})

const response = (token) =>{
    //response for api and return id
    const id = 1;
    res.cookie('id',id);
}
const createLink = (endpoint) =>{
    let port = 'http';
    console.log(`${port}://${endpoint}`);
    return `${port}://${endpoint}`
}

app.listen(PORT,()=>{
    console.log(`Server has been started on ${PORT} port`);
})