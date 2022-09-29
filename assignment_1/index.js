const express = require('express');
const fs = require('fs');
const userRoute = require('./routers/v1/user.route');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static("assets"));

app.use("/user", userRoute);


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/assets/data.json`);
    fs.readFile(`${__dirname}/assets/data.json`, 'utf8', (err, data) => {
        console.log(data);
    });
})


app.all("*", (req, res) => {
    res.send("No route found!!!")
})

app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
})