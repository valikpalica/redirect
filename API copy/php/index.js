//const guid = 'f9fde7fb-39ff-4a58-85fc-1f1f8b5bd4c1';
const apiKey = 'n6$*Q$43RSdv&X+r';
const crypto = require('crypto');
const rp = require('request-promise');


const getInfo = async (guid) =>{
    let concat = guid+apiKey;
    let sign = crypto.createHash('sha256').update(concat).digest('hex');
    let option = {
        method:'POST',
        formData:{
            "sign":sign,
            "guid":guid,
        },
        uri:'https://www.ironfx.com/json/sso.json',
        json:true
        
    }
    let data = await rp(option);
    return data;
}

module.exports = getInfo;
