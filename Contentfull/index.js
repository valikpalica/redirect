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
               console.log('links ',item.fields);
               if(link === item.fields.linkIn){
                   getInfo(item.fields.system,parametrs).then(data=>{
                       console.log('data ',data);
                       if(data!==undefined){
                            resolve({link:item.fields.linkOut,id_user:data});
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
        let result;
        if(system === '.net'){
            // let Token = parametrs.Token;
            // let RefreshToken = parametrs.RefreshToken;
            result = await getInfoNet(parametrs);
        }
        else if (system === 'php'){
            //let guid = parametrs.guid;
            result = await getInfoPHP(parametrs);
        }
        return result;
    } catch (error) {
        console.log(error);
    }

}

module.exports = equal;
