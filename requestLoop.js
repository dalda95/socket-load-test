
const axios = require('axios');
setInterval(() => {
    axios.get('http://localhost:9011/healthcheck')
        .then(response => {
            console.log(response.status);
        })
        .catch(error => {
            console.log(error);
        });
}, 5000)