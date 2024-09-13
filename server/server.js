const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //parse incoming json payloads in http requests

const port = 3001;

app.listen(port, () => {
    console.log("listening");
});