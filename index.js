const express = require('express');
const app = express();


// Hardcode items for now 
// To be replaced with the real items from DB
const items = [
    {id:1, name: 'item1'},
    {id:2, name: 'item2'},
    {id:3, name: 'item3'},
];

app.get('/', (req,res) => {
    res.send('This is the root of the website.');
});
app.get('/api/items', (req, res) => {
    res.send([1, 2, 3]);
});

// api/items/itemID
app.get('/api/items/:id', (req,res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
        res.status(404).send('The item with the given ID was not found');
    }
    res.send(item);

});

const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`Listening on port ${port}`)
})