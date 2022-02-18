const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const Item = mongoose.model('Item', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50,
    }
}));


router.get('/', async (req, res) => {
    const items =  await Item.find().sort('name');
    res.send(items);
});

// api/items/itemID
router.get('/:id', async (req,res) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
       
    }
    res.send(item);

});

// Handler for POST REQUEST (Create)

router.post('/', async (req,res) => {
 
    const { error } = validateItem(req.body);
    if(error)  return res.status(400).send(error.details[0].message);


    let item = new Item({
        name: req.body.name
    })
    item = await item.save();

    res.send(item);
});

// Handler for PUT REQUEST (Update)
router.put('/:id', async (req, res) => {
    const { error } = validateItem(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
       
    }
    const item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        new: true
    });
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
    } 
    res.send(item);
})

// Handler for DELETE REQUEST (Delete)
router.delete('/:id', async (req, res) => {
    const item  = await Item.findByIdAndRemove(req.params.id);
    if (!item) {
        return res.status(404).send('The item with the given ID was not found');
    }
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