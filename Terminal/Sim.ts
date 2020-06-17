#!/usr/bin/env ts-node-script

const fs = require('fs');
const { Worker } = require('worker_threads');
const ss = require('simple-statistics')
const chalk = require('chalk');
const { program } = require('commander');

import {World} from '../assets/Script/WorldScene/World';

const json = require('../assets/resources/scripts/json-equal-greyscale.json')
let log = console.log;
let world: World = undefined

program.version('0.0.1');
program
    .option('-s, --strategy <strategy>', 'one of 5 strategy options: none, musk, soc-dem, eco, contra', 'none')
    .option('-r, --runs <runs>', 'the number of runs to execute', 1)
    .parse(process.argv);

const TIME_INTERVAL = 15;
const CHANCE_EACH_TICK_OF_ADDRESSING_CRISIS = 0.08;
const CHANCE_EACH_TICK_OF_DESIGNING_POLICY = 0.08;
const SLOWDOWN_RESOURCE = 0.1;
const DECAY_LOSS = 50.0;
const DECAY_PREPAREDNESS = 50.0;
const CRISIS_CHANCE = 1.0;
let POLICY_FILTER = [];
// Elon Musk
if (program.strategy == 'musk')
    POLICY_FILTER = ['Free Trade Agreements', 'Automate Industry', 'Remove Regulations', 'Boost Military', 'Social Media', 'Global Festivals', 'Celebrity Endorsements', 'Fund Renewable Energy', 'Green Cities'];
// Socialist Democrat
else if (program.strategy == 'soc-dem')
    POLICY_FILTER = ['Reduce Inequality', 'Diplomacy', 'Promote Democracy', 'Global Treaties', 'Social Media', 'Global Festivals', 'Global Education', 'Fund Renewable Energy', 'Public Transport', 'Green Cities', 'Global Heritage Trust'];
// Eco-warrior
else if (program.strategy == 'eco')
    POLICY_FILTER = ['Reduce Inequality', 'Global Treaties', 'Boost Military', 'Social Media', 'Celebrity Endorsements', 'Fund Renewable Energy', 'Public Transport', 'Green Cities', 'Global Heritage Trust'];
// Contradictory
else if (program.strategy == 'contra')
    POLICY_FILTER = ['Free Trade Agreements', 'Reduce Inequality', 'Remove Regulations', 'Boost Military', 'Global Education', 'Global Heritage Trust', 'Public Transport'];
// Military
else if (program.strategy == 'mil')
    POLICY_FILTER = ['Boost Military'];

log(chalk.red(`Running Sim with strategy: '${program.strategy}' and these policies: ${POLICY_FILTER.join(', ')}.`));


const PRINT_ANNUAL_STATS = false;
const PRINT_RUN_STATS = false;
const RUNS = program.runs;
const PARALLEL = false;

let resourcesById = {};

let hrstart = process.hrtime();
let yrstart, yrend;


const init = () => {
    world = new World()
    world.initGameState('Easy', 'eng', true, true, 1334, 750);
    world.countriesJson = json;
    world.setupCountries();
    world.gameState.state = world.res.GAME_STATES.PREPARED;
    world.gameState.tutorialMode = false;
    let antCountries = ["NZL", "AUS", "ZAF", "ARG", "CHL"];
    let startCountry = antCountries[Math.floor(Math.random() * antCountries.length)];
    world.gameState.startCountry = startCountry;
    world.gameState.statsCountry = startCountry;
    world.gameState.currentCountry = startCountry;
    const country = world.countries[world.gameState.startCountry];
    country.policy = 1.0;
    country.affected_chance = 1.0;
    
    world.res.DECAY_LOSS = DECAY_LOSS;
    world.res.DECAY_PREPAREDNESS = DECAY_PREPAREDNESS;
    world.res.CRISIS_CHANCE = CRISIS_CHANCE;
    world.res.MONTH_INTERVAL = TIME_INTERVAL;

    world.updateTimeVariables(world.res.MONTH_INTERVAL);

    Object.values(world.res.RESOURCES).forEach((grp) => { grp.policyOptions.forEach((po) => { resourcesById[po.id] = po; })})
    
    if (POLICY_FILTER.length > 0) {
        let rf = {};
        Object.values(resourcesById).forEach((res) => { 
            if (POLICY_FILTER.includes(res['eng']['text'])) 
                rf[res['id']] = res;
        });
        resourcesById = rf;
    }

    if (PRINT_RUN_STATS)
        log("Number of countries: " + Object.keys(world.countries).length);

}




const printWorldStats = () => {

    const currentYear = world.gameState.currentDate.getFullYear();
    const previousYear = world.gameState.previousDate.getFullYear();

    const lossPercent = Math.round(world.gameState.totalLoss);
    const preparedPercent = Math.round(world.gameState.populationPreparedPercent);

    log(chalk.bgBlue.bold("Stats for year " + previousYear) + ":");
    log(`   ${'Resources:'.padEnd(20)} ${chalk.cyan(world.gameState.resources)}`);
    log(`   ${'Loss:'.padEnd(20)} ${chalk.red(lossPercent + '%')}`);
    log(`   ${'Crises:'.padEnd(20)} ${chalk.red(world.gameState.crisisCount)}`);
    log(`   ${'Policies:'.padEnd(20)} ${chalk.green(Object.values(world.gameState.policies).length)}`);
    log(`   ${'Preparedness:'.padEnd(20)} ${chalk.green(preparedPercent + '%')}`);
    yrend = process.hrtime(yrstart);
    log(`   ${'YEAR TIME:'.padEnd(20)} ${yrend}`);
    yrstart = process.hrtime();

}

const doGameOver = () => {
    let message = '';
    // Sort narratives by loss for comparison
    const narratives = Object.values(world.res.NARRATIVES.n2070).sort((o1, o2) => {return o2.loss - o1.loss});
    
    let i = 0;
    for (; i < narratives.length; i++) {

        const n = narratives[i];
        if (world.gameState.totalLoss >= n.loss) {

            const index = Math.floor(Math.random() * n[world.gameState.language].length);
            message = n[world.gameState.language][index];
            break;

        }

    }

    let gameOverState = -1;

    if (i == narratives.length - 1) {
        gameOverState = 0;
    }
    else if (i == 0) {
        gameOverState = 2;
    }
    else {
        gameOverState = 1;
    }

    if (PRINT_RUN_STATS) {

        switch (gameOverState) {
            case 0:
                log(chalk.green('RESULT'));
                log(chalk.green(message));
                break;
            case 1:
                log(chalk.yellow('RESULT'));
                log(chalk.yellow(message));
                break;
            case 2:
                log(chalk.red('RESULT'));
                log(chalk.red(message));
                break;
        }
        log(chalk.yellow(`POLICIES: ${Object.keys(world.gameState.policies).length}`))
        Object.keys(world.gameState.policies).forEach((policy) => {
    
            let level = world.gameState.policies[policy];
            let res = resourcesById[policy];
            log(chalk.yellow(`${(res.eng.text+':').padEnd(30)} ${level}`));
    
        })
        
        printWorldStats();
    
    }

    
    return gameOverState;

}

const runSim = () => {
    
    
    world.gameState.counter++;

    if (world.gameState.counter % world.gameState.timeInterval == 0) {

        const previousYear = world.gameState.previousDate.getFullYear();
        world.updateGameTime((message) => { 
            if (PRINT_ANNUAL_STATS)
                console.log(message); 
        });
        const currentYear = world.gameState.currentDate.getFullYear();
        if (currentYear > previousYear) {
            if (PRINT_ANNUAL_STATS)
                printWorldStats();
        }

    }

    world.updateGameStats();

    // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
    let ci = world.isItTimeForNewCrisis();
    if (world.gameState.counter - world.gameState.lastCrisis >= ci  && Math.random() < world.res.CRISIS_CHANCE) {

        const r = Math.random();
        const crisisInCountry = world.crisisProbLocation(r);
        if (crisisInCountry !== undefined) {

            world.gameState.crisisCountry = crisisInCountry;
            world.gameState.crises.push(crisisInCountry);
            world.gameState.crisisCount++;
            world.gameState.lastCrisis = world.gameState.counter;
    
        }

    }

    // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
    let ri = world.isItTimeForNewResources();
    if (world.gameState.counter - world.gameState.lastResource >= ri) {

        const res = Math.floor(1 + Math.random() * 3);
        world.gameState.resources += res;

        world.gameState.lastResource = world.gameState.counter;
        world.gameState.resourceInterval *= (1 + Object.keys(world.gameState.policies).length * SLOWDOWN_RESOURCE) ;

    }

    // FOR SIMULATION ONLY - ADD POLICIES RANDOMLY
    let rc = Math.random();
    if (rc < CHANCE_EACH_TICK_OF_ADDRESSING_CRISIS && world.gameState.crises.length > 0) {
        let i = Math.floor(Math.random() * world.gameState.crises.length);
        const crisisInCountry = world.gameState.crises[i];
        let country = world.countries[crisisInCountry.country];
        let crisis = world.res.CRISES[crisisInCountry.crisis];
        world.gameState.crises.splice(i, 1);
        if (PRINT_ANNUAL_STATS)
            log(chalk.bgRed.bold.white(`Resolved ${crisis[world.gameState.language]} in ${country.name}`))
    }
    let rp = Math.random();
    let keys = Object.keys(resourcesById);
    if (rp < CHANCE_EACH_TICK_OF_DESIGNING_POLICY) {
        let i = Math.floor(Math.random() * keys.length);
        let opt = resourcesById[keys[i]];
        const cost = world.costCalculation(opt);
        if (world.gameState.resources - cost >= 0 && 
            world.gameState.policies[opt.id] === undefined) {

            world.gameState.resources -= cost;  
            world.gameState.policies[opt.id] = 1;

        }
        else if (world.gameState.resources - cost >= 0 && 
            world.gameState.policies[opt.id] === 1) {

            world.gameState.resources -= cost;  
            world.gameState.policies[opt.id] = 2;

        }
        else if (world.gameState.resources - cost >= 0 && 
            world.gameState.policies[opt.id] == 2) {

            world.gameState.resources -= cost;  
            world.gameState.policies[opt.id] = 3;

        }

    }

    // Game over        
    let gameOverState = -1;                
    if (world.gameState.totalLoss >= 100) {

        gameOverState = doGameOver();

    }
    else if (world.gameState.currentDate >= world.gameState.targetDate) {

        gameOverState = doGameOver();

    }

    return gameOverState;

};


const beginHeadlessSim = () => {

    world.gameState.state = world.res.GAME_STATES.STARTED;

    yrstart = process.hrtime();
    
    let gameOverFinalState = -1;
    while(gameOverFinalState < 0) {

        gameOverFinalState = runSim();

    }
    world.gameState.finalState = gameOverFinalState;

};


const runAll = () => {
    let gameOverStates = [], years = [], losses = [], preps = [];

    if (PARALLEL) {
        for (let i = 0; i < RUNS; i++) {
            const worker = new Worker(`
            const { parentPort } = require('worker_threads');
            init();
            beginHeadlessSim();
        
            let years = world.gameState.currentDate.getFullYear() - world.gameState.startDate.getFullYear();
            parentPort.once('message',
                message => parentPort.postMessage({ years: years }));
    
            `, { eval: true });
            worker.on('message', message => years.push(message.years)); 
    
        }
        // async.parallel(funcs, (err, res) => {
        //     log(err, res);
        // })
        
    }
    else { // SYNC VERSION
        for (let i = 0; i < RUNS; i++) {
            if (PRINT_RUN_STATS) {
                log()
                log()
                log()
                log(chalk.bgRed(`RUN ${i + 1}`))
            }
            init();
            beginHeadlessSim();
        
            gameOverStates.push(world.gameState.finalState);
            let year = world.gameState.currentDate.getFullYear() - world.gameState.startDate.getFullYear();
            years.push(year);
            losses.push(world.gameState.totalLoss);
            preps.push(world.gameState.populationPreparedPercent);
           
        }
        
    }
    
    let wins = gameOverStates.reduce((n, x) => n + (x === 0), 0);
    let lossesPartial = gameOverStates.reduce((n, x) => n + (x === 1), 0);
    let lossesTotal = gameOverStates.reduce((n, x) => n + (x === 2), 0);

    let hrend = process.hrtime(hrstart);
    log()
    log(chalk.bgGreen.bold.black(`******************************************`))
    log(chalk.bgGreen.bold.black(`** STRATEGY:       ${program.strategy.padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`** RUNS:           ${RUNS.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`** PARALLEL:       ${PARALLEL.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`** EXECUTION TIME: ${hrend.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**                                      **`))
    log(chalk.bgGreen.bold.black(`** GAME STATES                          **`))
    log(chalk.bgGreen.bold.black(`** Wins            ${wins.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`** Losses, partial ${lossesPartial.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`** Losses, total   ${lossesTotal.toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**                                      **`))
    log(chalk.bgGreen.bold.black(`** YEARS                                **`))
    log(chalk.bgGreen.bold.black(`**  - average:     ${Math.round(ss.mean(years)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - st. dev.:    ${Math.round(ss.standardDeviation(years)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - min:         ${Math.round(ss.min(years)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - max:         ${Math.round(ss.max(years)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**                                      **`))
    log(chalk.bgGreen.bold.black(`** LOSS                                 **`))
    log(chalk.bgGreen.bold.black(`**  - average:     ${Math.round(ss.mean(losses)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - st. dev.:    ${Math.round(ss.standardDeviation(losses)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - min:         ${Math.round(ss.min(losses)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - max:         ${Math.round(ss.max(losses)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**                                      **`))
    log(chalk.bgGreen.bold.black(`** PREPAREDNESS                         **`))
    log(chalk.bgGreen.bold.black(`**  - average:     ${Math.round(ss.mean(preps)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - st. dev.:    ${Math.round(ss.standardDeviation(preps)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - min:         ${Math.round(ss.min(preps)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`**  - max:         ${Math.round(ss.max(preps)).toString().padStart(20)} **`))
    log(chalk.bgGreen.bold.black(`******************************************`))
    log()
    
}
runAll();

// FOR UNIT TESTS

// init();
// for (let i = 0; i < 100; i++) {
//     let val1 = world.sigmoidalDecay(i, 10.0);
//     let val2 = world.exponentialDecay(i, 50.0);
//     log(i+":"+val1+":"+val2);
// }

// Object.keys(world.gameState.policyRelations).forEach((source) => {
//     let targets = world.gameState.policyRelations[source];
//     Object.keys(targets).forEach((target) => {
//         let val = world.gameState.policyRelations[source][target];
//         log("Effect of "+world.gameState.policyOptions[source].eng.text +" on "+world.gameState.policyOptions[target].eng.text + " is: "+ val);
//     })

// init();
// Object.keys(resourcesById).forEach((source) => {
//     Object.keys(resourcesById).forEach((target) => {
//         if (source != target) {
//             world.gameState.policyRelations[source][target];        
//             let val = world.gameState.policyRelations[source][target];
//             log("Effect of "+world.gameState.policyOptions[source].eng.text +" on "+world.gameState.policyOptions[target].eng.text + " is: "+ val);
//         }
//     });
// });

// console.log(world.gameState.timeInterval);
// const narratives = Object.values(world.res.NARRATIVES.n2048).sort((o1, o2) => {return o2.loss - o1.loss});
// narratives.forEach((n) => { 
//     // let index = Math.floor(Math.random() * n[world.gameState.language].length);
//     // let message = n[world.gameState.language][index];
//     console.log(n.loss)
// })