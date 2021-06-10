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
            platform = 'a08a0fcbdeafd3c1b3a4b495b9a9c9d96850f08946b52bc0622347d3b6e73b78';
            result = await getInfoNet(parametrs);
        }
        else if (system === 'php'){
            //let guid = parametrs.guid;
            platform = '12a5d18ee896e59954bdce0f4acc7212eebe03dae1834ef4ce160ac5afa5c4a8';
            result = await getInfoPHP(parametrs);
        }
        return {result,platform};
    } catch (error) {
        console.log(error);
    }
}

module.exports = equal;
