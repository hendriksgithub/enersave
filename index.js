const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Replace with your actual MongoDB connection string
const mongoUri = 'mongodb+srv://hendrikstotz:Enersave_2024@cluster0.pkcuyia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'sampleDB'; // Your database name
const collectionName = 'sensorData'; // Your chosen collection name

let db;
let collection;

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const payload = req.body;

  // Insert data into MongoDB
  collection.insertOne(payload)
    .then(result => {
      res.status(200).send('Data received and stored');
    })
    .catch(error => {
      console.error('Error storing data:', error);
      res.status(500).send('Error storing data');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
