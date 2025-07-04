import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import dotenv from 'dotenv';

import { handleSignin } from './controllers/signin.mjs';
import {handleRegister} from './controllers/register.mjs';
import profile from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

dotenv.config();

const DB = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'https://smart-brain-matt-a49e9a00f103.herokuapp.com/',
  methods: 'GET,POST, PUT',
  credentials: true
}));

app.get('/', (req, res) => { res.json('Connected...'); })
app.post('/signing', (req, res) => { handleSignin(req, res, DB, bcrypt) }); // Other syntax
app.post('/register', (req, res) => { handleRegister(req, res, DB, bcrypt) }); // >> Dependency Injection
app.get('/profile/:id', (req, res) => { profile.handleProfile((req, res, DB)) });
app.put('/image', (req, res) => { handleImage(req, res, DB) });
app.post('/imageUrl', (req, res) => { handleApiCall(req, res) });


app.listen(PORT || 3000, () => { console.log(`App is running on port ${PORT}`); })


/*

Routes:

/                   --> res = this is working
/signin             --> POST = success/fail
/register           --> POST = user
/profile/:userId    --> GET = user
/image              --> PUT = updated user

*/