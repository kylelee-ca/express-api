const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json()); // Piece of middleware to parse request body 


// Hardcode items for now 
// To be replaced with the real items from DB
const items = [
    {id:1, name: 'item1'},
    {id:2, name: 'item2'},
    {id:3, name: 'item3'},
];

// Handlers for GET REQUESTS
app.get('/', (req,res) => {
    res.send('This is the root of the website.');
});
app.get('/api/items', (req, res) => {
    res.send(items);
});

// api/items/itemID
app.get('/api/items/:id', (req,res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
        res.status(404).send('The item with the given ID was not found');
    }
    res.send(item);

});

// Handlers for POST REQUEST

app.post('/api/items', (req,res) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return ;
    }

    const item = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(item);

    res.send(item);
});


const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`Listening on port ${port}`)
})