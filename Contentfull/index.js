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
           entrise.items.forEach(item=>{
               if(link === item.fields.linkIn){
                   getInfo(item.fields.system,parametrs).then(({result,platform})=>{
                       if(result!==undefined){
                           console.log(`LinkOut ${item.fields.linkOut}, platform ${platform}, status_autorization ${result}`)
                            resolve({link:item.fields.linkOut,id_user:result,platform});
                       }
                       else{
                           reject(new Error('No data'));
                       }
                   }).catch(err=>{
                       console.log(err);
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
            let token = parametrs.Token;
            platform = config.get('Platform_Abbreviation.net');
            result = await getInfoNet(token);
        }
        else if (system === 'php'){
            let guid = parametrs.guid;
            platform = config.get('Platform_Abbreviation.php');

            result = await getInfoPHP(guid);
        }
        return {result,platform};
    } catch (error) {
        console.log(error);
    }
}

module.exports = equal;
