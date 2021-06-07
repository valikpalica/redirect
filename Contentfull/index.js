let contentful = require('contentful');
let getInfoNet = require('../API/.net/index');
let getInfoPHP = require('../API/php/index');

let client = contentful.createClient({
    space : 'uh07yvhipxg5',
    accessToken : 'roSrwRuPl3c1NDb2PVuDTScaUxvE0g1eAplAHs_hNWE',
});

const equal = async (link,parametrs) =>{
    return new Promise((resolve,reject)=>{
        client.getEntries({
            content_type:'authorizationLinks'
        }).then(entrise=>{
           entrise.items.forEach(item=>{
               
               if(link === item.fields.linkIn){
                   getInfo(item.fields.system,parametrs).then(({result,platform})=>{
                       
                       if(result!==undefined){
                            resolve({link:item.fields.linkOut,id_user:result,platform});
                       }
                       else{
                           reject(new Error('No data'));
                       }
                   });
               }
           })
        }).catch(err=>{
           reject(err);
        }); 
    })
}

const getInfo = async (system,parametrs) =>{
    try {
        let platform;
        let result;
        if(system === '.net'){
            // let token = parametrs.Token;
            // let refresh_token = parametrs.RefreshToken;
            platform = '.net';
            result = await getInfoNet(parametrs);
        }
        else if (system === 'php'){
            //let guid = parametrs.guid;
            platform = 'php';
            result = await getInfoPHP(parametrs);
        }
        return {result,platform};
    } catch (error) {
        console.log(error);
    }
}

module.exports = equal;
