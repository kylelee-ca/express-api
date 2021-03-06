const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {type: String, required: true},
    isGold: {type: Boolean, required: true, default: false},
    phone: String
}));


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers); 
});


router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
});

router.post('/', async (req, res) => {
  
    const {error} = validateCustomer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
})
router.put ('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error) res.status(400).send(error.details[0].message);
   
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
        new: true
    });
    if(!customer) res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
})
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});
const validateCustomer = customer => {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.number()
    }; 
    return Joi.validate(customer, schema);
}


module.exports = router;