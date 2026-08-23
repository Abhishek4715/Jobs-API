const express = require("express");
const app = express();
const AuthenticateUser = require("./middlewares/authentication.js");
const connectDb = require("./db/connect.js");
const jobs = require("./routes/jobsRoutes.js");
const user = require("./routes/authsRoutes.js");
const errorHandlerMiddleware = require("./middlewares/errorHandler.js");
const notfound = require("./middlewares/notfound.js");
const helmet =require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

app.use(express.json());

// Authentication and Route
app.use("/api/v1/jobs", AuthenticateUser, jobs);
app.use("/api/v1/auths", user);

// Error 
app.use(notfound);
app.use(errorHandlerMiddleware);

app.set("trust proxy", 1);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

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