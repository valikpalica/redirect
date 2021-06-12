const express = require('express');
const app = express();
const PORT = 8081 || process.env.PORT;
const equal = require('./Contentfull/index');
const config = require('config');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/',(req,res)=>{
    let hostname = req.hostname;
    equal(hostname,req.query).then(data=>{
    let domain = config.get('Path.domain');
    res.redirect(createLink(domain, data.platform));
    }).catch(err=>{
        console.error(err);
        res.status(300).send('No data');
    });
});

const createLink = (endpoint, platform) => {
    const port = config.get('Path.port');
    return `${port}://${endpoint}?${platform}`;
}
app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`);
})