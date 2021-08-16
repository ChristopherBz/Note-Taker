// Dependencies
const express = require('express');
const path = require('path');

// Point Server to the route files
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
// Create an express server
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(api);

// Wildcard route to direct users to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);