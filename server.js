#!/usr/bin/env node
/*jshint esversion: 6 */
const fs = require("fs");
const express = require('express');
const writer = require('flush-write-stream');
const app = express();
const args = require('minimist')(process.argv.slice(2))
let port = args.port || 8000;

app.use(express.json({limit: '10mb', extended: true}));       // to support JSON-encoded bodies
app.use(express.urlencoded({limit: '10mb', extended: true})); // to support URL-encoded bodies
app.use(express.static('./build/web-mobile'));


var stream = fs.createWriteStream("results.json", {flags:'a'});

app.post('/game_data', (req, res) => { 
    req.body.ip = req.ip;
    let ts = Date.now();
    req.body.timestamp  = ts;
    req.body.submittedDate  = new Date(ts);
    stream.cork();
    stream.write(JSON.stringify(req.body) + "\n");
    process.nextTick(() => {
        stream.uncork();
    });
    res.send('Thanks for the data!');
});

app.listen(port, () => console.log(`Antarctic Futures app listening on port ${port}!`));

process.on('exit', function () {
    stream.end();
    console.log('About to exit.');
});