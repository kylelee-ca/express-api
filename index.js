const express = require('express');
const app = express();

// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (req,res) => {
    res.send('This is the root of the website.');
});
app.get('/api/items', (req, res) => {
    res.send([1, 2, 3]);
})


const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`Listening on port ${port}`)
})