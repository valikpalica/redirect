const rp = require('request-promise');
const config = require('config');
const getInfo = async (authorization) =>{
    console.log('file index.js from API .net autorization', authorization);
        let option = {
            method: 'GET',
            uri:config.get('net_system.uri'),
            headers:{
                'authorization':authorization
            },
            json:true
        };
        try {
            let data = await rp(option);
            return data.id === undefined?false:true;
        } catch (error) {
            console.log('we have error with data in .net');
            return false;
        }
        //console.log('file index.js .net folder data.id =', data.id);

        
}

module.exports = getInfo