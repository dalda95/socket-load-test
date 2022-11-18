const axios = require('axios');

let lastSetIntervalTimestamp =  new Date()

setInterval(() => {
    axios.get('http://localhost:9011/healthcheck')
        .then(response => {
            const difference =  new Date() - lastSetIntervalTimestamp
            console.log('difference time', difference)
            lastSetIntervalTimestamp = new Date()
        })
        .catch(error => {
            console.log(error);
        });
}, 1000)