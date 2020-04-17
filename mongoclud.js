//Ensure MongoDB Community Service running
//Enter terminal commands first:
//npm install mongoose
//Start server:
//npm start

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connected')
);

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
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
    res.send('Hello World')
});

app.post('/add', (req, res) => {
    const myData = new Contact(req.body);
    myData.save()
        .then(data => {
            res.send(`Thanks, ${req.body.firstName}`);
        })
        .catch(error => {
            res.status(400).send('Unable to save')
        })
});

app.listen(port, 
    () => console.log(`Running on ${port}`)
);