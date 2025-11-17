
// Import required modules
const path = require('path'); // Node.js module for working with file and directory paths
const express = require('express'); // Express framework for building web applications
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Commented out debugging lines - useful for checking directory paths during development
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
// console.log(__filename);

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;
const name = 'Dmytro Tarasenko'

// Define directory paths for serving static files and template views
const publicDirectoryPath = path.join(__dirname, '../public'); // Path to a public folder containing static assets (CSS, images, client-side JS)
const viewsPath = path.join(__dirname, '../templates/views'); // Path to the templates folder containing Handlebars (.hbs) files
const partialsPath = path.join(__dirname, '../templates/partials');

// Configure Express settings
app.set('view engine', 'hbs'); // Set Handlebars as the templating engine
app.set('views', viewsPath); // Set a custom location for view templates (default would be 'views' folder)
hbs.registerPartials(partialsPath);

// Set up a static directory to serve
app.use(express.static(publicDirectoryPath)); // Serve static files from the public directory

// Route: Home page
app.get('', (req, res) => {
    // Render the index.hbs template with dynamic data
    res.render('index', {
        title: 'Weather', // Page title
        name, // Name to display on the page
    });
});

// Route: About page
app.get('/about', (req, res) => {
    // Render the about.hbs template with dynamic data
    res.render('about', {
        title: 'About Me', // Page title
        name, // Name to display on the page
    });
})

// Route: Help page
app.get('/help', (req, res) => {
    // Render the help.hbs template with dynamic data
    res.render('help', {
        title: 'Help', // Page title
        message: 'This is a help page', // Help message to display
        name, // Name to display on the page
    })
})

// Route: Weather API endpoint
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        console.log('latitude = ', latitude);
        console.log('longitude = ', longitude);
        console.log('location = ', location);
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                console.log('error = ', error);
                return res.send({error});
            }
            console.log('forecastData = ', forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        })
    })

    // Send JSON response with weather data
    // res.send({
    //     temperature: 25, // Temperature value (hardcoded for now)
    //     location: 'Philadelphia', // Location name (hardcoded for now)
    //     address: req.query.address,
    // });
});

app.get('/products', (req, res) => {
if(!req.query.search) {
    return res.send({
    error: 'You must provide a search term',
    });
}
    console.log('req.query =', req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*path', (req, res) => {
   res.render('404', {
       title: '404',
       errorMessage: 'Help article not found',
       name, // Name to display on the page
   });
});

app.get('*path', (req, res) => {
   res.render('404', {
       title: '404',
       errorMessage: 'Page not found',
       name, // Name to display on the page
   })
});

// Start the server and listen on port 3000
app.listen(port, () => {
    // Log message when the server successfully starts
    console.log('Server is up and running on port ' + port);
})