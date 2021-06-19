const config = require('config');
const crypto = require('crypto');
const rp = require('request-promise');

const getInfo = async (guid) =>{
    let apiKey = config.get('php_system.apiKey');
    let concat = guid+apiKey;
    let sign = crypto.createHash('sha256').update(concat).digest('hex');
    let option = {
        method:'POST',
        formData:{
            "sign":sign,
            "guid":guid,
        },
        uri:config.get('php_system.uri'),
        json:true
        
    }
    let data = await rp(option);
    return data;
}

module.exports = getInfo;
