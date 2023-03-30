const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', async(request, response) => {
    response.send("Hello Worlddddd!");
})

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
})