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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : true
    }
  });

//console.log(db.select('*').from('users').then(data=>{console.log(data);}));

// middleware
app.use(bodyParser.json());
app.use(cors());
// endpoints
app.get('/',(req,res)=>{ res.status(200).send('success');});
app.post('/signin', (req, res)=>{ signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res)=>{ register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req,res)=>{ profile.handleProfile(req, res, db)});
app.put('/imagen', (req, res)=>{ imagen.handleImagen(req,res,db)});
app.post('/imagenurl', (req, res)=>{ imagen.handleApiCall(req,res)});
app.listen(process.env.PORT || 3000, ()=>{
  console.log(`app esta corriendo en el puerto ${process.env.PORT}`);});
