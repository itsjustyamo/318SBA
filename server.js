const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
 
const lipstick = require("./routes/lipstick");
const mascara = require("./routes/mascara");
const srunchie = require("./routes/scrunchie");

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();

    console.log(
        `-----
    ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
      );
      if (Object.keys(req.body).length > 0) {
        console.log("Containing the data:");
        console.log(`${JSON.stringify(req.body)}`);
      }
      next();
    });

// 404 Miidleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

//Error Handler Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });


  //Listening
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});