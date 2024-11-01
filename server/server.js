const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require(crypto);
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://goldenMonkey:<30jKEVDJsBvneiFs>@soloprojectgs.txfzh.mongodb.net/?retryWrites=true&w=majority&appName=SoloProjectGS";

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //parse incoming json payloads in http requests

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  

const port = 3001;


app.post('/login', (req, res) => {

    const payload = {
        username: req.username, 
        password: req.password,
    }
    const token = jwt.sign();
    
});

app.signup('');

run().catch(console.dir); // Make connection to api

app.listen(port, () => {
    console.log("listening");
});
