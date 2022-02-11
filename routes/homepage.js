const express = require('express');
const router = express.Router();


// Handlers for GET REQUESTS (Read)
router.get('/', (req,res) => {
    res.send('This is the root of the website.');
});


module.exports = router;