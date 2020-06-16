

import {World} from '../assets/Script/WorldScene/World';
const json = require('../assets/resources/scripts/json-equal-greyscale.json')

let world: World = null;

beforeAll(() => {
    world = new World();
    world.initGameState('Easy', 'eng', true, true, 1334, 750);
});
  
describe('shuffle array ', () => {
    test('for basic array ', () => {
        let a = Array.from({length: 100}, (_, id) => (id));
        expect(world.shuffleArray(a).length).toBe(100);
    })
});

describe('exponential decay ', () => {
    test('for 0', () => {
        expect(world.exponentialDecay(0.0, 0)).toBeGreaterThan(8);
    });
    
    test('for 1', () => {
        expect(world.exponentialDecay(1.0, 0)).toBe(1);
    });
    
    test('for 1.1', () => {
        expect(world.exponentialDecay(1.1, 0)).toBeLessThan(1.0);
    });
    
    test('for 10.0', () => {
        expect(world.exponentialDecay(10.0, 0)).toBeLessThan(1.0);
    });
    
    test('for 100.0', () => {
        expect(world.exponentialDecay(100.0, 0)).toBeLessThan(0.5);
    });
});

  
describe('sigmoidal decay ', () => {
    test('for 0', () => {
        expect(world.sigmoidalDecay(0.0, 50.0)).toBe(1.0);
    });
    
    test('for 10.0', () => {
        expect(world.sigmoidalDecay(10.0, 50.0)).toBeGreaterThan(1.0);
        expect(world.sigmoidalDecay(10.0, 50.0)).toBeLessThan(Math.E);
    });
    
    test('for 90.0', () => {
        expect(world.sigmoidalDecay(90.0, 50.0)).toBeGreaterThan(1.0);
        expect(world.sigmoidalDecay(90.0, 50.0)).toBeLessThan(Math.E);
    });

    
    test('for 50.0', () => {
        expect(world.sigmoidalDecay(50.0, 50.0)).toBe(Math.E);
    });
    
    test('for 100.0', () => {
        expect(world.sigmoidalDecay(100.0, 50.0)).toBe(1.0);
    });
});

describe('country initialisation functions', () => {
    let fra, ind, aus;

    beforeAll(() => {
        world.countriesJson = json;
        world.setupCountries();
        
        fra = world.countries['FRA'];
        ind = world.countries['IND'];
        aus = world.countries['AUS'];
    });

    test('should have more than one country', () => {
        expect(Object.keys(world.countries).length).toBeGreaterThan(100);
    });

    test('should have a country value for Australia', () => {
        expect(world.countries['AUS']).toBeDefined();
    });

    // REVIEW: UNCLEAR HOW THIS IS WORKING
    test('should have sorted countries correctly', () => {
        let fra = world.countries['FRA'];
        let ind = world.countries['IND'];
        let aus = world.countries['AUS'];
        expect(world.sortedObjs.indexOf(ind)).toBeLessThan(world.sortedObjs.indexOf(fra));
        expect(world.sortedObjs.indexOf(ind)).toBeLessThan(world.sortedObjs.indexOf(aus));
    });

    test('mapping all points ', () => {
        expect(Object.keys(world.mapAllPoints()).length).toBeGreaterThan(1000);
    });

    test('should have a country value for Australia', () => {
        expect(fra.neighbours.length).toBe(7);
        expect(fra.neighbours).toContain('DEU');
        expect(fra.points_shared).toBeGreaterThan(0);
        expect(fra.points_total).toBeGreaterThan(10);
        expect(fra.shared_border_percentage).toBeGreaterThan(0.5);
        expect(ind.neighbours.length).toBe(6);
        expect(ind.neighbours).toContain('PAK');
        expect(ind.points_shared).toBeGreaterThan(0);
        expect(ind.points_total).toBeGreaterThan(10);
        expect(ind.shared_border_percentage).toBeGreaterThan(0.5);
        expect(aus.neighbours.length).toBe(0);
        expect(aus.points_shared).toBe(0);
        expect(aus.points_total).toBeGreaterThan(100);
        expect(aus.shared_border_percentage).toBe(0);
    });

    test('should have relative densities', () => {
        expect(aus.density).toBeLessThan(fra.density);        
        expect(aus.density).toBeLessThan(ind.density);        
        expect(fra.density).toBeLessThan(ind.density);        
    });

    test('should have correct country areas', () => {
        expect(world.areaMin).toBeLessThan(2000);
        // Slovenia - smallest included in the set
        expect(world.areaMinCountry).toBe('SVN');
        expect(world.areaMax).toBeGreaterThan(700000);
        // Russia
        expect(world.areaMaxCountry).toBe('RUS');
        expect(world.areaMean).toBeGreaterThan(30000);
        // Ratio is log2 of max / min counry area
        expect(world.areaRatio).toBe(9);
    });

    test('should have relative sizes ', () => {
        expect(fra.numPoints).toBe(1);
        expect(ind.numPoints).toBe(13);
        expect(aus.numPoints).toBe(28);
    });

    test('world population', () => {
        expect(world.gameState.populationWorld).toBeGreaterThan(7000000000);
        expect(world.gameState.populationWorld).toBeLessThan(8000000000);
    });

    describe('Cartographic functions', () => {

        test('should have extremes with min values less than max values', () => {
            let extremes = world.extremes(aus.points);
            expect(extremes[0].minx).toBeLessThan(extremes[0].maxx);
            expect(extremes[0].miny).toBeLessThan(extremes[0].maxy);
            expect(extremes[1].minx).toBeLessThan(extremes[1].maxx);
            expect(extremes[1].miny).toBeLessThan(extremes[1].maxy);
        });

        test('should have a mainland area less than total area ', () => {
            let mainlandArea = world.regionalArea(aus.points[0]);
            expect(mainlandArea).toBeLessThan(aus.area);
        });

        test('should have each area less than total area ', () => {
            let totalArea = world.areas(aus.points);
            aus.points.forEach(points => {
                let landArea = world.regionalArea(points);
                expect(landArea).toBeLessThan(totalArea);
            });
        });

        test('should have centroid value betwen min and max values', () => {
            let extremes = world.extremes(aus.points);
            let centroid = world.centroids(aus.points);
            expect(centroid.x).toBeGreaterThan(extremes[0].minx);
            expect(centroid.x).toBeLessThan(extremes[0].maxx);
            expect(centroid.y).toBeGreaterThan(extremes[0].miny);
            expect(centroid.y).toBeLessThan(extremes[0].maxy);
        });
        
    });


    describe('Initialise Game State', () => {
        
        const level = 'easy';
        const language = 'eng';
        const greyscale = true;
        const isMobile = true;
        const width = 1334;
        const height = 750;

        beforeEach(() => {
            world.initGameState(level, language, greyscale, isMobile, width, height);
        });


    });

    describe('Time variables', () => {

        const INTERVAL = 10;

        beforeEach(() => {
            world.updateTimeVariables(INTERVAL);
        });

        test('should update dependent variables correctly', () => {
            expect(world.gameState.timeInterval).toBe(INTERVAL);
            expect(world.gameState.tutorialInterval).toBe(INTERVAL * world.res.TUTORIAL_INTERVAL_MULTIPLIER);
            expect(world.gameState.resourceInterval).toBe(INTERVAL * world.res.RESOURCE_INTERVAL_MULTIPLIER);
            expect(world.gameState.crisisInterval).toBe(INTERVAL * world.res.CRISIS_INTERVAL_MULTIPLIER);
        });
        
    });

    

});
