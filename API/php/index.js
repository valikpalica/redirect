const guid = 'f9fde7fb-39ff-4a58-85fc-1f1f8b5bd4c1';
const apiKey = 'n6$*Q$43RSdv&X+r';
const crypto = require('crypto');
const rp = require('request-promise');


const createHash = () =>{
    let concat = guid+apiKey;
    console.log(concat);
    let sign = crypto.createHash('sha256').update(concat).digest('hex');
    console.log(sign);
    let option = {
        method:'POST',
        formData:{
            "sign":sign,
            "guid":guid,
        },
        uri:'https://www.ironfx.com/json/sso.json',
        json:true
        
    }
    rp(option).then(data=>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })
}

createHash();

