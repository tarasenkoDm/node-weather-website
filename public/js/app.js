
console.log('Client side js file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = '';
    messageTwo.textContent = '';

    const location = search.value;
    console.log('location = ', location);

    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    console.log('location = ', data.location);
                    console.log('forecast = ', data.forecast);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
})