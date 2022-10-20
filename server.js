const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imagen = require('./controllers/imagen');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sayaikki',
      database : 'smart-brain'
    }
  });

//console.log(db.select('*').from('users').then(data=>{console.log(data);}));

// middleware
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{ res.status(200).send('success');});
app.post('/signin', (req, res)=>{ signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res)=>{ register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req,res)=>{ profile.handleProfile(req, res, db)});
app.put('/imagen', (req, res)=>{ imagen.handleImagen(req,res,db)});
app.post('/imagenurl', (req, res)=>{ imagen.handleApiCall(req,res)});
app.listen(3000, ()=>{console.log('app esta corriendo en el pruerto 3000');});
