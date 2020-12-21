// import express from 'express';
// import bodyParser from 'body-parser';
// import bcrypt from 'bcrypt-nodejs';
// import cors from 'cors';
// import knex from 'knex';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// import { handleRegister } from './controllers/register';
// import { handleSignin } from './controllers/signin';
// import { handleProfileGet } from './controllers/profile';
// import * as image from './controllers/image';

const db = knex({
  // connect to your own database here
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'test'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3002, ()=> {
  console.log('app is running on port 3002');
})