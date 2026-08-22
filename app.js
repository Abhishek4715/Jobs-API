const express = require("express");
const app = express();

// Authentication
const AuthenticateUser = require("./middlewares/authentication.js");

// MongoDB
const connectDb = require("./db/connect.js");

// Json
app.use(express.json());

// Route
const jobs = require("./routes/jobsRoutes.js");
const user = require("./routes/authsRoutes.js");

app.use("/api/v1/jobs", AuthenticateUser, jobs);
app.use("/api/v1/auths", user);

// Error 
const errorHandlerMiddleware = require("./middlewares/errorHandler.js");
const notfound = require("./middlewares/notfound.js");

app.use(notfound);
app.use(errorHandlerMiddleware);
// Home

app.get('/', (req, res) => {
    res.send("<h1>This is home page</h1>");
})

// Port
const port = process.env.port || 3000;

// Connect DB and Lisen Server
const start = async () => {
    try {
        await connectDb();
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();