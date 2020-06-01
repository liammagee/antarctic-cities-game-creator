
const fs = require('fs');
let json = require('../assets/resources/scripts/json-equal-greyscale.json')

import {Resources} from '../assets/Script/WorldScene/Resources';
import {CrisisCountry, Shader, AutomatedScript, GameState, Country, Place, World} from '../assets/Script/WorldScene/World';

let res: Resources = new Resources()
let world: World = new World()


console.log('Build number ' + res.VERSION_ANTARCTIC_FUTURES);

world.initGameState('Easy', 'eng', true, true, 1334, 750);
world.countriesJson = json;
world.initCountries();
console.log("Number of countries: " + Object.keys(world.countries).length);
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
world.gameState.state = world.res.GAME_STATES.STARTED;

const SIM_INTERVAL = 1;
world.updateTimeVars(SIM_INTERVAL);
const updateTime = () => {
    world.gameState.timeoutID = setTimeout(updateTime, SIM_INTERVAL);

    world.gameState.counter++;
    if (world.gameState.counter % world.gameState.timeInterval == 0) {

        world.gameState.currentDate = new Date(world.gameState.currentDate.valueOf());
        world.gameState.currentDate.setDate(world.gameState.currentDate.getDate() + 30.417);

        // Show message box for each new decade
        const currentYear = world.gameState.currentDate.getFullYear();
        const previousYear = world.gameState.previousDate.getFullYear();
        
        // Change of year
        if (currentYear > previousYear) {

            world.gameState.stats[previousYear] = {
                loss: world.gameState.totalLoss,
                prepared: world.gameState.populationPreparedPercent
            };

            let message = '';
            let showDialog = false;

            // Sort narratives by loss for comparison
            const narratives = Object.values(world.res.NARRATIVES.n2048).sort((o1, o2) => {return o2.loss - o1.loss});

            switch (currentYear) {
                case 2048:
                    showDialog = true;
                    
                    for (let i = 0; i < narratives.length; i++) {
                    
                        const n = narratives[i];
                    
                        if (world.gameState.totalLoss >= n.loss) {
                            
                            let index = Math.floor(Math.random() * n[world.gameState.language].length);
                            message = n[world.gameState.language][index];
                            break;

                        }

                    }
                    break;
                default:
                    break;

            }

            if (showDialog) {

                console.log(message);

            }

            console.log('Running sim ' + currentYear);
        }

        world.gameState.previousDate = world.gameState.currentDate;

        // Add policy robustness and loss
        let totalPolicy = 0, totalLoss = 0;
        let countriedAffected = 0, populationAware = 0, populationPrepared = 0;
        
        Object.keys(world.countries).forEach( key => {

            const country = world.countries[key];
            const loss = world.evaluateLoss(country);

            if (loss >= 0.1) {
                country.previousLoss = country.loss;
                country.loss = loss;
            }

            if (country.affected_chance) {

                world.transmitFrom(country);
                world.infectWithin(country);
                world.registerPreparednessWithin(country);

                countriedAffected++;
                populationAware += country.pop_aware;
                populationPrepared += country.pop_prepared;

                country.pop_aware_percent = 100 * country.pop_aware / country.pop_est;
                let existingConvincedPercentage = country.pop_prepared_percent;
                country.pop_prepared_percent = 100 * country.pop_prepared / country.pop_est;

                let imin = (existingConvincedPercentage > 0.5) ? parseInt(existingConvincedPercentage) : 0;
                let imax = (country.pop_prepared_percent > 0.5) ? parseInt(country.pop_prepared_percent) : 0;

            }

            totalPolicy += country.policy;
            totalLoss += country.loss;

        });

        totalPolicy /= Object.keys(world.countries).length;
        world.gameState.policy = totalPolicy;

        totalLoss /= Object.keys(world.countries).length;
        world.gameState.previousLoss = totalLoss;
        world.gameState.totalLoss = totalLoss;

        world.gameState.countriedAffected = countriedAffected;
        world.gameState.populationAware = populationAware;
        world.gameState.populationPrepared = populationPrepared;
        world.gameState.populationAwarePercent = 100 * world.gameState.populationAware / world.gameState.populationWorld;
        world.gameState.populationPreparedPercent = 100 * world.gameState.populationPrepared / world.gameState.populationWorld;

    }

};

const beginHeadlessSim = () => {

    world.gameState.state = world.res.GAME_STATES.PREPARED;

    updateTime();

};
beginHeadlessSim();
// console.log(world.gameState.timeInterval);
// const narratives = Object.values(world.res.NARRATIVES.n2048).sort((o1, o2) => {return o2.loss - o1.loss});
// narratives.forEach((n) => { 
//     // let index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
//     // let message = n[cc.sys.localStorage.language][index];
//     console.log(n.loss)
// })