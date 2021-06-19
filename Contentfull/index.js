let contentful = require('contentful');
let getInfoNet = require('../API/.net/index');
let getInfoPHP = require('../API/php/index');
const config = require('config');

let client = contentful.createClient({
    space : config.get('Contentfull.space'),
    accessToken : config.get('Contentfull.accessToken'),
});

const equal = async (link,parametrs) =>{
    return new Promise((resolve,reject)=>{
        client.getEntries({
            content_type:'authorizationLinks'
        }).then(entrise=>{
           console.log(entrise);
           entrise.items.forEach(item=>{
               //console.log('get item from entrise',item)
               if(link === item.fields.linkIn){
                console.log('link equal');
                getInfo(item.fields.system,parametrs).then(({result,platform})=>{
                       console.log(`result ${result} platform ${platform}`);
                       if(result!==false){
                           console.log(`LinkOut ${item.fields.linkOut}, platform ${platform}, status_autorization ${result}`)
                            resolve({link:item.fields.linkOut,id_user:result,platform});
                       }
                       else{
                           console.log('result equal undefiened');
                           reject(new Error('No data'));
                       }
                   }).catch(err=>{
                       console.log(err);
                   });
               }
               else{
                   console.log('link not equal');
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
        console.log(`system ${system} parametrs ${parametrs}`);
        if(system === '.net'){
            let token = parametrs.token;
            //console.log(`Access token ${token}`);
            platform = config.get('Platform_Abbreviation.net');
            let answer = await getInfoNet(token);
            //console.log('file index.js Contenfull line 55 -- ',answer);
            result = answer
        }
        else if (system === 'php'){
            let guid = parametrs.guid;
            console.log(`guid ${guid}`);
            platform = config.get('Platform_Abbreviation.php');
            let answer = await getInfoPHP(guid);
            //console.log(answer);
            result = answer.auth;
        }
        return {result,platform};
    } catch (error) {
        console.log(error);
    }
}
module.exports = equal;
