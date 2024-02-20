const express = require('express');
const bodyParser = require('body-parser'); // Corrected typo
const path = require('path');
const routeController = require('./routes/route')

const PORT = 7000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // Corrected typo
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'view')));
app.use('/', routeController);

app.listen(PORT, () => {
    console.log(`Working on ${PORT}`);
});
