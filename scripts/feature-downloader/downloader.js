var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var service = google.drive('v3');
var AUTH = null;
var HERE = './scripts/feature-downloader/';
var CONFIG = JSON.parse(fs.readFileSync(path.resolve(HERE, '.feature-downloader-conf.json'))) || {};


var SAVE_DIR = CONFIG.saveDirectory || './features';
mkdirp(path.resolve(SAVE_DIR));

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'npm-script-feature-downloader.json';

// Load client secrets from a local file.
fs.readFile(path.resolve(HERE, 'client_secret.json'), function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function (code) {
            rl.close();
            oauth2Client.getToken(code, function (err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    function storeToken(token) {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }

    /**
     * Lists the names and IDs of up to 10 files.
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    function listFiles(auth) {
        AUTH = auth;
        searchFolder('0ByY4lBC2CsctcVdhNGdRaGVubzQ');
    }

    /**
     * recursively search given folder for files
     *
     * @param {string} id folder id
     * @param {string} path current path for recursice folder building
     */
    function searchFolder(id, path) {
        var path = path || '';
        service.files.list({
            auth: AUTH,
            q: `'${id}' in parents`
        }, function (err, response) {
            if (err) {
                console.error('The API returned an error: ' + err);
                if (err.errors[0].domain == 'usageLimits') {
                    console.info("Usage Limits err received. Delaying download of folder %s by 1 sec.", id);
                    setTimeout((id, path) => {
                        searchFolder(id, path);
                    }, 1000, id, path);
                }
                return;
            }
            var files = response.files;
            if (files.length != 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    setTimeout((file)=> {
                        console.log('%s   (%s)', file.name, file.id);
                        if (file.mimeType === 'application/vnd.google-apps.folder') {
                            searchFolder(file.id, '');
                        } else {
                            if (file.name.match(/\.feature$/)) {
                                saveFile(file.name, file.id);
                            }
                        }
                    }, 400 * i, file);
                }
            }
        });
    }


    function saveFile(name, id) {
        let dest = fs.createWriteStream(path.resolve(SAVE_DIR, name));
        service.files.export({
            auth: AUTH,
            fileId: id,
            mimeType: 'text/plain'
        }, (err, response) => {
            if (err) {
                if (err.errors[0].domain == 'usageLimits') {
                    console.info("Usage Limits err received. Delaying download of file %s by 1 sec.", name);
                    setTimeout((name, id) => {
                        saveFile(name, id);
                    }, 1000, name, id);
                }
            }
        }).pipe(dest);
    }
