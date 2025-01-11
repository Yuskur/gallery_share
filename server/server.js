const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json()); //parse incoming json payloads in http requests

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
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
  } catch(error){
    console.log('ERROR: ', error);
  }
}

const port = 3001;
const saltRounds = 10;
const galleryShare_DB = client.db('gallery_share');

// Function to hash passwords
async function hashPassword (password){
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Function to check hashed passwords
async function verifyPassword(password, hashedPassword){
  return await bcrypt.compare(password, hashedPassword);
}


// Endpoint allowing users to login to their account
app.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try{
      //Check if the user exists in the database
      const user = await galleryShare_DB.collection('users').findOne({email: email});

      if(!user){
        return res.status('404').json({message: 'USER NOT FOUND'});
      }
      
      const isPasswordValud = verifyPassword(password, user.password);

      if(!isPasswordValud){
        return res.status('401').json({message: 'PASSWORD INVALID'});
      }

      const payload = {
        email: user.email, 
        password: user.password,
        roles: user.roles
    }

      // Now give the signed-up user their session
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
      const refToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
  
      // This will store the cookie as an http-only cookie in the client browser
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000,
      });
      res.cookie('refToken', refToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400000 * 7
      });

      return res.status('200').json({message: 'SUCCESSFULLY LOGGED IN'});
    } catch(error){
      console.error('ERROR: ', error);
      return res.status(500).json('SERVER ERROR DURING SIGNUP');
    }
    
});

// Endpoint allowing users to signup for the application 
app.post('/signup', async (req, res) => {
  console.log('YOU ARE NOW SIGNING UP');

  const { email, password, verified_password } = req.body;

  console.log("Email: ", email, " Password", password, " verified_password", verified_password, "\n");

  if (password !== verified_password) {
    return res.status(401).json({ message: 'PASSWORDS DONT MATCH' });
  }

  try {
    const hashedPassword = await hashPassword(password); // Await the password hashing
    console.log('HASHED PASSWORD: ', hashedPassword);
    console.log("Secret Key:", process.env.SECRET_KEY);
    console.log("Refresh Secret Key:", process.env.REFRESH_SECRET_KEY);

    const payload = {
      email: email,
      password: hashedPassword,
      roles: 'user'
    };

    // Add the new user to the users collection
    await galleryShare_DB.collection('users').insertOne(payload);

    // Now give the signed-up user their session
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    const refToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // This will store the cookie as an http-only cookie in the client browser
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000,
    });
    res.cookie('refToken', refToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400000 * 7
    });

    // Returns a json of the token
    res.json({ message: 'SIGNUP SUCCESSFUL' });
  } catch (error) {
    console.error('ERROR: ', error);
    res.status(500).json({ message: 'SERVER ERROR DURING SIGNUP' });
  }
});

//This will allow for the user session to refresh whenever they use a feature requiring authorization
app.post('/refresh-token', (req, res) => {
  const refToken = req.cookies.refToken

  if(!refToken){
      return res.status(401).json({message: 'No Refresh Token Found'})
  }

  try{
      const decoded = jwt.verify(refToken, process.env.REFRESH_SECRET_KEY)
      const payload = {
          userid: decoded.userid,
          username: decoded.username,
          roles: decoded.roles,
      }

      console.log(payload)
  
      const newToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})
  
      res.cookie(
          'token', newToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 3600000,
          }
      )
      
      return res.json({message: 'Successfully refreshed the token'})
  }catch(error){
      return res.status(403).json({message: 'Invalid Ref token'})
  }

})

// Check if the user is currently authorized for access
app.get('/authorized', (req, res) => {
  const token = req.cookies.token;
  console.log(token)

  if(!token){
      console.log('/authorized: session expired')
      return res.status(401).json({message: 'Unauthorized User'})
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(err){
          console.log('/authorized: token not valid')
          return res.status(401).json({message: 'Unauthorized User'})
      }
      const { userid, username, email } =  decoded;
      return res.json({message: 'Authorized', user: {userid, username, email}})
  })
})

// This will set the user session named token to expire immediately meaning the user is now logged out
app.post('/logout', (req, res) => {
  res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0) // Set the cookie to expire immediately
  });
  res.cookie('refToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0) // Set the cookie to expire immediately
  });
  res.json({ message: 'Logout successful' });
})


run().catch(console.dir); // Make connection to api

app.listen(port, () => {
    console.log("listening");
});
