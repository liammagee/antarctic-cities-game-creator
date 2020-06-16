

const fs = require('fs');
const ss = require('simple-statistics')
const chalk = require('chalk');
const { program } = require('commander');
const ipLocation = require("iplocation");
const readline = require('readline');

const options = { year: 'numeric', month: 'long', day: 'numeric' };

program
    .option('-i, --input <inputFile>', 'the log file of results', 'results.json')
    .parse(process.argv);


const Reader = require('@maxmind/geoip2-node').Reader;
// Typescript:
// import { Reader } from '@maxmind/geoip2-node';

const readerOptions = {
  // you can use options like `cache` or `watchForUpdates`
};

// lineReader.on('line', function (line) {
    // console.log(line);
// });

Reader.open('/Users/liam/Downloads/GeoLite2-City_20200609/GeoLite2-City.mmdb', readerOptions).then(reader => {
    //   console.log(reader.city('1.1.1.1'));
    //  JM%V,-qN2D#Ps28

    let lineReader = readline.createInterface({
        //   input: fs.createReadStream('tmp/results.14042020.json'),
        //   input: fs.createReadStream('tmp/results.12062020.json'),
        input: fs.createReadStream(program.input),
        //   output: process.stdout,
        console: false
    });
    
    let totalLoss = 0;
    let counter = 0;
    let countries = {};
    let cities = {};

    lineReader.on('line', function (line) {
        counter++;
        let obj = JSON.parse(line);
        totalLoss += obj.totalLoss;

        let ip = obj.ip.split('::ffff:')[1]

        try {
            let loc = reader.city(ip);
            console.log(loc);
    
    
            if (countries[loc.country.names.en] === undefined) {
                countries[loc.country.names.en] = {}
                countries[loc.country.names.en].loss = [];
            }
    
            countries[loc.country.names.en].loss.push(obj.totalLoss);
    
            if (loc.city.names !== undefined) {
                if (cities[loc.city.names.en] === undefined) {
                    cities[loc.city.names.en] = {}
                    cities[loc.city.names.en].loss = [];
                }
                cities[loc.city.names.en].loss.push(obj.totalLoss);
        
            }
    
            // (async () => {
            //     let promise = new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             let result = ipLocation(obj.ip.split('::ffff:')[1]);
            //             resolve(result);
            //         }, 1000);
            //     });
            //     let loc = await promise;
            //     //=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
            //     console.log(`${loc['country']['name']}`)
            // })();
            // console.log(`${obj.ip.strip('::ffff:')}`)
            // console.log(`${new Date(obj.currentDate).toLocaleDateString(undefined, options)} ${obj.totalLoss}`);
            // console.log(`${new Date(obj.currentDate).toLocaleDateString(undefined, options)} ${obj.totalLoss}`);
            // console.log(`${new Date(obj.currentDate).toLocaleDateString(undefined, options)} ${obj.totalLoss}`);
                
        } catch (error) {
            
        }
    });

    lineReader.on('close', function () {
        totalLoss /= counter;
        console.log(`Average loss: ${totalLoss}`);
        console.log();
        console.log(`COUNTRIES`);
        for (let [key, value] of Object.entries(countries)) {
            console.log(`${key}: ${ss.mean(value['loss'])}`);
          }

        console.log();
        console.log(`CITIES`);
        for (let [key, value] of Object.entries(cities)) {
            console.log(`${key}: ${ss.mean(value['loss'])}`);
        }
    });
    
});



