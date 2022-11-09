const express = require('express');
const app = express();
const cors = require('cors');

const tourRoutes = require('./routes/v1/tours.route')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Wow! Route is working...`);
});

app.use('/api/v1/tour', tourRoutes);
app.use('/api/v1/tours', tourRoutes);

module.exports = app;