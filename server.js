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
const gcloud = require('google-cloud')

const storage = gcloud.storage({
    projectId: 'usermanager-840bf',
    keyFilename: 'service-account-credentials.json',
});

const bucket = storage.bucket('usermanager-840bf.appspot.com')
var storage = require('@google-cloud/storage')
