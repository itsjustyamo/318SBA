const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging Middleware
app.use((req, res, next) => {
    const time = new Date();
    console.log(`${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
    if (Object.keys(req.body).length > 0) {
        console.log("Containing the data:");
        console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});

// View engine setup
app.set('view engine', 'ejs');

// Routes for Lipstick, Mascara, Scrunchie
const lipstickRoute = require("./routes/lipstick");
const mascaraRoute = require("./routes/mascara");
const scrunchieRoute = require("./routes/scrunchie");

app.use('/lipstick', lipstickRoute);
app.use('/mascara', mascaraRoute);
app.use('/scrunchie', scrunchieRoute);

// 404 Middleware
app.use((req, res, next) => {
    next({ status: 404, message: "Resource Not Found" });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

// Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
