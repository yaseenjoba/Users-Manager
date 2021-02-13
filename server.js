//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/user-manager'));

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/user-manager/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
var firebase = require("firebase/app");
require("firebase/storage");
const storageRef = firebase.storage().ref();
