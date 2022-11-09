const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const colors = require('colors');
const app = require('./app');


const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_LOCAL).then(
    () => {
        console.log(`Database connected successfully`.red.bold);
    }
)

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})