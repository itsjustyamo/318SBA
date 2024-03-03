//imports
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//Static files 
app.use(express.static ('public'))
app.use('/style.css', express.static(__dirname + 'public/style.css'))
app.use('/index.js', express.static(__dirname + 'public/index.js'))
app.use('/photos', express.static(__dirname + 'public/photos'))

// View engine setup
app.set('views', './views')
app.set('view engine', 'ejs');

app.get('',(req, res) => {
    res.render ('items', { text: 'This works'})
})

// // Middleware
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Logging Middleware
// app.use((req, res, next) => {
//     const time = new Date();
//     console.log(`${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
//     if (Object.keys(req.body).length > 0) {
//         console.log("Containing the data:");
//         console.log(`${JSON.stringify(req.body)}`);
//     }
//     next();
// });

// // Routes for Lipstick, Mascara, Scrunchie
// const lipstickRoute = require("./routes/lipstick");
// const mascaraRoute = require("./routes/mascara");
// const scrunchieRoute = require("./routes/scrunchie");

// app.use(express.static("./views"));
// app.use('/lipstick', lipstickRoute);
// app.use('/mascara', mascaraRoute);
// app.use('/scrunchie', scrunchieRoute);


// // Route for handling search requests
// app.post('/search', (req, res) => {
//     const { searchTerm, Volume } = req.body;
//     res.json({ searchTerm, Volume });
// });

// // 404 Middleware
// app.use((req, res, next) => {
//     next({ status: 404, message: "Resource Not Found" });
// });

// // Error Handler Middleware
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({ error: err.message });
// });

// Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
