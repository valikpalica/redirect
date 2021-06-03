document.getElementById('button').addEventListener('click',(event)=>{
    event.preventDefault();
    let input = document.getElementById('input').value;
    let endpoint = document.getElementById('output').value;
    console.log(input,endpoint);
    fetch('/',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'input':' https://hub.fxgiants.com',
            'point':' https://hub.fxgiants.com'
        },
    });
})