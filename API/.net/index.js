const rp = require('request-promise');
const config = require('config');
const getInfo = async (authorization) =>{
        let option = {
            method: 'GET',
            uri:config.get('net_system.uri'),
            headers:{
                'authorization':authorization
            },
            json:true
        };
        let data = await rp(option);
        return data.id;
}

module.exports = getInfo