const fs = require("fs");
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
let port = args['port'] || 8000

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('./'))


var stream = fs.createWriteStream("results.json", {flags:'a'});

app.post('/game_data', (req, res) => { 
    req.body.ip = req.ip;
    stream.write(JSON.stringify(req.body) + "\n");
    res.send('Thanks for the data!')
})

app.listen(port, () => console.log(`Antarctic Futures app listening on port ${port}!`))

process.on('exit', function () {
    stream.end();
    console.log('About to exit.');
});