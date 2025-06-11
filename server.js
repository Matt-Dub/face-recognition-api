import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import { handleSignin } from './controllers/signin.mjs';
import {handleRegister} from './controllers/register.mjs';
import profile from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const DB = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '565656',
    database: 'smart-brain',
    port: 5432,
  },
});

const PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
var corsOptions = {
  origin: 'http://localhost:5173',
}

app.get('/', (req, res) => { res.json('Connected...'); })
app.post('/signing', (req, res) => { handleSignin(req, res, DB, bcrypt) }); // Other syntax
app.post('/register', (req, res) => { handleRegister(req, res, DB, bcrypt) }); // >> Dependency Injection
app.get('/profile/:id', (req, res) => { profile.handleProfile((req, res, DB)) });
app.put('/image', (req, res) => { handleImage(req, res, DB) });
app.post('/imageUrl', (req, res) => { handleApiCall(req, res) });


app.listen(PORT, () => { console.log(`App is running on port ${PORT}`); })


/*

Routes:

/                   --> res = this is working
/signin             --> POST = success/fail
/register           --> POST = user
/profile/:userId    --> GET = user
/image              --> PUT = updated user

*/