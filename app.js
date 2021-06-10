const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8081;
const path = require('path');
const equal = require('./Contentfull/index');
const domain = require('./domain.json');
app.use(cookieParser('secret'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "hbs");

app.get('/getValue', (req, res) => {
    res.render('test.hbs');
});

app.get('/',(req,res)=>{
    let hostname = req.hostname;
    equal(hostname,req.query).then(data=>{ 
res.redirect(createLink('localhost:8080/printouts', data.platform));
    }).catch(err=>{
        console.error(err);
        res.status(300).send('No data');
    });
});

// app.post('/', (req, res) => {
//     let { parametrs, endpoint } = req.body;
//     equal(endpoint, parametrs).then(data => {
//         res.redirect(createLink('localhost:8080/printouts', data.platform));
//     }).catch(err => {
//         console.error(err);
//         res.status(300).send('No data');
//     })
// })
const createLink = (endpoint, platform) => {
    let port = 'http';
    return `${port}://${endpoint}?${platform}`;
}
app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`);
})