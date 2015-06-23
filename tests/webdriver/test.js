var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox',
    }
};

webdriverio
    .remote(options)
    .init()
    .url('http://localhost:8000')
    .title(function(err, res) {
        console.log('Title was: ' + res.value);
    })
    .end();
