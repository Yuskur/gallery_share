const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //parse incoming json payloads in http requests

const port = 3001;


app.login('/login', (req, res) => {



    const payload = {
        username: req.username, 
        password: req.password,
        
    }
    const token = jwt.sign()
    
})

app.listen(port, () => {
    console.log("listening");
});
