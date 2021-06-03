let contentful = require('contentful');

let client = contentful.createClient({
    space : 'uh07yvhipxg5',
    accessToken : 'roSrwRuPl3c1NDb2PVuDTScaUxvE0g1eAplAHs_hNWE',
});


const equal = async (link) =>{
    return new Promise((resolve,reject)=>{
        client.getEntries({
            content_type:'authorizationLinks'
        }).then(entrise=>{
           entrise.items.forEach(item=>{
               console.log(item.fields);
               if(link === item.fields.linkIn){
                   resolve(item.fields.linkOut);
               }
           })
        }).catch(err=>{
           reject(err);
        }); 
    })
}

module.exports = equal;
