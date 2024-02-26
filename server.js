
const express = require("express");
// const logger = require('./middleware/logger');
// const errorHandler = require('./middleware/errorHandler');


// // Middleware
// app.use(logger);
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// const users = require("./routes/users");
// const posts = require("./routes/posts");

// const error = require("./utilities/error");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});



// // Routes
// app.use('/api', require('./routes/api'));

// // Error handling middleware
// app.use(errorHandler);

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// // Get all resources
// router.get('/resources', (req, res) => {
//     // Logic to retrieve all resources
//     res.json({ message: 'Get all resources' });
// });

// // Create a new resource
// router.post('/resources', (req, res) => {
//     // Logic to create a new resource
//     res.json({ message: 'Create a new resource' });
// });