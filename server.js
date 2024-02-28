const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
 
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

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

// // Get all resources
// router.get('/resources', (req, res) => {
//     // Logic to retrieve all resources
//     res.json({ message: 'Get all resources' });
// })

// // Create a new resource
// router.post('/resources', (req, res) => {
//     // Logic to create a new resource
//     res.json({ message: 'Create a new resource' });
// }):

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});