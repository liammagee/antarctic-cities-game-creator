
import {Resources} from './Resources';


/**
 * Proxy struct for Point
 */
export class Point  {

    x: number = 0
    y: number = 0

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

export class Shader  {
    u_cellSize: number = 0.0
    u_randFactor: number = 0.0
    u_randAlpha: number = 0.0
    u_sizePower: number = 0.0
    u_sizeMultiplier: number = 0.0
    u_stepMin: number = 0.0
    u_stepMax: number = 0.0
    u_borderRadius: number = 0.0
}

export class Place  {
    points: Point[] = []
    name: string = null
    iso_a2: string = null
    iso_a3: string = null
    latitute: number = 0
    longitude: number = 0
    pop_max: number = 0
    pop_min: number = 0
}

export class Country  {
    name: string = null
    points: Point[][] = []
    extremes: Point[] = []
    centroid: Point = null
    area: number = 0
    affected_chance: number = 0
    pop_est: number = 0
    pop_aware: number = 0
    pop_aware_percent: number = 0
    pop_prepared: number = 0
    pop_prepared_percent: number = 0
    gdp_est: number = 0
    iso_a2: string = null
    iso_a3: string = null
    subregion: string = null
    economy: string = null
    income_grp: string = null
    income_grp_num: number = 0
    equator_dist: number = 0
    offsetX: number = 0
    offsetY: number = 0

    policy: number = 0
    previousLoss: number = 0
    loss: number = 0
    neighbours: Country[] = []
    points_shared: number = 0
    points_total: number = 0
    shared_border_percentage: number = 0
    policyPoints: any[] = []
    policyDots: any[] = []
    destructionPoints: any[] = []
    destructionDots: any[] = []
    selected: boolean = false
    places: Map<string,Place> = new Map<string,Place>()
}

export class CrisisCountry {
    crisis: string = ''
    id: number = 0
    country: string = ''
    counter: number = 0
}

export class Policy {
    cost_1: number = 0
    cost_2: number = 0
    cost_3: number = 0
    
}

export class GameState  {
    populationWorld: number = 0
    level: string = ''
    language: string = 'eng'
    greyscale: boolean = true
    difficultyMultiplier: number = 0
    state: number = 0
    modal: boolean = false
    startDate: Date = new Date(Date.now())
    targetDate: Date = new Date(Date.now())
    previousDate: Date = null
    currentDate: Date = null
    counter: number = 0
    lastResource: number = 0
    lastCrisis: number = 0
    crises: CrisisCountry[] = []
    crisisCountry: CrisisCountry = null
    crisisCount: number = 0
    policies: Map<number, number> = new Map<number, number>()
    policy: number = 0
    countriedAffected: number = 0
    populationAware: number = 0
    populationPrepared: number = 0
    populationAwarePercent: number = 0
    populationPreparedPercent: number = 0
    resources: number = 0
    alertResources: boolean = false
    alertCrisis: boolean = false
    resourcesAdded: boolean = false
    previousLoss: number = 0
    rateOfLoss: number = 0
    minimumLoss: number = 0
    totalLoss: number = 0
    scenarioName: string = ''
    messagesNegative: string[] = []
    messagesPositive: string[] = []
    messageOverride: string = null
    tutorialMode: boolean = false
    tutorialHints: Array<string> = []
    stats: Object = {}
    quizzes: number[] = []
    shader: Shader = new Shader()
    automateMode: boolean = false
    automateScript: AutomatedScript = null
    timeInterval: number = 0
    tutorialInterval: number = 0
    resourceInterval: number = 0
    crisisInterval: number = 0
    policyOptions: Object = {}
    policyRelations: Object = {}
    startCountry: string = ''
    statsCountry: string = ''
    countries: Country[] = []
    currentCountry: string = null
    timeoutID: any = null
    width: number = 1334
    height: number = 750
}

export class AutomatedScript  {
    name: string = null
}


export class World {
    res: Resources = new Resources()
    countries: Country[] = []
    countriesJson: Map<string, Country> = new Map<string, Country>()
    sortedObjs: Country[] = []
    areaMin: number = 0
    areaMax: number = 0
    areaMean: number = 0
    areaRatio: number = 0
    areaMinCountry: string = ''
    areaMaxCountry: string = ''
    gameState: GameState = null
    automateID: number = -1
    automateScripts: AutomatedScript[] = []
    scenarioData: any = {}


    // Shuffle from https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
    shuffleArray = a => a.sort(() => Math.random() - 0.5);


    /**
     * Generates min, max coordinates
     */
    extremes(pa: Point[][]) {
        
        let extremes = [];
        
        for (let i = 0; i < pa.length; i++) {

            let p = pa[i];
            let minx = 0, miny = 0, maxx = 0, maxy = 0;
            
            for (let j = 0; j < p.length; j++) {

                let point = p[j];
                if (minx == 0 || minx > point.x) 
                    minx = point.x;
                if (miny == 0 || miny > point.y) 
                    miny = point.y;
                if (maxx < point.x) 
                    maxx = point.x;
                if (maxy < point.y) 
                    maxy = point.y;
            
            }
            
            extremes.push({ minx: minx, miny: miny, maxx: maxx, maxy: maxy });

        }

        return extremes;

    }


    regionalArea(points: Point[]) {
        
        let area = 0;

        for (let j = 0; j < points.length - 1; j++) {

            let pt1 = points[j];
            let pt2 = points[j + 1];
            let xy1 = pt1.x * pt2.y;
            let xy2 = pt1.y * pt2.x;
            area += Math.abs(xy1 - xy2);

        }

        return area / 2;

    }


    /**
     * Create country centroids.
     */
    centroids(pa: Point[][]) { 

        // let pa = this.pointArray(world, name);
        let lastArea = 0, thisArea = 0;
        let regionID = -1;

        for (let i = 0; i < pa.length; i++) {
        
            let p = pa[i];
            thisArea = this.regionalArea(p);
        
            if (thisArea > lastArea) {

                regionID = i;
                lastArea = thisArea;
            
            }
        
        }
        
        if (regionID == -1)
            return;
        
        let points = pa[regionID];
        let totalX = 0, totalY = 0;
        
        points.forEach( (pt) => {
        
            totalX += pt.x;
            totalY += pt.y;
        
        });

        return new Point(totalX / points.length, totalY / points.length );

    }


    /*
     * Gauss shoelace algorithm - https://gamedev.stackexchange.com/questions/151034/how-to-compute-the-area-of-an-irregular-shape
     */
    areas(pa: Point[][]) { 

        let area = 0;
        
        for (let i = 0; i < pa.length; i++) {

            let p = pa[i];
            area += this.regionalArea(p);

        }

        return area;

    }


    initCountries() { 

        let world = this;

        this.countries = Object.values(this.countriesJson).reduce((map, obj) => {  

            if (!map[obj.iso_a3]) {

                let country = new Country();
                
                country.name = obj.name,
                country.points = obj.points.map((pa) => { return pa.map((p) => { return new Point(parseFloat(p.x), parseFloat(p.y)); }); }),
                country.extremes = this.extremes(country.points),
                country.centroid = this.centroids(country.points),
                country.area = this.areas(country.points),
                
                country.affected_chance = 1.0,
                country.pop_est = parseInt(obj.pop_est),
                country.pop_aware = 0,
                country.pop_aware_percent = 0,
                country.pop_prepared = 0,
                country.pop_prepared_percent = 0,

                country.gdp_est = parseInt(obj.gdp_md_est),
                country.iso_a2 = obj.iso_a2,
                country.iso_a3 = obj.iso_a3,
                country.subregion = obj.subregion,
                country.economy = obj.economy,
                country.income_grp = obj.income_grp,
                country.income_grp_num = parseInt(obj.income_grp.charAt(0)),
                country.equator_dist = obj.equatorDist,
                country.offsetX = obj.offsetX,
                country.offsetY = obj.offsetY,

                country.policy = 0,
                country.previousLoss = this.gameState.previousLoss,
                country.loss = this.gameState.previousLoss,
                country.neighbours = [],
                country.points_shared = 0,
                country.points_total = 0,
                country.shared_border_percentage = 0,
                country.policyPoints = [],
                country.policyDots = [],
                country.destructionPoints = [],
                country.destructionDots = [],
                country.selected = false   
                country.places = new Map<string, Place>();
                obj.places.forEach( (p) => {
                    let place = new Place();
                    place.points = p.points;
                    place.name = p.NAME;
                    place.iso_a2 = p.ISO_A2;
                    place.iso_a3 = p.ADM0_A3;
                    place.latitute = p.LATITUDE;
                    place.longitude = p.LONGITUDE;
                    place.pop_max = p.POP_MAX;
                    place.pop_min = p.POP_MIN;
                    country.places[place.name] = place;
                });

                map[obj.iso_a3] = country;

            } 

            return map; 

        }, {});

        /**
         * Sorts objects by their relative screen position, to avoid overlapping tiles.
         */
        this.sortedObjs = Object.values(this.countries).sort((a, b) => { 

            return (a.points[0][0].y * this.gameState.height + a.points[0][0].x) - (b.points[0][0].y * this.gameState.height + b.points[0][0].x);  

        });

        // Add proportion of main land mass with shared borders
        let allPoints = {};
        Object.keys(this.countries).forEach(k => {
            
            var c = this.countries[k];
            
            c.points.forEach((p) => {
            
                var pStr = p.x +"-"+p.y;

                if (allPoints[pStr]) {
            
                    allPoints[pStr].push(c.iso_a3);
            
                }
                else {
            
                    allPoints[pStr] = [c.iso_a3];
            
                }
            
            });

        });

        Object.keys(allPoints).forEach( (k) => {

            var countries = allPoints[k];

            countries.forEach( (c1) => {

                var country = this.countries[c1];
                countries.forEach( (c2) => {

                    if (c1 != c2) {
                    
                        if (country.neighbours.indexOf(c2) == -1) {
                    
                            country.neighbours.push(c2);
                    
                        }

                        country.points_shared += 1;

                    }

                });

                country.points_total += 1;

            });

        });


        Object.keys(this.countries).forEach( (c) => {
        
            var country = this.countries[c];
            country.shared_border_percentage = country.points_shared / country.points_total;
            
            if (country.shared_border_percentage > 1.0) {

                country.shared_border_percentage = 1.0;
                
            }

        });
        

        // Add population density
        Object.keys(this.countries).forEach( (c) => { 
        
            var country = this.countries[c];
            country.density = country.pop_est / country.area;

        } );

        this.areaMin = 0;
        this.areaMax = 0;
        this.areaMean = 0;
        this.areaMinCountry = '';
        this.areaMaxCountry = '';
        
        Object.keys(this.countries).forEach( (c) => {

            var country = this.countries[c];
            
            if (this.areaMin == 0 || this.areaMin > country.area) {
            
                this.areaMin = country.area;
                this.areaMinCountry = c;
            
            }

            if (this.areaMax < country.area) {
            
                this.areaMax = country.area;
                this.areaMaxCountry = c; 
            
            }
            
            this.areaMean += country.area;

        });

        this.areaMean /= Object.keys(this.countries).length;
        this.areaRatio = Math.floor(Math.log2(this.areaMax / this.areaMin));

        Object.keys(this.countries).forEach( (c) => {

            var country = this.countries[c];
            // Change the power for more or less points
            country.numPoints = Math.ceil(Math.pow(country.area / this.areaMean, 2));

        });

        // Add world populations
        this.gameState.populationWorld = Object.keys(this.countries).map(function(c) { 

            return world.countries[c].pop_est; 

        }).reduce( (a, c) => {

            return a + parseInt(c);

        }, 0);

    }



    /**
     * Update time variables.
     */
    updateTimeVars(interval) {

        let world = this;

        world.gameState.timeInterval = interval;
        world.gameState.tutorialInterval = world.gameState.timeInterval * world.res.TUTORIAL_INTERVAL_MULTIPLIER;
        world.gameState.resourceInterval = world.gameState.timeInterval * world.res.RESOURCE_INTERVAL_MULTIPLIER; 
        world.gameState.crisisInterval = world.gameState.timeInterval * world.res.CRISIS_INTERVAL_MULTIPLIER;

    }


    /**
     * Sets up game parameters at the start of play
     */
    calculatePolicyConnections() {

        let world = this;

        world.gameState.policyOptions = {};
        let policyLen = 0;
    
        Object.keys(world.res.RESOURCES).forEach(key => {
    
            world.res.RESOURCES[key].policyOptions.forEach(pol => {
    
                world.gameState.policyOptions[pol.id] = pol;
                if (policyLen < pol.id)
                    policyLen = pol.id;
    
            });
        });
        
        world.gameState.policyRelations = {};
        
        for (let i = 0; i < policyLen; i++){
    
            const source = world.gameState.policyOptions[i+1];
            world.gameState.policyRelations[source.id] = {};
    
            for (let j = i + 1; j < policyLen; j++){
    
                const target = world.gameState.policyOptions[j+1];
                if (world.gameState.policyRelations[target.id] === undefined)
                    world.gameState.policyRelations[target.id] = {};
                
                const val = world.res.RESOURCE_MATRIX[j][i];
                const rel = world.res.RESOURCE_RELATIONS[j][i];
                world.gameState.policyRelations[source.id][target.id] = val;
                
                if (rel == 1) {
    
                    world.gameState.policyRelations[target.id][source.id] = val;
    
                }
    
            }
    
        }
    
    }


    /**
     * Initialises the game parameters.
     */
    initGameState(level: string, language: string, greyscale: boolean, isMobile: boolean, width: number, height: number) {

        let world = this;

        world.gameState = new GameState();

        // Set dimensions here
        world.gameState.width = width;
        world.gameState.height = height;
        // Set options here
        world.gameState.level = level;
        world.gameState.language = language;
        world.gameState.greyscale = greyscale;
        // Game play options
        world.gameState.difficultyMultiplier = 1.0;
        if (world.gameState.level === "Medium")
            world.gameState.difficultyMultiplier = 2.0;
        else if (world.gameState.level === "Hard")
            world.gameState.difficultyMultiplier = 3.0;
        

        world.gameState.state = world.res.GAME_STATES.INITIALISED;
        
        world.gameState.modal = false;
        world.gameState.startDate = new Date(Date.now());
        world.gameState.startDate.setDate(1);
        world.gameState.startDate.setMonth(world.res.scenarioData.start_month);
        world.gameState.startDate.setFullYear(world.res.scenarioData.start_year);
        world.gameState.targetDate = new Date(Date.now());
        world.gameState.targetDate.setDate(1);
        world.gameState.targetDate.setMonth(world.res.scenarioData.target_month);
        world.gameState.targetDate.setFullYear(world.res.scenarioData.target_year);
        world.gameState.previousDate = world.gameState.startDate;
        world.gameState.currentDate = world.gameState.startDate;
        world.gameState.counter = 0;
        world.gameState.lastResource = 0;
        // First crisis will take twice as long
        world.gameState.lastCrisis = world.res.CRISIS_INTERVAL_MULTIPLIER;
        world.gameState.crises = [];
        world.gameState.crisisCountry = null;
        world.gameState.crisisCount = 0;
        world.gameState.policies = new Map<number, number>();
        world.gameState.policy = 0;
        world.gameState.countriedAffected = 0;
        world.gameState.populationAware = 0;
        world.gameState.populationPrepared = 0;
        world.gameState.populationAwarePercent = 0;
        world.gameState.populationPreparedPercent = 0;
        world.gameState.resources = world.res.scenarioData.starting_resources;
        world.gameState.alertResources = false;
        world.gameState.alertCrisis = false;
        world.gameState.resourcesAdded = false;
        world.gameState.previousLoss = world.res.scenarioData.threat_details.starting_conditions.starting_loss;
        world.gameState.rateOfLoss = world.res.scenarioData.threat_details.advanced_stats.loss_increase_speed;
        world.gameState.minimumLoss = world.res.scenarioData.threat_details.advanced_stats.minimum_loss_increase;
        world.gameState.totalLoss = 0;
        world.gameState.scenarioName = world.res.scenarioData[world.gameState.language].name;
        world.gameState.messagesNegative = world.res.scenarioData[world.gameState.language].messages.negative;
        world.gameState.messagesPositive = world.res.scenarioData[world.gameState.language].messages.positive;
        world.gameState.messageOverride = null;
        world.gameState.tutorialMode = false;
        world.gameState.tutorialHints = [];
        world.gameState.stats = {};
        world.gameState.quizzes = [];

        // Shader options
        world.gameState.shader = new Shader();
        if (isMobile) {
            world.gameState.shader.u_cellSize = 1.0;
            world.gameState.shader.u_randFactor = 0.5;
            world.gameState.shader.u_randAlpha = 0.3;
            world.gameState.shader.u_sizePower = 4.0;
            world.gameState.shader.u_sizeMultiplier = 1.0;
            world.gameState.shader.u_stepMin = 0.9;
            world.gameState.shader.u_stepMax = 1.0;
            world.gameState.shader.u_borderRadius = 10.0;
        }
        else {
            world.gameState.shader.u_cellSize = 10.0;
            world.gameState.shader.u_randFactor = 0.5;
            world.gameState.shader.u_randAlpha = 0.3;
            world.gameState.shader.u_sizePower = 4.0;
            world.gameState.shader.u_sizeMultiplier = 1.0;
            world.gameState.shader.u_stepMin = 0.9;
            world.gameState.shader.u_stepMax = 1.0;
            world.gameState.shader.u_borderRadius = 10.0;
        }

        // Obtain automation setting from parent
        if (world.automateID > -1) {

            world.gameState.automateMode = true;
            world.gameState.automateScript = world.automateScripts[world.automateID - 1];
            console.log("Running " + world.gameState.automateScript.name);

        }

        this.updateTimeVars(world.res.MONTH_INTERVAL);
        this.calculatePolicyConnections();
        
    }


    /**
     * Evaluates loss.
     * 
     * To test:
     * let country = world.countries.AUS
     * const lossCurrent = country.loss;
     * world.evaluateLoss(country)
     */
    evaluateLoss(country) {

        let world = this;

        const lossCurrent = country.loss;

        // Add random amount to default rate of loss
        const rateOfLoss = world.gameState.rateOfLoss * (0.5 + Math.random());
        const rateOfLossMonthly = rateOfLoss;
        let rateOfLossFactor = 1 + rateOfLossMonthly;

        // Weaken rate of loss by population prepared for good policy
        const preparednessFactor = 1 + 0.1 * country.pop_prepared_percent / 100.0;
        rateOfLossFactor /= preparednessFactor;

        //let crisis = world.res.CRISES[world.gameState.crises[0].crisis];
        world.gameState.crises.forEach(crisisInCountry => {
            
            const crisis = world.res.CRISES[crisisInCountry.crisis];
            // Add effects of country / global loss ratio to crisis effect
            // Take the square root of the ratio of country to world loss, and multiply this by the crisis effect
            let crisisEffect = (1 + crisis.effect_on_environmental_loss * (Math.pow(lossCurrent / world.gameState.totalLoss, 0.5)));
            rateOfLossFactor *= crisisEffect;
                
        });

        const decayLossFactor = ( (rateOfLossFactor - 1) * world.sigmoidalDecay(lossCurrent, world.res.DECAY_LOSS) );
        let lossNew = lossCurrent + decayLossFactor;

        if (lossNew > 100)
            lossNew = 100;
        if (lossNew < 0)
            lossNew = 0;
    
    
        return lossNew;

    }


    /**
     * Transmit policy effects from a country
     * @param {*} Calculates transmission of policies from 
     */
    transmitFrom(country) {
        
        let world = this;

        const neighbours = country.neighbours;
        const sharedBorder = country.shared_border_percentage;
        const transmissionLand = world.res.scenarioData.threat_details.transmission.transmission_land;
        const transmissionSea = world.res.scenarioData.threat_details.transmission.transmission_sea;
        const transmissionAir = world.res.scenarioData.threat_details.transmission.transmission_air;
        const infectivityMinimumIncrease = world.res.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        const likelihoodOfTransmission = country.affected_chance; //infectivityIncreaseSpeed / 100.0;

        const popCountry = country.pop_est;
        const popWorld = world.gameState.populationWorld;
        const popFactor = Math.log(popCountry) / Math.log(popWorld);
        
        const income = country.income_grp;
        const incomeVal = parseFloat(income.charAt(0)) / 6.0; // 5 income groups + 1, so there are no zeroes
        
        // THE FOLLOWING CODE MAKES USE OF AVAILABLE GEOGRAPHIC INFORMATION TO DEVELOP A PROXY FOR TRANSMISSION

        const landProb = sharedBorder * transmissionLand * likelihoodOfTransmission * popFactor * incomeVal;
        // Sea probability increases with (a) low shared border and (b) high income and (c) high population
        const seaProb = (1  - sharedBorder)  * transmissionSea * likelihoodOfTransmission * popFactor * (1 - incomeVal);
        // Air probability increases with (a) low shared border and (b) high income and (c) high population
        const airProb = sharedBorder * transmissionAir * likelihoodOfTransmission * popFactor * (1 - incomeVal);
        
        let candidateCountry = null;

        // Start with land
        if (Math.random() < landProb && neighbours.length > 0) {
            
            const neighbourIndex = Math.floor(Math.random() * neighbours.length);
            const neighbour = world.countries[neighbours[neighbourIndex]];
            if (neighbour.policy == 0) {
            
                candidateCountry = neighbour;
            
            }

        }
        else if (Math.random() < seaProb) {
            
            const countriesShuffled = world.shuffleArray(Object.keys(world.countries));
            const countryChance = Math.random();
            
            for (let i = 0; i < countriesShuffled.length; i++) {
                
                const countryCheck = world.countries[countriesShuffled[i]];
                
                if (countryChance < ( 1 - countryCheck.shared_border_percentage ) && countryCheck.policy == 0) {

                    candidateCountry = countryCheck;
                    break;

                }
            
            }

        }
        else if (Math.random() < airProb) {
            const countriesShuffled = world.shuffleArray(Object.keys(world.countries));
            const countryChance = Math.random();
            
            for (let i = 0; i < countriesShuffled.length; i++) {
            
                const countryCheck = world.countries[countriesShuffled[i]];
                const incomeCheck = countryCheck.income_grp;
                const incomeValCheck = parseFloat(incomeCheck.charAt(0)) / 6.0; // 5 income groups + 1, so there are no zeroes
            
                if (countryChance < ( 1 - incomeValCheck ) && countryCheck.policy == 0) {
            
                    candidateCountry = countryCheck;
                    break;
            
                }
            
            }
        
        }

        if (candidateCountry != null ) {
        
            candidateCountry.affected_chance = 0.1;
        
            if (country.affected_chance < 1.0)
                country.affected_chance *= 0.1;
        
            candidateCountry.policy = 1.0;
            candidateCountry.pop_aware = parseInt(candidateCountry.pop_est) * infectivityMinimumIncrease;
        
        }

    }



    infectWithin(country) {
        
        let world = this;

        if (country.affected_chance == 0)
            return;

        if (country.pop_aware >= parseInt(country.pop_est))
            return;

        // Calculate infectivity
        const infectivityIncreaseSpeed = world.res.scenarioData.threat_details.advanced_stats.infectivity_increase_speed;
        const infectivityMinimumIncrease = world.res.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        let infectivityRate = infectivityIncreaseSpeed;

        Object.keys(world.gameState.policies).forEach(strategy => {
            const level = world.gameState.policies[strategy];
            switch(parseInt(strategy)) {
                case 1:
                    // Increase infectivity when reducing inequality for low income countries
                    infectivityRate *= (Math.log(1 + country.income_grp_num));
                    break;
                case 2:
                    // Increase infectivity with free trade countries for high income countries
                    infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 3:
                    // Increase infectivity with regulations for high income countries
                    infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 4:
                    // Increase infectivity with automation for high income countries
                    infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 5:
                    // Increase infectivity 
                    infectivityRate *= 1.1;
                    break;
                case 6:
                    // Increase infectivity 
                    infectivityRate *= 1.1;
                    break;
                case 7:
                    // Increase infectivity with boosted military for high income countries
                    infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 8:
                    // Increase infectivity when boosting democracy for low income countries
                    infectivityRate *= (Math.log(2 + country.income_grp_num));
                    break;
                case 9:
                    // Increase infectivity when boosting democracy for low income countries
                    infectivityRate *= (Math.log(2 + country.income_grp_num));
                    break;
                case 10:
                    // Increase infectivity with social media for high income countries
                    infectivityRate *= (Math.log((((5 + 2) - country.income_grp_num)) * 0.8));
                    break;
                case 11:
                    // Increase infectivity with celebrity endorsements for high income countries
                    infectivityRate *= (Math.log(1 + country.income_grp_num));
                    break;
                case 12:
                    // Increase infectivity with festivals for high income countries
                    infectivityRate *= (Math.log(1 + country.income_grp_num));
                    break;
                case 13:
                    // Increase infectivity with green cities for high income countries
                    infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 14:
                    infectivityRate *= (Math.log(1 + country.income_grp_num));
                    break;
                case 15:
                infectivityRate *= (Math.log((((5 + 1) - country.income_grp_num)) * 1.1));
                    break;
                case 16:
                    infectivityRate *= (Math.log(1 + country.income_grp_num));
                    break;
            
            };

        });

        if ((infectivityRate - 1) < infectivityMinimumIncrease)
            infectivityRate = 1 + infectivityMinimumIncrease;
        country.pop_aware = (1 + country.pop_aware) * infectivityRate;
        if (country.pop_aware > country.pop_est)
            country.pop_aware = country.pop_est;

    }


    /**
     * Returns a decayed value of a percentile (0-100),
     * between Math.E (2.78...) and 1. 
     * The inflectionPoint parameter, also 0-100, indicates the point of fastest decay.
     * The decay fundtion is roughly sigmoidal around the inflection point.
     */
    sigmoidalDecay(percent, inflectionPoint) {

        let world = this;

        if (!world.res.SIGMOIDAL_DECAY)
            return 1.0;

        inflectionPoint = (inflectionPoint === undefined) ? 50 : inflectionPoint;

        // Some value between 0.0 and 1.0 (where inflectionPoint = 50.0)
        let normedInverse = 1.0 - Math.abs(( percent - inflectionPoint ) / inflectionPoint);
        // Some value between e (2.78...) and 1 / e (0.367) (or lower if inflection point != 50.0)
        return Math.pow(Math.E, normedInverse);

    }

    calculatePolicyBalanceOnPreparedness() {

        let world = this;

        const strategyCount = Object.values(world.gameState.policies).reduce((accum, level) => accum + level, 0);
        if (strategyCount == 0)
            return 1.0;

        const domainMean = strategyCount / 4;
        let ecn = 0, pol = 0, cul = 0, eco = 0;
        Object.keys(world.gameState.policies).forEach(policyID => {
            const policy = world.gameState.policyOptions[policyID]
            const level = world.gameState.policies[policyID];
            switch (policy.domain) {
                case 1:
                    ecn += level;
                    break;
                case 2:
                    pol += level;
                    break;
                case 3:
                    cul += level;
                    break;
                case 4:
                    eco += level;
                    break;
            }
        });

        const variances = Math.pow(ecn - domainMean, 2) + Math.pow(pol - domainMean, 2) + Math.pow(cul - domainMean, 2) + Math.pow(eco - domainMean, 2);

        // Suppress the effect of imbalanced resources
        const policyBalance = 1 - Math.pow((variances / Math.pow(strategyCount, 2)), 4);
        
        return policyBalance;

    }

    calculateSinglePolicyImpactOnPreparedness(country, index) {

        let world = this;

        let severityEffect = 1.0;

        const policyID = parseInt(Object.keys(world.gameState.policies)[index]);
        const policy = world.gameState.policyOptions[policyID];
        const level = world.gameState.policies[policyID];

        // Generate a natural log, so that level 1 = 1; level 2 = 1.31; level 3 = 1.55
        const levelMultiplier = Math.log(level + 1.718);

        // Check population
        const pop = parseInt(country.pop_est);
        // https://content.meteoblue.com/en/meteoscool/general-climate-zones
        if (pop < 10000000) {

            severityEffect *= (1 + policy.effect_on_pop_low * levelMultiplier);

        }
        else if (pop < 100000000) {

            severityEffect *= (1 + policy.effect_on_pop_medium * levelMultiplier);

        }
        else {

            severityEffect *= (1 + policy.effect_on_pop_high * levelMultiplier);

        }

        // Check income
        switch (country.income_grp_num ) {
            case 1:
            case 2:
                severityEffect *= (1 + policy.effect_on_income_high * levelMultiplier);
                break;
            case 3:
                severityEffect *= (1 + policy.effect_on_income_medium_high * levelMultiplier);
                break;
            case 4:
                severityEffect *= (1 + policy.effect_on_income_low_medium * levelMultiplier);
                break;
            case 5:
                severityEffect *= (1 + policy.effect_on_income_low * levelMultiplier);
                break;
        }

        // Check climate zone
        const latitude = parseFloat(country.equator_dist);
        // https://content.meteoblue.com/en/meteoscool/general-climate-zones
        if (latitude > -23.5 && latitude < 23.5) {
            
            severityEffect *= (1 + policy.effect_on_geo_tropic * levelMultiplier);
        
        }
        else if (latitude > -40 && latitude < 40) {

            severityEffect *= (1 + policy.effect_on_geo_subtropic * levelMultiplier);

        }
        else if (latitude > -60 && latitude < 60) {

            severityEffect *= (1 + policy.effect_on_geo_temperate * levelMultiplier);

        }
        else {

            severityEffect *= (1 + policy.effect_on_geo_polar * levelMultiplier);

        }

        // Calculate impact of other strategies
        for (let j = index + 1; j < Object.keys(world.gameState.policies).length; j++) {
            // if (i == j)
            //     continue;

            const otherPolicyID = parseInt(Object.keys(world.gameState.policies)[j]);
            const otherLevel = world.gameState.policies[otherPolicyID];
            // Generate a natural log, so that level 1 = 1; level 2 = 1.31; level 3 = 1.55
            const otherLevelMultiplier = Math.log(otherLevel + 1.718);

            const relation = world.gameState.policyRelations[policyID][otherPolicyID];
            
            if (typeof(relation) !== "undefined") {
            
                severityEffect *= (1 + relation * otherLevelMultiplier);
            
            }

        }

        return severityEffect;

    }

    calculatePolicyImpactOnPreparedness(country) {
        
        let world = this;

        let severityEffect = 1.0;

        for (let i = 0; i < Object.keys(world.gameState.policies).length; i++) {

            severityEffect *= world.calculateSinglePolicyImpactOnPreparedness(country, i);

        }
        
        // Add sigmoidal effect
        let decayInfluence = world.sigmoidalDecay(country.pop_prepared_percent, world.res.DECAY_PREPAREDNESS);

        return severityEffect * decayInfluence;

    }

    registerPreparednessWithin(country) {

        let world = this;

        if (country.affected_chance == 0)
            return;

        // const popAware = country.pop_aware;
        const popAware = country.pop_est;
        let popPrepared = country.pop_prepared;

        // Calculate severity
        let severityIncreaseSpeed = world.res.scenarioData.threat_details.advanced_stats.severity_increase_speed;
        const severityMinimumIncrease = world.res.scenarioData.threat_details.advanced_stats.minimum_severity_increase;
        const policyBalance =  world.calculatePolicyBalanceOnPreparedness();
        const policyImpact =  world.calculatePolicyImpactOnPreparedness(country);
        const policyEffect = policyBalance * policyImpact * severityIncreaseSpeed;
        const policyEffectNormalised = 1 + ((policyEffect - 1) / (world.res.MONTH_INTERVAL));

        if (severityIncreaseSpeed < severityMinimumIncrease) {

            severityIncreaseSpeed = severityMinimumIncrease;

        }

        if (popPrepared == 0) {

            // 1 person
            popPrepared = 1; //popAware * 0.01;

        }
        else {

            popPrepared *= (policyEffectNormalised);

        }

        if (popPrepared > popAware) {

            popPrepared = popAware;

        }

        if (popPrepared > country.pop_est) {

            popPrepared = country.pop_est;

        }

        country.pop_prepared = popPrepared;
            
    }

}
