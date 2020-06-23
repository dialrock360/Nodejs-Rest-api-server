// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var apiRouter   = require('./routes/apiRouter').router;

// Instantiate server
var server = express();

// Configuring server port
const port = process.env.PORT || 3000;

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

server.use('/api/', apiRouter);

// Launch server
server.listen(port, function() {
    console.log('Serveur en écoute :... au) http://localhost:' + port);
});