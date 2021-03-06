console.log('test javascript file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Fetching...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.description + '. It is currently ' + data.forecast.temperature + ' degrees out.'
                messageTwo.textContent += "\nIt feels like " + data.forecast.feelslike + " degrees out."
                messageTwo.textContent += "\nThe humidity is " + data.forecast.humidity + "%."
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})