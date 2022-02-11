const express = require('express');
const router = express.Router();

// Hardcode items for now 
// To be replaced with the real items from DB
const items = [
    {id:1, name: 'item1'},
    {id:2, name: 'item2'},
    {id:3, name: 'item3'},
];

router.get('/', (req, res) => {
    res.send(items);
});

// api/items/itemID
router.get('/:id', (req,res) => {
   
    const item = items.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
       
    }
    res.send(item);

});

// Handler for POST REQUEST (Create)

router.post('/', (req,res) => {
 
    const { error } = validateItem(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
        
    }

    const item = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(item);

    res.send(item);
});

// Handler for PUT REQUEST (Update)
router.put('/:id', (req, res) => {
    const item = items.find(item => parseInt(req.params.id) ===  item.id);
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
       
    } 

    const { error } = validateItem(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
       
    }
    item.name = req.body.name;
    res.send(item);
})

// Handler for DELETE REQUEST (Delete)
router.delete('/:id', (req, res) => {
    const item = items.find(item => parseInt(req.params.id) ===  item.id);
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
       
    }
    const index = items.indexOf(item);
    items.splice(index, 1);

    res.send(item);
})
//input validation function
const validateItem = item => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(item, schema);
}

module.exports = router;