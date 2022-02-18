const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const items = require('./routes/items');
const app = express();
const homepage = require('./routes/homepage');
const customers = require('./routes/customers');

app.use(express.json()); // Piece of middleware to parse request body 
app.use('/api/items', items); // any routes that start with first argument, use this router 'items' 
app.use('/', homepage);
app.use('/api/customers', customers);
mongoose.connect('mongodb://localhost/express')
    .then(() =>  console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to DB...'));
    
const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`Listening on port ${port}`)
})
