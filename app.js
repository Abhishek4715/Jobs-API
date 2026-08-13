const express = require("express");
const app = express();

const connectDb = require("./db/connect.js");

app.get('/', (req, res) => {
    res.send("<h1>This is home page</h1>")
})

const port = process.env.port || 3000;
const start = async () => {
    try {
        await connectDb();
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();