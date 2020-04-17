//Ensure MongoDB Community Service running
//Enter terminal commands first:
//npm install mongoose
//Start server:
//npm start

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 2801;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb://localhost:27017/newdb',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connected')
);

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: {
        type: String,
        default: 'N/A'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mongo.html');
});

app.post('/add', (req, res) => {
    const myData = new Contact(req.body);
    myData.save()
        .then(data => {
            res.send(`Thank you, ${req.body.firstName}!`);
        })
        .catch(error => {
            res.status(400).send('Unable to save')
        })
});

app.listen(port, 
    () => console.log(`Running on ${port}`)
);