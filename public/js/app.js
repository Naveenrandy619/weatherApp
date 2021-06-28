console.log('Client side scripting...')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value
    console.log(location)

    msg1.textContent = ""

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       
        if(data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = data.forecast
        }
    })
})


})