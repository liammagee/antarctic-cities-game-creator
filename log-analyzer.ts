

const fs = require('fs');
const ss = require('simple-statistics')
const chalk = require('chalk');
const { program } = require('commander');
const ipLocation = require("iplocation");
const readline = require('readline');

import {Resources} from './assets/Script/WorldScene/Resources';
import {World, GameState} from './assets/Script/WorldScene/World';

const options = { year: 'numeric', month: 'long', day: 'numeric' };

program
    .option('-i, --input <inputFile>', 'the log file of results', 'results.json')
    .parse(process.argv);


const Reader = require('@maxmind/geoip2-node').Reader;

const readerOptions = {
  // you can use options like `cache` or `watchForUpdates`
};

let gameStates: GameState[] = []

Reader.open('/Users/liam/Downloads/GeoLite2-City_20200609/GeoLite2-City.mmdb', readerOptions).then(reader => {

    let lineReader = readline.createInterface({
        //   input: fs.createReadStream('tmp/results.14042020.json'),
        //   input: fs.createReadStream('tmp/results.12062020.json'),
        input: fs.createReadStream(program.input),
        //   output: process.stdout,
        console: false
    });
    
    let res : Resources = new Resources();
    let totalLoss = 0;
    let counter = 0;
    let countries = {};
    let cities = {};
    let policyCounts : Map<number, number> = new Map<number, number>();
    let policyLevels : Map<number, number> = new Map<number, number>();
    let policyIds : Map<number, string> = new Map<number, string>();
    

    res.RESOURCES.economic.policyOptions.map((opt) => {
        policyIds[opt.id] = opt.eng.text;
    });
    res.RESOURCES.politics.policyOptions.map((opt) => {
        policyIds[opt.id] = opt.eng.text;
    });
    res.RESOURCES.cultural.policyOptions.map((opt) => {
        policyIds[opt.id] = opt.eng.text;
    });
    res.RESOURCES.ecology.policyOptions.map((opt) => {
        policyIds[opt.id] = opt.eng.text;
    });
    for (let id of Object.keys(policyIds)) {
        policyCounts[id] = 0;
        policyLevels[id] = 0;
    }

    lineReader.on('line', function (line) {
        counter++;
        let gameState = JSON.parse(line);
        totalLoss += gameState.totalLoss;
        
        for (let id of Object.keys(gameState.policies)) {
            let level = gameState.policies[id];
            policyCounts[id] += 1;
            policyLevels[id] += level;
        }

        let ip = gameState.ip.split('::ffff:')[1]

        try {
            let loc = reader.city(ip);
    
            if (countries[loc.country.names.en] === undefined) {
                countries[loc.country.names.en] = {}
                countries[loc.country.names.en].loss = [];
            }
    
            countries[loc.country.names.en].loss.push(gameState.totalLoss);
    
            if (loc.city.names !== undefined) {
                if (cities[loc.city.names.en] === undefined) {
                    cities[loc.city.names.en] = {}
                    cities[loc.city.names.en].loss = [];
                }
                cities[loc.city.names.en].loss.push(gameState.totalLoss);
        
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

        console.log();
        console.log(`POLICIES`);
        for (let [key, value] of Object.entries(policyIds)) {
            console.log(`${value}: `);
            console.log(` - Count: ${policyCounts[key]}`);
            console.log(` - Levels: ${policyLevels[key]}`);
        }

    });
    
});






