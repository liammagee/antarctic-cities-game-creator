// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {Resources} from './Resources';

class TimedNode extends cc.Node  {
    placedAt: number = 0.0
    id: number = 0.0
}

class Shader  {
    u_cellSize: number = 0.0
    u_randFactor: number = 0.0
    u_randAlpha: number = 0.0
    u_sizePower: number = 0.0
    u_sizeMultiplier: number = 0.0
    u_stepMin: number = 0.0
    u_stepMax: number = 0.0
    u_borderRadius: number = 0.0
}

class Place  {
    points: cc.Vec2[] = []
    name: string = null
    iso_a2: string = null
    iso_a3: string = null
    latitute: number = 0
    longitude: number = 0
    pop_max: number = 0
    pop_min: number = 0
}

class Country  {
    name: string = null
    points: cc.Vec2[] = []
    extremes: cc.Vec2[] = []
    centroid: cc.Vec2 = null
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

class CrisisCountry {
    crisis: string = ''
    id: number = 0
    country: string = ''
    counter: number = 0
}

class Policy {
    cost_1: number = 0
    cost_2: number = 0
    cost_3: number = 0
    
}

class GameParams  {
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
    timeoutID: number = 0
}

class AutomatedScript  {
    name: string = null
}


@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: cc.AudioClip// use 'type:' to declare Texture2D object directly
      })
    audio: cc.AudioClip = null;
    @property(cc.Material)
    defaultMaterial: cc.Material = null;
    @property(cc.Node)
    messageBox: cc.Node = null;
    @property(cc.Node)
    topBar: cc.Node = null;
    @property(cc.SpriteFrame)
    singleColor: cc.SpriteFrame = null;
    @property(cc.Font)
    titleFont: cc.Font = null;
    @property(cc.Font)
    bodyFont: cc.Font = null;
    @property(cc.Node)
    backgroundGreyscale: cc.Node = null;
    @property(cc.Node)
    backgroundColour: cc.Node = null;
    @property(NewClass)
    world: NewClass = null;

    _time: number = 0;
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
    gameParams: GameParams = null
    automateID: number = 0
    automateScripts: AutomatedScript[] = []
    scenarioData: any = {}
    
    btnQuit: cc.Node = null
    btnSettings: cc.Node = null
    btnSound: cc.Node = null
    btnSnapshot: cc.Node = null
    btnPause: cc.Node = null
    btnPlay: cc.Node = null
    btnFF: cc.Node = null
    // tweetLabel: cc.Node = null
    tweetLabel: cc.Label = null
    bottomBar: cc.Node = null
    countryLabel: cc.Label = null
    countryLoss: cc.Label = null
    countryLossProgress: cc.ProgressBar = null
    countryAwarePrepared: cc.Label = null
    countryPreparedProgress: cc.ProgressBar = null
    resourceScoreLabel: cc.Label = null
    quizBox: cc.Node = null
    settingsBox: cc.Node = null

    dotOff: cc.SpriteFrame = null
    dotOn: cc.SpriteFrame = null

    lastLayerID: number = -1

    buttons: TimedNode[] = []
    policyIcons: cc.SpriteFrame[] = []
    crisisIcons: Map<string, cc.SpriteFrame> = new Map<string, cc.SpriteFrame>()
    countryNodes: Map<string, cc.Node> = new Map<string, cc.Node>()

    currentAudioId: number = -1

    // Shuffle from https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
    shuffleArray = a => a.sort(() => Math.random() - 0.5);


    /**
     * Tests whether a point is inside the points that outline a given geometric shape.
     */
    collisionDetection(points, test) {

        let crossed = false;
        
        // Double check the detection is within the widest bounds
        let maxx = Math.max(...points.map(p => p.x));

        for (let i = 0; i < points.length; i++) {

            let p1 = points[i];
            let p2 = (i == points.length - 1) ? points[0] : points[i+1];

            // Make floating, and jitter to avoid boundary issues with integers.
            let x1 = parseFloat(p1.x) + 0.001, y1 = parseFloat(p1.y) - 0.001, 
                x2 = parseFloat(p2.x) + 0.001, y2 = parseFloat(p2.y) - 0.001;
            
            if ((y1 < test.y && y2 >= test.y) || (y1 > test.y && y2 <= test.y)) {

                if ((x1 + x2) / 2.0 < test.x && test.x < maxx) {

                    crossed = !crossed;

                }

            }

        }

        return crossed;
        
    }


    /**
     * Returns an array of points associated with a country.
     */
    pointArray(world, name) {

        return world.countriesJson[name].points;

    }
    

    /**
     * Generates min, max coordinates
     */
    extremes(pa) {
        
        let extremes = [];
        
        for (let i = 0; i < pa.length; i++) {

            let p = pa[i];
            let minx = 0, miny = 0, maxx = 0, maxy = 0;
            
            for (let j = 0; j < p.length; j++) {

                let point = p[j];
                if (minx == 0 || minx > parseInt(point.x)) 
                    minx = parseInt(point.x);
                if (miny == 0 || miny > parseInt(point.y)) 
                    miny = parseInt(point.y);
                if (maxx < parseInt(point.x)) 
                    maxx = parseInt(point.x);
                if (maxy < parseInt(point.y)) 
                    maxy = parseInt(point.y);
            
            }
            
            extremes.push({ minx: minx, miny: miny, maxx: maxx, maxy: maxy });

        }

        return extremes;

    }


    regionalArea(points) {
        
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

    /*
     * Gauss shoelace algorithm - https://gamedev.stackexchange.com/questions/151034/how-to-compute-the-area-of-an-irregular-shape
     */
    areas(pa) { 

        // let pa = this.pointArray(world, name);
        let area = 0;
        
        for (let i = 0; i < pa.length; i++) {

            let p = pa[i];
            area += this.regionalArea(p);

        }

        return area;

    }

    /**
     * Create country centroids.
     */
    centroids(pa) { 

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
        
            totalX += parseFloat(pt.x);
            totalY += parseFloat(pt.y);
        
        });

        return new cc.Vec2(totalX / points.length, totalY / points.length );

    }

    initCountries() { 

        let world = this.world;

        world.countries = Object.values(world.countriesJson).reduce((map, obj) => {  

            if (!map[obj.iso_a3]) {

                let country = new Country();
                
                country.name = obj.name,
                country.points = obj.points,
                country.extremes = this.extremes(obj.points),
                country.centroid = this.centroids(obj.points),
                country.area = this.areas(obj.points),
                
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
                country.previousLoss = world.gameParams.previousLoss,
                country.loss = world.gameParams.previousLoss,
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
                /*
                country.places = obj.places.map( (p) => {
                    let place = new Place();
                    place.points = p.points;
                    place.name = p.NAME;
                    place.iso_a2 = p.ISO_A2;
                    place.iso_a3 = p.ADM0_A3;
                    place.latitute = p.LATITUDE;
                    place.longitude = p.LONGITUDE;
                    place.pop_max = p.POP_MAX;
                    place.pop_min = p.POP_MIN;
                    return place;
                });
                */

                map[obj.iso_a3] = country;

            } 

            return map; 

        }, {});

        /**
         * Sorts objects by their relative screen position, to avoid overlapping tiles.
         */
        world.sortedObjs = Object.values(world.countries).sort((a, b) => { 

            return (a.points[0].y * cc.winSize.height + a.points[0].x) - (b.points[0].y * cc.winSize.height + b.points[0].x);  

        });

        // Add proportion of main land mass with shared borders
        let allPoints = {};
        Object.keys(world.countries).forEach(k => {
            
            var c = world.countries[k];
            
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

                var country = world.countries[c1];
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


        Object.keys(world.countries).forEach( (c) => {
        
            var country = world.countries[c];
            country.shared_border_percentage = country.points_shared / country.points_total;
            
            if (country.shared_border_percentage > 1.0) {

                country.shared_border_percentage = 1.0;
                
            }

        });
        

        // Add population density
        Object.keys(world.countries).forEach( (c) => { 
        
            var country = world.countries[c];
            country.density = country.pop_est / country.area;

        } );

        world.areaMin = 0;
        world.areaMax = 0;
        world.areaMean = 0;
        world.areaMinCountry = '';
        world.areaMaxCountry = '';
        
        Object.keys(world.countries).forEach( (c) => {

            var country = world.countries[c];
            
            if (world.areaMin == 0 || world.areaMin > country.area) {
            
                world.areaMin = country.area;
                world.areaMinCountry = c;
            
            }

            if (world.areaMax < country.area) {
            
                world.areaMax = country.area;
                world.areaMaxCountry = c; 
            
            }
            
            world.areaMean += country.area;

        });

        world.areaMean /= Object.keys(world.countries).length;
        world.areaRatio = Math.floor(Math.log2(world.areaMax / world.areaMin));

        Object.keys(world.countries).forEach( (c) => {

            var country = world.countries[c];
            // Change the power for more or less points
            country.numPoints = Math.ceil(Math.pow(country.area / world.areaMean, 2));

        });

        // Add world populations
        world.gameParams.populationWorld = Object.keys(world.countries).map(function(c) { 

            return world.countries[c].pop_est; 

        }).reduce( (a, c) => {

            return a + parseInt(c);

        }, 0);

    }

    /**
     * Initialises the game parameters.
     */
    initGameParams(scenarioData) {

        let world = this.world;

        if (cc.sys.localStorage.language === undefined) 
            cc.sys.localStorage.language = 'eng';
        if (cc.sys.localStorage.level === undefined) 
            cc.sys.localStorage.level = 'Easy';

        world.gameParams = new GameParams();
        // Set options here
        world.gameParams.level = cc.sys.localStorage.level;
        world.gameParams.language = cc.sys.localStorage.language;
        world.gameParams.greyscale = cc.sys.localStorage.greyscale;
        // Game play options
        world.gameParams.difficultyMultiplier = 1.0;
        if (world.gameParams.level === "Medium")
            world.gameParams.difficultyMultiplier = 2.0;
        else if (world.gameParams.level === "Hard")
            world.gameParams.difficultyMultiplier = 3.0;
        

        world.gameParams.state = world.res.GAME_STATES.INITIALISED;
        
        world.gameParams.modal = false;
        world.gameParams.startDate = new Date(Date.now());
        world.gameParams.startDate.setDate(1);
        world.gameParams.startDate.setMonth(scenarioData.start_month);
        world.gameParams.startDate.setFullYear(scenarioData.start_year);
        world.gameParams.targetDate = new Date(Date.now());
        world.gameParams.targetDate.setDate(1);
        world.gameParams.targetDate.setMonth(scenarioData.target_month);
        world.gameParams.targetDate.setFullYear(scenarioData.target_year);
        world.gameParams.previousDate = world.gameParams.startDate;
        world.gameParams.currentDate = world.gameParams.startDate;
        world.gameParams.counter = 0;
        world.gameParams.lastResource = 0;
        // First crisis will take twice as long
        world.gameParams.lastCrisis = world.res.CRISIS_INTERVAL_MULTIPLIER;
        world.gameParams.crises = [];
        world.gameParams.crisisCountry = null;
        world.gameParams.crisisCount = 0;
        world.gameParams.policies = new Map<number, number>();
        world.gameParams.policy = 0;
        world.gameParams.countriedAffected = 0;
        world.gameParams.populationAware = 0;
        world.gameParams.populationPrepared = 0;
        world.gameParams.populationAwarePercent = 0;
        world.gameParams.populationPreparedPercent = 0;
        world.gameParams.resources = scenarioData.starting_resources;
        world.gameParams.alertResources = false;
        world.gameParams.alertCrisis = false;
        world.gameParams.resourcesAdded = false;
        world.gameParams.previousLoss = scenarioData.threat_details.starting_conditions.starting_loss;
        world.gameParams.rateOfLoss = scenarioData.threat_details.advanced_stats.loss_increase_speed;
        world.gameParams.minimumLoss = scenarioData.threat_details.advanced_stats.minimum_loss_increase;
        world.gameParams.totalLoss = 0;
        world.gameParams.scenarioName = scenarioData[cc.sys.localStorage.language].name;
        world.gameParams.messagesNegative = scenarioData[cc.sys.localStorage.language].messages.negative;
        world.gameParams.messagesPositive = scenarioData[cc.sys.localStorage.language].messages.positive;
        world.gameParams.messageOverride = null;
        world.gameParams.tutorialMode = false;
        world.gameParams.tutorialHints = [];
        world.gameParams.stats = {};
        world.gameParams.quizzes = [];

        // Shader options
        world.gameParams.shader = new Shader();
        if (cc.sys.isMobile) {
            world.gameParams.shader.u_cellSize = 1.0;
            world.gameParams.shader.u_randFactor = 0.5;
            world.gameParams.shader.u_randAlpha = 0.3;
            world.gameParams.shader.u_sizePower = 4.0;
            world.gameParams.shader.u_sizeMultiplier = 1.0;
            world.gameParams.shader.u_stepMin = 0.9;
            world.gameParams.shader.u_stepMax = 1.0;
            world.gameParams.shader.u_borderRadius = 10.0;
        }
        else {
            world.gameParams.shader.u_cellSize = 10.0;
            world.gameParams.shader.u_randFactor = 0.5;
            world.gameParams.shader.u_randAlpha = 0.3;
            world.gameParams.shader.u_sizePower = 4.0;
            world.gameParams.shader.u_sizeMultiplier = 1.0;
            world.gameParams.shader.u_stepMin = 0.9;
            world.gameParams.shader.u_stepMax = 1.0;
            world.gameParams.shader.u_borderRadius = 10.0;
        }

        // Obtain automation setting from parent
        if (world.automateID > -1) {

            world.gameParams.automateMode = true;
            world.gameParams.automateScript = world.automateScripts[world.automateID - 1];
            console.log("Running " + world.gameParams.automateScript.name);

        }

        this.updateTimeVars(world.res.MONTH_INTERVAL);
        this.calculatePolicyConnections();
        
    }

    /**
     * Update time variables.
     */
    updateTimeVars(interval) {

        let world = this.world;

        world.gameParams.timeInterval = interval;
        world.gameParams.tutorialInterval = world.gameParams.timeInterval * world.res.TUTORIAL_INTERVAL_MULTIPLIER;
        world.gameParams.resourceInterval = world.gameParams.timeInterval * world.res.RESOURCE_INTERVAL_MULTIPLIER; 
        world.gameParams.crisisInterval = world.gameParams.timeInterval * world.res.CRISIS_INTERVAL_MULTIPLIER;

    }

    /**
     * Sets up game parameters at the start of play
     */
    calculatePolicyConnections() {

        let world = this.world;

        world.gameParams.policyOptions = {};
        let policyLen = 0;
    
        Object.keys(world.res.RESOURCES).forEach(key => {
    
            world.res.RESOURCES[key].policyOptions.forEach(pol => {
    
                world.gameParams.policyOptions[pol.id] = pol;
                if (policyLen < pol.id)
                    policyLen = pol.id;
    
            });
        });
        
        world.gameParams.policyRelations = {};
        
        for (let i = 0; i < policyLen; i++){
    
            const source = world.gameParams.policyOptions[i+1];
            world.gameParams.policyRelations[source.id] = {};
    
            for (let j = i + 1; j < policyLen; j++){
    
                const target = world.gameParams.policyOptions[j+1];
                if (world.gameParams.policyRelations[target.id] === undefined)
                    world.gameParams.policyRelations[target.id] = {};
                
                const val = world.res.RESOURCE_MATRIX[j][i];
                const rel = world.res.RESOURCE_RELATIONS[j][i];
                world.gameParams.policyRelations[source.id][target.id] = val;
                
                if (rel == 1) {
    
                    world.gameParams.policyRelations[target.id][source.id] = val;
    
                }
    
            }
    
        }
    
    }

    /**
     * Sets up game parameters at the start of play
     */
    startGameParams(world) {

        world.gameParams.state = world.res.GAME_STATES.STARTED;

    }

    

    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showMessageBox(parent, title, message, prompt1, callback1, prompt2, callback2) {

        let world = this.world;

        world.gameParams.modal = true;
        world.gameParams.state = world.res.GAME_STATES.PAUSED;

        world.messageBox.zIndex = 104;
        world.messageBox.opacity = 255;
        let lblTitle = world.messageBox.getChildByName("messageBoxTitle").getComponent(cc.Label);
        let lblContents = world.messageBox.getChildByName("messageBoxContents").getComponent(cc.Label);
        let btn1 = world.messageBox.getChildByName("btn1").getComponent(cc.Button);
        let btn2 = world.messageBox.getChildByName("btn2").getComponent(cc.Button);
        lblContents = world.messageBox.getChildByName("messageBoxContents").getComponent(cc.Label);
        lblTitle.string = title;
        lblContents.string = message;
        btn1.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = prompt1;
        btn2.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = prompt2;

        let buttons = [];
        buttons.push(btn1);
        if (message === null || typeof(message) === "undefined" || message === '') {
        
            if (prompt2 !== undefined) {

                btn1.node.x = -0.25 * world.messageBox.width;
                btn2.node.x = 0.25 * world.messageBox.width;
                btn2.node.opacity = 255;
                btn2.interactable = true;
                btn2.enabled = true;
                buttons.push(btn2);

            }
            else {

                btn1.node.x = 0.0 * world.messageBox.width;
                btn2.node.opacity = 0;
                btn2.interactable = false;
                btn2.enabled = false;
                
            }
        }
        else {

            if (prompt2 !== undefined) {

                btn1.node.x = -0.2 * world.messageBox.width;
                btn2.node.x = 0.2 * world.messageBox.width;
                btn2.node.opacity = 255;
                btn2.interactable = true;
                btn2.enabled = true;
                buttons.push(btn2);

            }
            else {

                btn1.node.x = 0.0 * world.messageBox.width;
                btn2.node.opacity = 0;
                btn2.interactable = false;
                btn2.enabled = false;

            }

        }

        let btn1Func = (event) => {

            world.messageBox.opacity = 0;
            world.messageBox.zIndex = -1;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            world.gameParams.modal = false;
            callback1();
            event.stopPropagation();

        };
        btn1.node.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = (event) => {

            world.messageBox.opacity = 0;
            world.messageBox.zIndex = -1;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            world.gameParams.modal = false;
            callback2();
            event.stopPropagation();

        };
        if (btn2.interactable)
            btn2.node.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
        else
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

        buttons.push(btn1);
        
        if (btn2 !== undefined)
            buttons.push(btn2);

        return buttons;

    }


    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showQuizBox(parent, title, message, wrongAnswer, rightAnswer) {

        let world = this.world;

        world.gameParams.modal = true;
        world.gameParams.state = world.res.GAME_STATES.PAUSED;

        world.quizBox.opacity = 255;
        world.quizBox.zIndex = 104;

        world.quizBox.getChildByName("quizTitle").getComponent(cc.Label).string = title;
        world.quizBox.getChildByName("quizContents").getComponent(cc.Label).string = message;

        let btn1 = world.quizBox.getChildByName("btn1");
        let btn2 = world.quizBox.getChildByName("btn2");
        let buttons = [];

        if (Math.random() > 0.5) {

            let tmp = btn2;
            btn2 = btn1;
            btn1 = tmp;

        }

        btn1.getChildByName("Background").getChildByName("optContents").getComponent(cc.Label).string = rightAnswer;
        btn2.getChildByName("Background").getChildByName("optContents").getComponent(cc.Label).string = wrongAnswer;

        let btn1Func = function(event) {

            world.quizBox.opacity = 0;
            world.quizBox.zIndex = -1;
            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            world.gameParams.modal = false;
            event.stopPropagation();

            world.showMessageBox(parent, "CRISIS RESPONSE", "Great response to this crisis!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                world.gameParams.resources += res;

                world.gameParams.state = world.res.GAME_STATES.STARTED;

            }, undefined, undefined);

        };
        btn1.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = function(event) {

            world.quizBox.opacity = 0;
            world.quizBox.zIndex = -1;
            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            world.gameParams.modal = false;
            event.stopPropagation();

            world.showMessageBox(parent, "CRISIS RESPONSE", "Good try, but this won't be enough to preserve the future of Antarctica!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                if (world.gameParams.resources - res > 0)
                    world.gameParams.resources -= res;
                else
                    world.gameParams.resources = 0;
                
                world.gameParams.state = world.res.GAME_STATES.STARTED;


            }, undefined, undefined);

        };
        btn2.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

        buttons.push(btn1);
        buttons.push(btn2);
        
        return buttons;

    }


    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showSettingsBox() {

        let world = this.world;

        world.gameParams.modal = true;
        world.gameParams.state = world.res.GAME_STATES.PAUSED;

        world.settingsBox.opacity = 255;
        world.settingsBox.zIndex = 106;

        let btn1 = world.settingsBox.getChildByName("apply");
        let btn2 = world.settingsBox.getChildByName("cancel");
        let gs = (cc.sys.localStorage.greyscale == 'true')
        world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = gs;
        world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !gs;
        let eng = (cc.sys.localStorage.language == 'eng')
        world.settingsBox.getChildByName("toggleLanguage").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = eng;
        world.settingsBox.getChildByName("toggleLanguage").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !eng;

        let btn1Func = function(event) {

            let gsChecked = world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;

            cc.sys.localStorage.greyscale = gsChecked;
            world.gameParams.greyscale = gsChecked;

            if (gsChecked) {

                world.backgroundGreyscale.opacity = 255;
                world.backgroundColour.opacity = 0;
                world.node.color = new cc.Color(234, 245, 247);

            }
            else {
                
                world.backgroundGreyscale.opacity = 0;
                world.backgroundColour.opacity = 255;
                world.node.color = world.res.COLOR_LICORICE;

            }

            let engChecked = world.settingsBox.getChildByName("toggleLanguage").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;
            if (engChecked) {
                cc.sys.localStorage.language = 'eng';
            }
            else {
                cc.sys.localStorage.language = 'esp';
            }
            // TODO: Trigger game-wide language update
            world.updateLanguageSettings()

            world.settingsBox.opacity = 0;
            world.settingsBox.zIndex = -1;
            world.gameParams.modal = false;
            world.gameParams.state = world.res.GAME_STATES.STARTED;

        };
        btn1.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = function(event) {

            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            world.gameParams.modal = false;
            event.stopPropagation();
            world.settingsBox.opacity = 0;
            world.settingsBox.zIndex = -1;
            world.gameParams.modal = false;
            world.gameParams.state = world.res.GAME_STATES.STARTED;
            
        };
        btn2.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

    }

    /**
     * Updates all labels with language-specific settings.
     * Note: Used in preferences to i18n Cocos plugin, since some strings need to be updated dynamically.
     */
    updateLanguageSettings() {

        let world = this.world;
        let scene = cc.director.getScene();
        let layout = scene.getChildByName('Canvas').getChildByName('layout');
        let bottomBar = layout.getChildByName('bottomBar');
        
        bottomBar.getChildByName('btnDesignPolicy').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = world.res.lang.commands_policy[cc.sys.localStorage.language];
        bottomBar.getChildByName('lblLossLabel').getComponent(cc.Label).string = world.res.lang.commands_loss[cc.sys.localStorage.language];
        bottomBar.getChildByName('lblPreparednessLabel').getComponent(cc.Label).string = world.res.lang.commands_prepared[cc.sys.localStorage.language];
        bottomBar.getChildByName('btnStats').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = world.res.lang.commands_stats[cc.sys.localStorage.language];

        world.gameParams.messagesNegative = world.scenarioData[cc.sys.localStorage.language].messages.negative;
        world.gameParams.messagesPositive = world.scenarioData[cc.sys.localStorage.language].messages.positive;
        world.gameParams.messageOverride = null;

        world.initPolicyDesign();

    }


    /**
     * Post data to server
     * @param {*} parent 
     * @param {*} message 
     * @param {*} prompt 
     */
    postResultsToServer() {

        let world = this.world;

        // Test posting data
        const xhr = cc.loader.getXMLHttpRequest();

        xhr.open("POST", "http://43.240.98.94/game_data");
        // xhr.open("POST", "http://localhost:8000/game_data");

        // Set Content-type "text/plain;charset=UTF-8" to post plain text
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        const gameLog = Object.assign({}, world.gameParams, { 

            policyOptions: undefined,
            policyRelations: undefined,
            messagesNegative: undefined,
            messagesPositive: undefined,
            timeoutID: undefined,
            tutorialHints: undefined,
            tutorialInterval: undefined

        });

        let countries = {};
        Object.values(world.countries).forEach(c => { 
            countries[c.iso_a3] = Object.assign({}, c, {
            
                points: undefined, 
                points_shared: undefined, 
                points_total: undefined, 
                selected: undefined, 
                shared_border_percentage: undefined, 
                subregion: undefined, 
                destructionPoints: undefined, 
                destructionDots: undefined, 
                policyPoints: undefined, 
                policyDots: undefined, 
                offsetX: undefined, 
                offsetY: undefined, 
                neighbours: undefined, 
                income_grp: undefined, 
                income_grp_num: undefined, 
                iso_a2: undefined, 
                gdp: undefined, 
                extremes: undefined, 
                equator_dist: undefined, 
                centroid: undefined, 
                area: undefined, 
                density: undefined, 
                economy: undefined
    
        }) });
        
        //gameLog.countries = countries;
        
        xhr.send(JSON.stringify(gameLog));

    }


    /**
     * Game over dialog
     * @param {*} parent 
     * @param {*} message 
     * @param {*} prompt 
     */
    gameOver(parent, message, prompt) {
        
        let world = this.world;

        world.postResultsToServer();

        // parent.pauseAllActions(); 
        window.clearTimeout(world.gameParams.timeoutID );
        world.gameParams.state = world.res.GAME_STATES.PAUSED;
        
        world.showMessageBox(parent, "Game Over", message, prompt, function() {

            world.initGameParams(world.scenarioData);
            world.gameParams.state = world.res.GAME_STATES.GAME_OVER;
            world.gameParams.startCountry = null;
            world.gameParams.policies = new Map<number, number>();
            world.tweetLabel.string = (world.gameParams.scenarioName);

            cc.director.loadScene("SelectOptions");

        }, undefined, undefined);

    }

    /**
     * A common function for adding mouse/touch events.
     */
    handleMouseTouchEvent(target, callback) {

        if (cc.sys.isMobile) {

            target.on(cc.Node.EventType.TOUCH_START, function ( event ) {
            
                target.TOUCHED = true;
                event.stopPropagation();
    
            }.bind(target));
    
        }

        target.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            
            if (!cc.sys.isMobile || target.TOUCHED) {

                callback(target);
                event.stopPropagation();
                target.TOUCHED = false;
    
            }

        }.bind(target));

    }

    initControls()  {

        let world = this.world;

        // Convenience variables
        world.btnQuit = world.topBar.getChildByName("btnQuit");
        world.btnSettings = world.topBar.getChildByName("btnSettings");
        world.btnSound = world.topBar.getChildByName("btnSound");
        world.btnSnapshot = world.topBar.getChildByName("btnSnapshot");
        world.btnPause = world.topBar.getChildByName("btnPause");
        world.btnPlay = world.topBar.getChildByName("btnPlay");
        world.btnFF = world.topBar.getChildByName("btnFF");
        world.tweetLabel = world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Label);
        world.bottomBar = cc.director.getScene().getChildByName('Canvas').getChildByName("layout").getChildByName("bottomBar");
        world.countryLabel = world.bottomBar.getChildByName("lblCountry").getComponent(cc.Label);
        world.countryLoss = world.bottomBar.getChildByName("lblLossPercent").getComponent(cc.Label);
        world.countryLossProgress = world.bottomBar.getChildByName("progressBarLoss").getComponent(cc.ProgressBar);
        world.countryAwarePrepared = world.bottomBar.getChildByName("lblPreparednessPercent").getComponent(cc.Label);
        world.countryPreparedProgress = world.bottomBar.getChildByName("progressBarPreparedness").getComponent(cc.ProgressBar);
        world.resourceScoreLabel = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground").getChildByName("lblResourceScore").getComponent(cc.Label);
        world.quizBox = cc.director.getScene().getChildByName('Canvas').getChildByName("layerQuizBox");
        world.settingsBox = cc.director.getScene().getChildByName('Canvas').getChildByName("layerSettings");

        // Handlers
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnQuit"), function() {

            world.gameParams.modal = true;
            world.gameParams.state = world.res.GAME_STATES.PAUSED;

            world.showMessageBox(world.node.parent, "Quit Game", '', 
                "Quit Game", () => {
                
                    world.postResultsToServer();

                    world.gameParams.state = world.res.GAME_STATES.GAME_OVER;
                    // cc.director.loadScene("LoadingScene");
                    cc.director.loadScene("SelectOptions");

                }, 
                "Return to Game", () => {

                    world.gameParams.modal = false;
                    world.gameParams.state = world.res.GAME_STATES.STARTED;

                });            
        });
        world.topBar.getChildByName("btnSettings").on(cc.Node.EventType.TOUCH_END, function() {

            world.gameParams.modal = true;
            world.gameParams.state = world.res.GAME_STATES.PAUSED;

            world.showSettingsBox();

        }, this);

        world.handleMouseTouchEvent(world.topBar.getChildByName("btnSound"), function() {
            
            world.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = !(cc.sys.localStorage.isPlaying == "true");
            if (cc.sys.localStorage.isPlaying == "true") {

                cc.sys.localStorage.isPlaying = false;
                cc.audioEngine.pauseAll();

            }
            else {
                
                cc.sys.localStorage.isPlaying = true;
                cc.audioEngine.resumeAll();
                world.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = true;

            }

        });
        world.topBar.getChildByName("btnSnapshot").on(cc.Node.EventType.TOUCH_END, function() {

            world.gameParams.state = world.res.GAME_STATES.PAUSED;

            world.snapshot();

            world.gameParams.state = world.res.GAME_STATES.STARTED;

        }, this);
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPause"), function() {

            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            world.btnPause.getComponent(cc.Button).interactable = false;
            world.btnPlay.getComponent(cc.Button).interactable = true;
            world.btnFF.getComponent(cc.Button).interactable = true;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).pause();

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPlay"), function() {
            
            world.updateTimeVars(world.res.MONTH_INTERVAL);
            world.gameParams.state = world.res.GAME_STATES.STARTED;
            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = false;
            world.btnFF.getComponent(cc.Button).interactable = true;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).play();

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnFF"), function() {

            world.updateTimeVars(world.res.MONTH_INTERVAL_FF);
            world.gameParams.state = world.res.GAME_STATES.STARTED;
            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = true;
            world.btnFF.getComponent(cc.Button).interactable = false;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).play();

        });


        let btnDesignPolicy = world.node.getChildByName("bottomBar").getChildByName("btnDesignPolicy");
        let btnStats = world.node.getChildByName("bottomBar").getChildByName("btnStats");
        let designPolicy = cc.director.getScene().getChildByName('Canvas').getChildByName("layerDesignPolicy");
        let resourceScore = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground");
        let stats = cc.director.getScene().getChildByName('Canvas').getChildByName("layerStats");


        // Add handling for bottom bar buttons
        btnDesignPolicy.on(cc.Node.EventType.TOUCH_END, function() {
            
            world.gameParams.modal = true;
            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            designPolicy.zIndex = 105;
            resourceScore.zIndex = 106;
            let layerDesignPolicy = cc.director.getScene().getChildByName('Canvas').getChildByName("layerDesignPolicy");
            let policyLabel = layerDesignPolicy.getChildByName("policyLabel");
            let policyDescription = layerDesignPolicy.getChildByName("policyDescription");
            let policyCostLabel = layerDesignPolicy.getChildByName("policyCostLabel");
            let btnPolicyInvest = layerDesignPolicy.getChildByName("btnPolicyInvest");
            
            policyLabel.opacity = 0;
            policyLabel.getComponent(cc.Label).string = "<< Select";
            policyDescription.opacity = 255;
            const policyGeneralLabel = world.res.lang.policy_platform_hint[cc.sys.localStorage.language];
            policyDescription.getComponent(cc.Label).string = policyGeneralLabel;
            policyCostLabel.opacity = 0;
            btnPolicyInvest.getComponent(cc.Button).interactable = true;
            btnPolicyInvest.opacity = 0;
    
        });
        let btnDesignPolicyQuit = designPolicy.getChildByName("btnDesignPolicyQuit");
        btnDesignPolicyQuit.on(cc.Node.EventType.TOUCH_END, function() {
            world.gameParams.state = world.res.GAME_STATES.STARTED;
            designPolicy.zIndex = -1;
            resourceScore.zIndex = 101;
        }, btnDesignPolicyQuit);

        btnStats.on(cc.Node.EventType.TOUCH_END, function() {
            
            world.gameParams.modal = true;
            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            stats.zIndex = 105;
            let page1 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_1");
            let page2 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_2");
            let page3 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_3");
    
            // Functions
            let drawSegment = function(pt1, pt2, width, color) {
                graphics.lineWidth = width;
                graphics.strokeColor = color;
                graphics.fillColor = color;
                graphics.moveTo(pt1.x, pt1.y);
                graphics.lineTo(pt2.x + 1, pt2.y);
                graphics.stroke();
                graphics.fill();
    
            };
            const makeString = function(num) { return (Math.round(num * 10) / 10).toString() + '%'; };

            // World
            page1.getChildByName("lblYear").getComponent(cc.Label).string = world.res.lang.stats_year[cc.sys.localStorage.language] + world.gameParams.currentDate.getFullYear();
            page1.getChildByName("lblYearMessage").getComponent(cc.Label).string = world.res.lang.stats_year_message_a[cc.sys.localStorage.language] + (world.gameParams.targetDate.getFullYear() - world.gameParams.currentDate.getFullYear()) + world.res.lang.stats_year_message_b[cc.sys.localStorage.language];
            page1.getChildByName("lblLoss").getComponent(cc.Label).string = world.res.lang.stats_loss[cc.sys.localStorage.language];
            page1.getChildByName("lblLossMessage").getComponent(cc.Label).string = world.res.lang.stats_loss_message_a[cc.sys.localStorage.language] + world.gameParams.startDate.getFullYear() + world.res.lang.stats_loss_message_b[cc.sys.localStorage.language] + makeString(world.gameParams.totalLoss) + ".";
            page1.getChildByName("lblPreparedness").getComponent(cc.Label).string = world.res.lang.stats_preparedness[cc.sys.localStorage.language] + makeString(world.gameParams.populationPreparedPercent) + " / " + Math.round(world.gameParams.populationPrepared / 1000000) + "M";
            let pd = world.res.lang.stats_preparedness_message_a[cc.sys.localStorage.language] + makeString(world.gameParams.populationPreparedPercent) + world.res.lang.stats_preparedness_message_b[cc.sys.localStorage.language];
            page1.getChildByName("lblPreparednessMessage").getComponent(cc.Label).string = pd;

            // Countries
            // Sort countries
            const countriesSorted = Object.values(world.countries).sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;            
            });
            let txtCountry = '', txtLoss = '', txtPreparedness = '';
            
            let content = page2.getChildByName("scrollview").getChildByName("view").getChildByName("content");
            content.destroyAllChildren();

            let counter = 0;
            countriesSorted.forEach((country) => {
                counter++;
                let color = country.loss > 20 ? world.res.COLOR_RED : (country.pop_prepared_percent > 20 ? world.res.COLOR_GREEN : world.res.COLOR_ICE);

                let cn = new cc.Node();
                let cnl = cn.addComponent(cc.Label);
                cn.color = color;
                cnl.string = country.name;
                cnl.fontSize = 20;
                cnl.font = world.titleFont;
                cnl.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                cn.setAnchorPoint(0, 0);
                cn.x = 0;
                cn.y = -40 + counter * -24;
                cn.parent = content;

                let cnln = new cc.Node();
                let cnll = cnln.addComponent(cc.Label);
                cnln.color = color;
                cnll.string = makeString(country.loss);
                cnll.fontSize = 20;
                cnll.font = world.titleFont;
                cnll.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                cnln.setAnchorPoint(1, 0);
                cnln.x = 580;
                cnln.y = -40 + counter * -24;
                cnln.parent = content;

                let cnpn = new cc.Node();
                let cnlp = cnpn.addComponent(cc.Label);
                cnpn.color = color;
                cnlp.string = makeString(country.pop_prepared_percent);
                cnlp.fontSize = 20;
                cnlp.font = world.titleFont;
                cnlp.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                cnpn.setAnchorPoint(1, 0);
                cnpn.x = 780;
                cnpn.y = -40 + counter * -24;
                cnpn.parent = content;
                
            });

            // Trends
            let drawNode = page3.getChildByName("graph");
            let graphics = drawNode.getComponent(cc.Graphics);
            graphics.clear();
            drawNode.destroyAllChildren();
            
            let x_o = 0, yP_o = 0, yL_o = 0, x = 0, yP = 0, yL = 0;
            const colorD =  new cc.Color(world.res.COLOR_RED.r, 
                                        world.res.COLOR_RED.g, 
                                        world.res.COLOR_RED.b);
            const colorP =  new cc.Color(world.res.COLOR_GREEN.r, 
                                        world.res.COLOR_GREEN.g, 
                                        world.res.COLOR_GREEN.b);

            const graphX = 4;
            const graphY = 0;
            const years = world.gameParams.targetDate.getFullYear() - world.gameParams.startDate.getFullYear();
            let scaleFactor = 0.9;
            const graphIncrementX = page3.width * scaleFactor / years;
            const graphIncrementY = page3.height * scaleFactor / 100;
            const graphOffset = 0;
            const lineOffset = -10;    
            drawSegment(new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX + page3.width * scaleFactor, graphOffset + lineOffset), 1, world.res.COLOR_ICE);
            drawSegment(new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX, graphOffset + page3.height * scaleFactor), 1, world.res.COLOR_ICE);
    
            for (let i = world.gameParams.startDate.getFullYear(); i < world.gameParams.targetDate.getFullYear(); i++) {
    
                const index = i - world.gameParams.startDate.getFullYear();

                const stats = world.gameParams.stats[i];

                if (stats === undefined)
                    continue;
    
                const loss = stats.loss;
                const prepared = stats.prepared;
                x = graphX + index * graphIncrementX;
                yL = graphOffset + (100 - Math.round(loss)) * graphIncrementY;
                yP = graphOffset + Math.round(prepared) * graphIncrementY;
    
                if (index > 0) {
    
                    // Line 
                    // drawNode.drawSegment(cc.p(x_o, yL_o), cc.p(x, yL), 2, world.res.COLOR_RED);
                    // drawNode.drawSegment(cc.p(x_o, yP_o), cc.p(x, yP), 2, world.res.COLOR_GREEN);
    
                    // Staircase
                    drawSegment(new cc.Vec2(x_o, yL_o), new cc.Vec2(x - 1, yL_o), 1, colorD);
                    drawSegment(new cc.Vec2(x, yL_o), new cc.Vec2(x, yL), 1, colorD);
                    drawSegment(new cc.Vec2(x_o, yP_o), new cc.Vec2(x - 1, yP_o), 1, colorP);
                    drawSegment(new cc.Vec2(x, yP_o), new cc.Vec2(x, yP), 1, colorP);
    
                }
                x_o = x, yL_o = yL, yP_o = yP;
    
            }
    
            let lblDestructionScoreNode = new cc.Node();
            let lblDestructionScore = lblDestructionScoreNode.addComponent(cc.Label);
            lblDestructionScore.string = makeString(world.gameParams.totalLoss);
            lblDestructionScore.font = world.titleFont;
            lblDestructionScore.fontSize = 28;
            lblDestructionScoreNode.color = colorD;
            lblDestructionScoreNode.setPosition(4 + graphX + x, graphY + yL);
            lblDestructionScoreNode.setAnchorPoint(0, 0.5);
            lblDestructionScoreNode.parent = drawNode;
            lblDestructionScoreNode.zIndex = 106;
            let lblPolicyScoreNode = new cc.Node();
            let lblPolicyScore = lblPolicyScoreNode.addComponent(cc.Label);
            lblPolicyScore.string = makeString(world.gameParams.populationPreparedPercent);
            lblPolicyScore.font = world.titleFont;
            lblPolicyScore.fontSize = 28;
            lblPolicyScoreNode.color = colorP;
            lblPolicyScoreNode.setPosition(4 + graphX + x, graphY + yP);
            lblPolicyScoreNode.setAnchorPoint(0, 0.5);
            lblPolicyScoreNode.parent = drawNode;
            lblPolicyScoreNode.zIndex = 106;

        }, btnStats);

        let btnStatsQuit = stats.getChildByName("btnStatsQuit");
        btnStatsQuit.on(cc.Node.EventType.TOUCH_END, function() {
            
            world.gameParams.modal = false;
            world.gameParams.state = world.res.GAME_STATES.STARTED;
            stats.zIndex = -1;

        }, btnStatsQuit);

        // Set ordering
        stats.zIndex = -1;

        // Update tweet label
        world.tweetLabel.string = world.gameParams.scenarioName;
        
    }

    initPolicyDesign() {

        let world = this.world;

        let layerDesignPolicy = cc.director.getScene().getChildByName('Canvas').getChildByName("layerDesignPolicy");
        let pageView = layerDesignPolicy.getChildByName("pageview").getComponent(cc.PageView);
        let resourceScoreLabel = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground").getChildByName("lblResourceScore").getComponent(cc.Label);

        // Switch pages
        let btnEconomy = layerDesignPolicy.getChildByName("btnEconomy");
        let btnPolitics = layerDesignPolicy.getChildByName("btnPolitics");
        let btnCulture = layerDesignPolicy.getChildByName("btnCulture");
        let btnEcology = layerDesignPolicy.getChildByName("btnEcology");

        let policyLabel = layerDesignPolicy.getChildByName("policyLabel");
        let policyDescription = layerDesignPolicy.getChildByName("policyDescription");
        let policyCostLabel = layerDesignPolicy.getChildByName("policyCostLabel");
        let btnPolicyInvest = layerDesignPolicy.getChildByName("btnPolicyInvest");

        pageView.setCurrentPageIndex(0);
        btnEconomy.getComponent(cc.Button).interactable = false;
        btnEconomy.getChildByName("Label").color = world.res.COLOR_UMBER;

        let allButtons = [btnEconomy, btnPolitics, btnCulture, btnEcology];
        let prevButton = btnEconomy;

        const costCalculation = (policy) => {
            
            let policyLevel = world.gameParams.policies[policy.id];
            let cost = policy.cost_1;

            if (policyLevel !== undefined) {

                switch(policyLevel) {
                    case 1:
                        cost = policy.cost_2;
                        break;
                    case 2:
                        cost = policy.cost_3;
                        break;
                    case 3:
                        cost = 0;
                        break;
                }

            }

            let dists = world.generateResourceDistribution();
            let policyCategory = Math.floor((policy.id - 1) / 4);
            let weights = [];

            for (let i = 0; i < dists.length; i++) {

                if (i % 4 == 0) {

                    weights.push(dists[i] * 4);
                    
                }
                else {

                    let wi = Math.floor(i / 4);
                    weights[wi] += dists[i] * 4;

                }

            }

            if (weights[policyCategory] > 1)
                cost *= weights[policyCategory];
            
            cost = Math.round(cost);

            return cost;

        };

        // Changes buttons with switching pages
        const switchPage = (btn, index) => {

            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = world.res.COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {
                
                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = world.res.COLOR_ICE;

            }
            
            prevButton = btn;

            policyLabel.opacity = 0;
            const policyGeneralLabel = world.res.lang.policy_platform_hint[cc.sys.localStorage.language];
            policyDescription.getComponent(cc.Label).string = policyGeneralLabel;
            policyCostLabel.opacity = 0;
            btnPolicyInvest.opacity = 0;

        };

        const makeButton = function(text, point, index) {

            let btn = allButtons[index];
            btn.getChildByName("Label").getComponent(cc.Label).string = text;
            
            btn.on(cc.Node.EventType.TOUCH_END, function(event) {
                switchPage(btn, index);
            }, layerDesignPolicy);

            // Select the first button only
            if (index == 0) {
            
                btn.getComponent(cc.Button).interactable = false;
                btn.getChildByName("Label").color = world.res.COLOR_UMBER;
                prevButton = btn;
            
            }
            
            return btn;

        };

        //btnPolicyInvest.off(cc.Node.EventType.TOUCH_END);
        btnPolicyInvest.on(cc.Node.EventType.TOUCH_END,  () => {

            let policySelected = btnPolicyInvest.policy;
            const cost = costCalculation(policySelected);

            if (world.gameParams.resources - cost >= 0 && 
                world.gameParams.policies[policySelected.id] === undefined) {

                world.gameParams.resources -= cost;  
                world.gameParams.policies[policySelected.id] = 1;
                resourceScoreLabel.string = (world.gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 1].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 1].color = world.res.COLOR_UMBER;

            }
            else if (world.gameParams.resources - cost >= 0 && 
                world.gameParams.policies[policySelected.id] === 1) {

                world.gameParams.resources -= cost;  
                world.gameParams.policies[policySelected.id] = 2;
                resourceScoreLabel.string = (world.gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 2].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 2].color = world.res.COLOR_UMBER;

            }
            else if (world.gameParams.resources - cost >= 0 && 
                world.gameParams.policies[policySelected.id] == 2) {

                world.gameParams.resources -= cost;  
                world.gameParams.policies[policySelected.id] = 3;
                resourceScoreLabel.string = (world.gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 3].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 3].color = world.res.COLOR_UMBER;

            }

            let newCost = costCalculation(policySelected);
            policyCostLabel.getComponent(cc.Label).string = (world.res.lang.policy_platform_cost[cc.sys.localStorage.language] + newCost.toString());

            if (world.gameParams.policies[policySelected.id] == 3) {

                btnPolicyInvest.getComponent(cc.Button).interactable = false;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (world.res.lang.policy_platform_completed[cc.sys.localStorage.language]);

            }
            else if (newCost <= world.gameParams.resources) {

                btnPolicyInvest.getComponent(cc.Button).interactable = true;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (world.res.lang.policy_platform_invest[cc.sys.localStorage.language]);

            }
            else {

                btnPolicyInvest.getComponent(cc.Button).interactable = false;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (world.res.lang.policy_platform_more_resources[cc.sys.localStorage.language]);

            }

        }, this);
        Object.values(world.res.RESOURCES).forEach((res, index) => {
            
            let btn = makeButton(res[cc.sys.localStorage.language].name, new cc.Vec2(300 + 200 * index, 80), index);
            //allButtons.push(btn);
        
        });

        const pageCount = 4;
        const levelButtons = {};
        let currentOptNode = null;
       
        for (let i = 0; i < pageCount; ++i) {

            let resourceGrp = world.res.RESOURCES[Object.keys(world.res.RESOURCES)[i]];
            let xLoc = 0, yLoc = 0, policyOptionCounter = 0; 
            let page = pageView.node.getChildByName("view").getChildByName("content").children[i];
            page.removeAllChildren();

            for (let j = 0; j < resourceGrp.policyOptions.length; j++) {

                let opt = resourceGrp.policyOptions[j];
                
                xLoc = (policyOptionCounter % 2) * page.width / 2;
                yLoc = (1 - Math.floor(policyOptionCounter / 2)) * page.height / 2;
                policyOptionCounter++;

                const optNode = new cc.Node();
                optNode.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                optNode.parent = page;
                optNode.setPosition(xLoc, yLoc);
                optNode.setContentSize(cc.size(page.width / 3, page.height / 3));

                const btnNodeBgd = new cc.Node();
                btnNodeBgd.name = "Background";
                btnNodeBgd.setAnchorPoint(new cc.Vec2(0, 0));
                btnNodeBgd.setContentSize(cc.size(104, 104));
                btnNodeBgd.setPosition(50, 50);
                btnNodeBgd.parent = optNode;
                btnNodeBgd.color = world.res.COLOR_ICE;
                cc.loader.loadRes(opt.img_normal, cc.SpriteFrame, function (err, sfNormal) {
                    const btnBgd = btnNodeBgd.addComponent(cc.Sprite);
                    btnBgd.setMaterial(1, world.defaultMaterial);
                    btnBgd.spriteFrame = sfNormal;
                });

                let btnLabelNode = new cc.Node();
                btnLabelNode.name = "Label";
                btnLabelNode.color = world.res.COLOR_ICE;
                const btnLabel = btnLabelNode.addComponent(cc.Label);
                btnLabel.string = opt[cc.sys.localStorage.language].text;
                btnLabel.font = world.titleFont;
                btnLabel.fontSize = 20;
                btnLabel.verticalAlign = cc.Label.VerticalAlign.BOTTOM
                btnLabelNode.setPosition(0, 0);
                btnLabelNode.setAnchorPoint(0.0, 0.0);
                btnLabelNode.setContentSize(optNode.width, optNode.height * 0.1);
                btnLabelNode.parent = optNode;

                const policySelector = (event) => {

                    policyLabel.getComponent(cc.Label).string = (opt[cc.sys.localStorage.language].text_long);
                    policyDescription.getComponent(cc.Label).string = (opt[cc.sys.localStorage.language].description);
                    
                    const cost = costCalculation(opt);
                    policyCostLabel.getComponent(cc.Label).string = world.res.lang.policy_platform_cost[cc.sys.localStorage.language] + cost.toString();
                    btnPolicyInvest.attr({'policy': opt});

                    if (world.gameParams.policies[opt.id] == 3) {

                        btnPolicyInvest.getComponent(cc.Button).interactable = false;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = world.res.lang.policy_platform_completed[cc.sys.localStorage.language];

                    }
                    else if (cost <= world.gameParams.resources) {

                        btnPolicyInvest.getComponent(cc.Button).interactable = true;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = world.res.lang.policy_platform_invest[cc.sys.localStorage.language];

                    }
                    else {

                        btnPolicyInvest.getComponent(cc.Button).interactable = false;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = world.res.lang.policy_platform_more_resources[cc.sys.localStorage.language];

                    }

                    policyLabel.opacity = 255;
                    policyDescription.opacity = 255;
                    policyCostLabel.opacity = 255;
                    btnPolicyInvest.opacity = 255;
                    if (currentOptNode != null && currentOptNode != optNode) {
                        currentOptNode.getChildByName("Background").color = world.res.COLOR_ICE;
                        currentOptNode.getChildByName("Label").color = world.res.COLOR_ICE;
                    }
                    currentOptNode = optNode;

                };

                const enterBtn = function(event) {
                    // if (!optNode.enabled)
                    //     return;
                    btnNodeBgd.color = world.res.COLOR_UMBER;
                    btnLabelNode.color = world.res.COLOR_UMBER;
                };
                const exitBtn = function(event) {
                    if (currentOptNode == optNode)
                        return;
                    btnNodeBgd.color = world.res.COLOR_ICE;
                    btnLabelNode.color = world.res.COLOR_ICE;
                };
                
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.TOUCH_END, policySelector, optNode);  } );
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_ENTER, enterBtn, optNode);  } );
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_LEAVE, exitBtn, optNode);  } );

                let btnLvl1Node = new cc.Node();
                let btnLvl1 = btnLvl1Node.addComponent(cc.Sprite);
                btnLvl1.spriteFrame = world.dotOff;
                btnLvl1.setMaterial(1, world.defaultMaterial);
                let btnLvl2Node = new cc.Node();
                let btnLvl2 = btnLvl2Node.addComponent(cc.Sprite);
                btnLvl2.spriteFrame = world.dotOff;
                btnLvl2.setMaterial(1, world.defaultMaterial);
                let btnLvl3Node = new cc.Node();
                let btnLvl3 = btnLvl3Node.addComponent(cc.Sprite);
                btnLvl3.spriteFrame = world.dotOff;
                btnLvl3.setMaterial(1, world.defaultMaterial);

                if (world.gameParams.policies[opt.id] === undefined) {
                    
                    btnLvl1.spriteFrame = world.dotOff;
                    btnLvl2.spriteFrame = world.dotOff;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (world.gameParams.policies[opt.id] === 1) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOff;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (world.gameParams.policies[opt.id] === 2) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOn;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (world.gameParams.policies[opt.id] === 3) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOn;
                    btnLvl3.spriteFrame = world.dotOn;

                }

                btnLvl1Node.setPosition(0 , 50);
                btnLvl1Node.setContentSize(25, 25);
                btnLvl1Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl2Node.setPosition(0 , btnLvl1Node.y + 35);
                btnLvl2Node.setContentSize(25, 25);
                btnLvl2Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl3Node.setPosition(0 , btnLvl2Node.y + 35);
                btnLvl3Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl3Node.setContentSize(25, 25);
                btnLvl1Node.parent = optNode;
                btnLvl2Node.parent = optNode;
                btnLvl3Node.parent = optNode;
                
                levelButtons[opt.id * 100 + 1] = btnLvl1Node;
                levelButtons[opt.id * 100 + 2] = btnLvl2Node;
                levelButtons[opt.id * 100 + 3] = btnLvl3Node;

            }
        }        

        btnEconomy.on(cc.Node.EventType.TOUCH_END, (event) => {
            switchPage(btnEconomy, 0);
        });
        btnPolitics.on(cc.Node.EventType.TOUCH_END, (event) => {
            switchPage(btnPolitics, 1);
        });
        btnCulture.on(cc.Node.EventType.TOUCH_END, (event) => {
            switchPage(btnCulture, 2);
        });
        btnEcology.on(cc.Node.EventType.TOUCH_END, (event) => {
            switchPage(btnEcology, 3);
        });

        pageView.node.on('page-turning', (event) => {
            let index = event.getCurrentPageIndex();
            let btn = allButtons[index];
            switchPage(btn, index);
        }, world);

    }

    initStats() {

        let world = this.world;

        let layerStats = cc.director.getScene().getChildByName('Canvas').getChildByName("layerStats");

        let pageView = layerStats.getChildByName("pageview").getComponent(cc.PageView);

        // Switch pages
        let btnWorld = layerStats.getChildByName("btnWorld");
        let btnCountries = layerStats.getChildByName("btnCountries");
        let btnTrends = layerStats.getChildByName("btnTrends");

        pageView.setCurrentPageIndex(0);
        btnWorld.getComponent(cc.Button).interactable = false;
        btnWorld.getChildByName("Label").color = world.res.COLOR_UMBER;

        let allButtons = [btnWorld, btnCountries, btnTrends];
        let prevButton = btnWorld;

        const switchPage = (btn, index) => {

            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = world.res.COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {
                
                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = world.res.COLOR_ICE;

            }
            
            prevButton = btn;

        };

        btnWorld.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnWorld, 0);
        });
        btnCountries.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnCountries, 1);
        });
        btnTrends.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnTrends, 2);
        });

        pageView.node.on('page-turning', function(pv) {
            let index = pv.getCurrentPageIndex();
            let btn = allButtons[index];
            switchPage(btn, index);
        }, world);        
    }
        
    processResourceSelection(event) {
        
        let world = this.world;

        // Do nothing if game is paused
        if (world.gameParams.state === world.res.GAME_STATES.PAUSED)
            return;

        const res = Math.floor(1 + Math.random() * 3);
        world.gameParams.resources += res;

        event.target.destroy();

        if (!world.gameParams.resourcesAdded) {
            
            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            world.gameParams.resourcesAdded = true;
            
            if (world.gameParams.tutorialMode) {
                
                world.showMessageBox(world, "HINT:", world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language], "OK!", function() {
                    
                    world.gameParams.tutorialHints.push(world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language]);
                    world.gameParams.state = world.res.GAME_STATES.STARTED;

                }, undefined, undefined);

            }
            else {
                
                world.gameParams.state = world.res.GAME_STATES.STARTED;

            }
        }

    }

    processCrisisSelection(event) {

        let world = this.world;

        // Do nothing if game is paused
        if (world.gameParams.state === world.res.GAME_STATES.PAUSED)
            return;

        world.gameParams.crisisCountry = null;
        let crisis = null;

        for (let i = 0; i < world.gameParams.crises.length; i++) {

            if (world.gameParams.crises[i].id == event.target.id) {

                const crisisInCountry = world.gameParams.crises[i];
                crisis = world.res.CRISES[crisisInCountry.crisis];
                world.gameParams.crises.splice(i, 1);
                break;

            }
        }

        event.target.destroy();
        
        if (!world.gameParams.alertCrisis && world.gameParams.tutorialMode) {

            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            world.gameParams.alertCrisis = true;
            
            world.showMessageBox(world, 
                world.res.lang.crisis_title[cc.sys.localStorage.language], 
                world.res.lang.crisis_message[cc.sys.localStorage.language] + crisis[cc.sys.localStorage.language] + "!", "OK!", function() {

                world.gameParams.state = world.res.GAME_STATES.STARTED;

            }, undefined, undefined);

        }
        else {

            // Add Crisis Quiz, 50% of the time
            if (Math.random() < 0.5) {
            // if (Math.random() < 1.0) {

                // Show quiz
                let qindex = Math.floor(Math.random() * world.res.quizzes.length);
                let qi = world.res.quizzes[qindex];

                // Prevent the same quiz question being asked twice
                if (world.gameParams.quizzes.indexOf(qindex) > -1)
                    return;
                world.gameParams.quizzes.push(qindex);

                let quiz = qi.quiz[cc.sys.localStorage.language];
                let wrong_answer = qi.wrong_answer[cc.sys.localStorage.language];
                let right_answer = qi.right_answer[cc.sys.localStorage.language];

                world.showQuizBox(world, "CRISIS ALERT!", quiz, wrong_answer, right_answer);

            }

        }

    }
    
    /**
     * Update month / year in the interface
     * @param {*} world 
     */
    refreshDate(world) {

        // world.topBar.getChildByName("lblDay").getComponent(cc.Label).string = (world.gameParams.currentDate.getDate()).toString();
        let mth = world.gameParams.currentDate.getMonth() + 1;
        let ms = mth < 10 ? '0' + mth.toString() : mth.toString();
        world.topBar.getChildByName("lblMonth").getComponent(cc.Label).string = ms;
        world.topBar.getChildByName("lblYear").getComponent(cc.Label).string = (world.gameParams.currentDate.getFullYear()).toString();

    }

    /**
     * Show country-level stats.
     */
    printCountryStats() {

        let world = this.world;

        const country = world.countries[world.gameParams.currentCountry];
        world.countryLabel.string = (country.name);

        const lossPercent = Math.floor(country.loss);
        const preparedPercent = Math.floor(country.pop_prepared_percent);

        world.countryLoss.string = (lossPercent + "%" );
        world.countryLossProgress.progress = lossPercent / 100.0;
        
        if (lossPercent >= world.res.LOSS_TOTAL)
            world.countryLossProgress.node.opacity = 255;
        else if (lossPercent >= world.res.LOSS_PARTIAL)
            world.countryLossProgress.node.opacity = 191;
        world.countryAwarePrepared.string = (preparedPercent + "%");
        // if (preparedPercent >= 20)
        //     world.countryAwarePrepared.opacity = 255;
        world.countryPreparedProgress.progress = preparedPercent / 100.0;

    }

    /**
     * Show world-level stats.
     */
    printWorldStats() {

        let world = this.world;

        world.countryLabel.string = (world.res.lang.world_label[cc.sys.localStorage.language]);

        const lossPercent = Math.round(world.gameParams.totalLoss);
        const preparedPercent = Math.round(world.gameParams.populationPreparedPercent);

        world.countryLoss.string = (lossPercent + "%" );
        world.countryAwarePrepared.string = (preparedPercent + "%");

        world.countryLossProgress.progress = lossPercent / 100.0;
        world.countryPreparedProgress.progress = preparedPercent / 100.0;

    }

    generateResourceDistribution() {

        let world = this.world;

        let dists = [];
        let total = 0;

        for (let i = 0; i < 16; i++) {

            let weight = 1;
            if (world.gameParams.policies[i + 1] !== undefined) 
                weight += world.gameParams.policies[i + 1];
            
            total += weight;
            dists.push(weight);

        }

        for (let i = 0; i < dists.length; i++) {

            dists[i] /= total;

        }

        return dists;

    }

    selectCountry(event, location) {

        let world = this.world;
        let node = world.node.getChildByName('mapFront');

        if (world.gameParams.state !== world.res.GAME_STATES.PREPARED && world.gameParams.state !== world.res.GAME_STATES.STARTED && world.gameParams.state !== world.res.GAME_STATES.PAUSED)
            return;
        
        const target = event.getCurrentTarget();
        const locationInNode = target.convertToNodeSpaceAR(location);
        world.lastLayerID = -1;

        let start = 0, end = world.sortedObjs.length;
        if (world.lastLayerID > -1) {

            start = (start < 0) ? 0 : start;
            end = (end > world.sortedObjs.length) ? world.sortedObjs.length : end;

        };

        const ed = (pt1, pt2) => {
            return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
        };

        let minED = -1, selectedCountry = null;
        for (let j = start; j < end; j++) {

            const poly = world.sortedObjs[j];
            const mousePoint = {x: locationInNode.x + node.x, y: cc.winSize.height - locationInNode.y - (1 * world.res.Y_OFFSET) - node.y};
            const cd = world.collisionDetection(poly.points[0], mousePoint);

            if (cd) {

                world.lastLayerID = j;
                const countryObj = world.countries[poly.iso_a3];
                const ced = ed(countryObj.centroid, mousePoint);
                if (minED === -1 || ced < minED) {

                    minED = ced;
                    selectedCountry = poly.iso_a3;
                    break;

                }

            }

        }

        // Pick the match with the closest centroid ID
        if (selectedCountry != null) {

            if (world.gameParams.currentCountry != null) {
                
                world.countries[world.gameParams.currentCountry].selected = false;

            }
            world.gameParams.currentCountry = selectedCountry;

            if (world.gameParams.currentCountry != null)
                world.countries[world.gameParams.currentCountry].selected = true;
            world.gameParams.currentCountry = selectedCountry;
            
            world.printCountryStats();

        }
        else {
            
            if (world.gameParams.currentCountry != null)
                world.countries[world.gameParams.currentCountry].selected = false;
            world.gameParams.currentCountry = null;

            world.printWorldStats();

        }

        return true;
    }

    generateWeightedPolicyIndex(r) {
        
        let world = this.world;

        let dists = world.generateResourceDistribution();
        let counter = 0;
        let chosenPolicy = 0;

        for (let i = 0; i < dists.length; i++) {

            let prob = dists[i];
            counter += prob;

            if (counter > r) {

                chosenPolicy = i;
                break;
            
            }

        }

        return chosenPolicy;

    }

    /**
     * Generate a policy icon, based on a weighted average of existing policies.
     */
    generatePolicyIcon() {

        let world = this.world;

        let policyIndex = world.generateWeightedPolicyIndex(Math.random());
        let icon = '';

        switch(policyIndex) {
            case 0:
                icon = world.res.res.resource_economy_1;
                break;
            case 1:
                icon = world.res.res.resource_economy_2;
                break;
            case 2:
                icon = world.res.res.resource_economy_3;
                break;
            case 3:
                icon = world.res.res.resource_economy_4;
                break;
            case 4:
                icon = world.res.res.resource_politics_1;;
                break;
            case 5:
                icon = world.res.res.resource_politics_2;;
                break;
            case 6:
                icon = world.res.res.resource_politics_3;;
                break;
            case 7:
                icon = world.res.res.resource_politics_4;;
                break;
            case 8:
                icon = world.res.res.resource_culture_1;;
                break;
            case 9:
                icon = world.res.res.resource_culture_2;;
                break;
            case 10:
                icon = world.res.res.resource_culture_3;;
                break;
            case 11:
                icon = world.res.res.resource_culture_4;;
                break;
            case 12:
                icon = world.res.res.resource_ecology_1;;
                break;
            case 13:
                icon = world.res.res.resource_ecology_2;;
                break;
            case 14:
                icon = world.res.res.resource_ecology_3;;
                break;
            case 15:
                icon = world.res.res.resource_ecology_4;;
                break;
        }

        
        return policyIndex;
    }
                            
    // Add chance of new resource
    addResource() {

        let world = this.world;
        let map = world.node.getChildByName('mapFront');

        const btnRes = new TimedNode('Resource');
        const sp = btnRes.addComponent(cc.Sprite);
        const policyIcon = world.generatePolicyIcon();
        sp.spriteFrame = world.policyIcons[policyIcon];
        
        const ind = Math.floor(Math.random() * Object.keys(world.countries).length);
        const countryRand = world.countries[Object.keys(world.countries)[ind]];
        const pt = countryRand.centroid;
        // btnRes.color = world.res.COLOR_SKY;
        btnRes.setPosition( pt.x - map.x, (world.node.height - (1 * world.res.Y_OFFSET) ) - pt.y - map.y);// + world.res.RESOURCE_SIZE_H );
        btnRes.setContentSize(cc.size(world.res.RESOURCE_SIZE_W, world.res.RESOURCE_SIZE_H));
        btnRes.placedAt = world.gameParams.counter;
        btnRes.setAnchorPoint(0.5, 0.0);
        btnRes.parent = map;
        btnRes.zIndex = 103;
        world.buttons.push(btnRes);

        btnRes.on(cc.Node.EventType.TOUCH_END, world.processResourceSelection, this);

        /*
        if (world.gameParams.automateMode) {
            
            const r = Math.random();
            if (r < parseFloat(world.gameParams.automateScript.resourcesProb)) {

                fireClickOnTarget(btnRes);

            }

        }
        */

        if (!world.gameParams.alertResources) {

            if (world.gameParams.tutorialMode) {
                
                world.gameParams.state = world.res.GAME_STATES.PAUSED;
                world.gameParams.alertResources = true;

                world.showMessageBox(world, "HINT:",world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language], "OK!", function(that) {
                
                    world.gameParams.tutorialHints.push(world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language]);
                    //world.gameParams.state = world.res.GAME_STATES.STARTED;
                    world.gameParams.state = world.res.GAME_STATES.PAUSED_TUTORIAL;

                }, undefined, undefined);

            }

        }

        world.gameParams.lastResource = world.gameParams.counter;

    }
                            
    /**
     * Calculate the probability distribution of crisis & country
     */ 
    crisisProbDistribution() {
        
        let world = this.world;

        const probs = [];
        const crisisKeys = Object.keys(world.res.CRISES);
        const countryKeys = Object.keys(world.countries);
        let denom = 0;
        
        crisisKeys.forEach(ck => {

            const crisis = world.res.CRISES[ck];
            
            countryKeys.forEach(yk => {
            
                const country = world.countries[yk];
                const lossProp = country.loss / world.gameParams.totalLoss;
                const preparedProp = country.pop_prepared_percent / world.gameParams.populationPreparedPercent;
                
                let totalInfluence = 1.0;
                totalInfluence += lossProp * crisis.influence_of_environmental_loss;
                totalInfluence += preparedProp * crisis.influence_of_preparedness;
                
                if (isNaN(totalInfluence))
                    totalInfluence = 0.0;
                
                if (totalInfluence > 0) {
                
                    denom += totalInfluence;
                    probs.push(totalInfluence);
                
                }

            });

        });

        for (let i = 0; i < probs.length; i++) {
        
            probs[i] /= denom;
        
        }
        
        return probs;

    }

    crisisProbLocation(r) {

        let world = this.world;

        const probs = world.crisisProbDistribution();
        const crisisKeys = Object.keys(world.res.CRISES);
        const countryKeys = Object.keys(world.countries);
        let crisisCountry = new CrisisCountry();
        let counter = 0;
        
        for (let i = 0; i < probs.length; i++) {
        
            counter += probs[i];

            if (r < counter) {

                const crisisID = Math.floor(crisisKeys.length * i / probs.length);
                const countryID = i % countryKeys.length;
                crisisCountry.crisis = crisisKeys[crisisID];
                crisisCountry.country = countryKeys[countryID];
                crisisCountry.id = i;
                crisisCountry.counter = world.gameParams.counter;
                break;

            }
        
        }

        return crisisCountry;

    }

    /**
     * Add a new crisis.
     */
    addCrisis() {

        let world = this.world;
        let map = world.node.getChildByName('mapFront');

        const r2 = Math.random();
        const crisisInCountry = world.crisisProbLocation(r2);
        world.gameParams.crisisCountry = crisisInCountry;
        world.gameParams.crises.push(crisisInCountry);
        world.gameParams.crisisCount++;
        const crisis = world.res.CRISES[crisisInCountry.crisis];
        const country = world.countries[crisisInCountry.country];

        const btnCrisis = new TimedNode('Crisis');
        const sp = btnCrisis.addComponent(cc.Sprite);
        sp.spriteFrame = world.crisisIcons[crisisInCountry.crisis];

        const pt = country.centroid;
        // btnCrisis.color = world.res.COLOR_RED;
        btnCrisis.setPosition(pt.x - map.x, (world.node.height - (1 * world.res.Y_OFFSET) ) - pt.y - map.y);// + world.res.RESOURCE_SIZE_H / 2 );
        btnCrisis.setContentSize(cc.size(world.res.RESOURCE_SIZE_W, world.res.RESOURCE_SIZE_H));
        // btnCrisis.setColor(world.res.COLOR_RED);
        btnCrisis.placedAt = world.gameParams.counter;
        btnCrisis.setAnchorPoint(0.5, 0.0);
        btnCrisis.id = crisisInCountry.id;
        btnCrisis.name = "crisis" + crisisInCountry.id;
        btnCrisis.parent = map;
        btnCrisis.zIndex = 103;
        world.buttons.push(btnCrisis);

        btnCrisis.on(cc.Node.EventType.TOUCH_END, world.processCrisisSelection, this);

        // After the third crisis, add notifications to the news feed
        let message = world.res.lang.crisis_prefix[cc.sys.localStorage.language] + 
                        crisis[cc.sys.localStorage.language] + 
                        world.res.lang.crisis_suffix[cc.sys.localStorage.language] + 
                        country.name + "."; 
        
        // btnCrisis.setTitleColor(world.res.COLOR_LICORICE);
        // btnCrisis.setTitleText(crisis.name);

        if (world.gameParams.crisisCount < 4) {

            world.gameParams.state = world.res.GAME_STATES.PAUSED;
            message += world.res.lang.crisis_explanation[cc.sys.localStorage.language];

            world.showMessageBox(world, world.res.lang.crisis_alert[cc.sys.localStorage.language], message, "OK!", (that) => {

                if (world.gameParams.tutorialMode)
                    world.gameParams.state = world.res.GAME_STATES.PAUSED_TUTORIAL;
                else
                    world.gameParams.state = world.res.GAME_STATES.STARTED;

            }, undefined, undefined);

            if (world.gameParams.automateMode) {

                //fireClickOnTarget(buttons[0]);

            }                    

        }
        else {
            
            // if (world.gameParams.messageOverride == null)
            //     world.gameParams.messageOverride = message;

        }
        
        world.gameParams.lastCrisis = world.gameParams.counter;

    }

    /**
     * Add tutorial.
     */
    addTutorial() {

        let world = this.world;

        if (world.gameParams.tutorialHints.length < 2 || world.gameParams.tutorialHints.length >= 6)
            return;

        world.gameParams.state = world.res.GAME_STATES.PAUSED;
        let message = null;
        switch(world.gameParams.tutorialHints.length) {
            case 2:
            default:
                message = world.res.TUTORIAL_MESSAGES.RANDOM_1[cc.sys.localStorage.language];
                break;
            case 3:
                message = world.res.TUTORIAL_MESSAGES.RANDOM_2[cc.sys.localStorage.language];
                break;
            case 4:
                message = world.res.TUTORIAL_MESSAGES.RANDOM_3[cc.sys.localStorage.language];
                break;
            case 5:
                message = world.res.TUTORIAL_MESSAGES.RANDOM_4[cc.sys.localStorage.language];
                break;
        }

        world.showMessageBox(world, "HINT:", message, "OK", function() {
            
            world.gameParams.tutorialHints.push(message);
            world.gameParams.state = world.res.GAME_STATES.STARTED;

        }, undefined, undefined);

    }

    /**
     * Returns a decayed value of a percentile (0-100),
     * between Math.E (2.78...) and 1. 
     * The inflectionPoint parameter, also 0-100, indicates the point of fastest decay.
     * The decay fundtion is roughly sigmoidal around the inflection point.
     */
    sigmoidalDecay(percent, inflectionPoint) {

        if (!this.world.res.SIGMOIDAL_DECAY)
            return 1.0;

        inflectionPoint = (inflectionPoint === undefined) ? 50 : inflectionPoint;

        // Some value between 0.0 and 1.0 (where inflectionPoint = 50.0)
        let normedInverse = 1.0 - Math.abs(( percent - inflectionPoint ) / inflectionPoint);
        // Some value between e (2.78...) and 1 / e (0.367) (or lower if inflection point != 50.0)
        return Math.pow(Math.E, normedInverse);

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

        let world = this.world;

        const lossCurrent = country.loss;

        // Add random amount to default rate of loss
        const rateOfLoss = world.gameParams.rateOfLoss * (0.5 + Math.random());
        const rateOfLossMonthly = rateOfLoss;
        let rateOfLossFactor = 1 + rateOfLossMonthly;

        // Weaken rate of loss by population prepared for good policy
        const preparednessFactor = 1 + 0.1 * country.pop_prepared_percent / 100.0;
        rateOfLossFactor /= preparednessFactor;

        //let crisis = world.res.CRISES[world.gameParams.crises[0].crisis];
        world.gameParams.crises.forEach(crisisInCountry => {
            
            const crisis = world.res.CRISES[crisisInCountry.crisis];
            // Add effects of country / global loss ratio to crisis effect
            // Take the square root of the ratio of country to world loss, and multiply this by the crisis effect
            let crisisEffect = (1 + crisis.effect_on_environmental_loss * (Math.pow(lossCurrent / world.gameParams.totalLoss, 0.5)));
            rateOfLossFactor *= crisisEffect;

            if (country.iso_a3 == 'AUS') {
                console.log(crisisEffect)
            }
                
        });

        const decayLossFactor = ( (rateOfLossFactor - 1) * world.sigmoidalDecay(lossCurrent, 50.0) );
        let lossNew = lossCurrent + decayLossFactor;
        // if (country.iso_a3 == 'AUS') {
        //     console.log("se: "+decayLossFactor+":"+rateOfLossFactor)
        // }
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
        
        let world = this.world;

        const neighbours = country.neighbours;
        const sharedBorder = country.shared_border_percentage;
        const transmissionLand = world.scenarioData.threat_details.transmission.transmission_land;
        const transmissionSea = world.scenarioData.threat_details.transmission.transmission_sea;
        const transmissionAir = world.scenarioData.threat_details.transmission.transmission_air;
        const infectivityMinimumIncrease = world.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        const likelihoodOfTransmission = country.affected_chance; //infectivityIncreaseSpeed / 100.0;

        const popCountry = country.pop_est;
        const popWorld = world.gameParams.populationWorld;
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
        
        let world = this.world;

        if (country.affected_chance == 0)
            return;

        if (country.pop_aware >= parseInt(country.pop_est))
            return;

        // Calculate infectivity
        const infectivityIncreaseSpeed = world.scenarioData.threat_details.advanced_stats.infectivity_increase_speed;
        const infectivityMinimumIncrease = world.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        let infectivityRate = infectivityIncreaseSpeed;

        Object.keys(world.gameParams.policies).forEach(strategy => {
            const level = world.gameParams.policies[strategy];
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

    calculatePolicyBalanceOnPreparedness() {

        let world = this.world;

        const strategyCount = Object.values(world.gameParams.policies).reduce((accum, level) => accum + level, 0);
        if (strategyCount == 0)
            return 1.0;

        const domainMean = strategyCount / 4;
        let ecn = 0, pol = 0, cul = 0, eco = 0;
        Object.keys(world.gameParams.policies).forEach(policyID => {
            const policy = world.gameParams.policyOptions[policyID]
            const level = world.gameParams.policies[policyID];
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

        let world = this.world;

        let severityEffect = 1.0;

        const policyID = parseInt(Object.keys(world.gameParams.policies)[index]);
        const policy = world.gameParams.policyOptions[policyID];
        const level = world.gameParams.policies[policyID];

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
        for (let j = index + 1; j < Object.keys(world.gameParams.policies).length; j++) {
            // if (i == j)
            //     continue;

            const otherPolicyID = parseInt(Object.keys(world.gameParams.policies)[j]);
            const otherLevel = world.gameParams.policies[otherPolicyID];
            // Generate a natural log, so that level 1 = 1; level 2 = 1.31; level 3 = 1.55
            const otherLevelMultiplier = Math.log(otherLevel + 1.718);

            const relation = world.gameParams.policyRelations[policyID][otherPolicyID];
            
            if (typeof(relation) !== "undefined") {
            
                severityEffect *= (1 + relation * otherLevelMultiplier);
            
            }

        }

        return severityEffect;

    }

    calculatePolicyImpactOnPreparedness(country) {
        
        let world = this.world;

        let severityEffect = 1.0;

        for (let i = 0; i < Object.keys(world.gameParams.policies).length; i++) {

            severityEffect *= world.calculateSinglePolicyImpactOnPreparedness(country, i);

        }
        
        // Add sigmoidal effect
        let decayInfluence = world.sigmoidalDecay(country.pop_prepared_percent, 50.0);

        return severityEffect * decayInfluence;

    }

    registerPreparednessWithin(country) {

        let world = this.world;

        if (country.affected_chance == 0)
            return;

        // const popAware = country.pop_aware;
        const popAware = country.pop_est;
        let popPrepared = country.pop_prepared;

        // Calculate severity
        let severityIncreaseSpeed = world.scenarioData.threat_details.advanced_stats.severity_increase_speed;
        const severityMinimumIncrease = world.scenarioData.threat_details.advanced_stats.minimum_severity_increase;
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

    doSim() {

        let world = this.world;

        if (world.gameParams.startCountry === null || world.gameParams.state !== world.res.GAME_STATES.PREPARED)
            return;

        const country = world.countries[world.gameParams.startCountry];
        country.policy = 1.0;
        country.affected_chance = 1.0;

        world.startGameParams(world);
        world.refreshDate(world);
        world.buttons = [];

        /**
         * Updates the game state at regular intervals
         */
        const updateTime = () => {

            if (world.gameParams.state !== world.res.GAME_STATES.STARTED) {

                // Refresh the timeout
                world.gameParams.timeoutID = setTimeout(updateTime, 20);
                return;

            }

            world.gameParams.counter++;

            // Handle automation here
            if (world.gameParams.automateMode) {
                        /*

                // Select resources
                for (let i = 0 ; i < world.gameParams.automateScript.policyEvents.length; i++) {

                    let pe = world.gameParams.automateScript.policyEvents[i];
                    
                    if (world.gameParams.counter == pe.counter / world.res.MONTH_INTERVAL) {

                        fireClickOnTarget(world.btnDevelopPolicy, function() {
                            
                            let resNames = Object.values(world.res.RESOURCES).map(res => res.name);
                            let resGrp = Math.floor((pe.policyID - 1) / resNames.length);
                            let element = world.designPolicyLayer.getChildByName(resNames[resGrp]);

                            fireClickOnTarget(element, function() {
                                let btn = world.designPolicyLayer.policyButtons[pe.policyID - 1];
                                
                                fireClickOnTarget(btn, function() {

                                    fireClickOnTarget(world.designPolicyLayer.investButton, function() {

                                        fireClickOnTarget(world.designPolicyLayer.btnExit);

                                    });

                                });
                            });
                        });
                        break;

                    }
                };

                // Select crisis
                for (let i = 0; i < world.gameParams.crises.length; i++) {

                    let crisisInCountry = world.gameParams.crises[i];
                    
                    if (world.gameParams.counter == crisisInCountry.counter + world.gameParams.automateScript.crisisDuration) {
                        
                        let target = world.node.getChildByName("crisis"+crisisInCountry.id);
                        world.fireClickOnTarget(target);

                    }

                }
                    */

            }

            if (world.gameParams.counter % world.gameParams.timeInterval == 0) {

                world.gameParams.currentDate = new Date(world.gameParams.currentDate.valueOf());
                world.gameParams.currentDate.setDate(world.gameParams.currentDate.getDate() + 30.417);

                // Show message box for each new decade
                const currentYear = world.gameParams.currentDate.getFullYear();
                const previousYear = world.gameParams.previousDate.getFullYear();
                
                // Change of year
                if (currentYear > previousYear) {

                    world.gameParams.stats[previousYear] = {
                        loss: world.gameParams.totalLoss,
                        prepared: world.gameParams.populationPreparedPercent
                    };

                    // Change of decade
                    let message = '';
                    let showDialog = false;

                    // Sort narratives by loss for comparison
                    const narratives = Object.values(world.res.NARRATIVES.n2048).sort((o1, o2) => {return o2.loss - o1.loss});

                    switch (currentYear) {
                        case 2048:
                            showDialog = true;
                            
                            for (let i = 0; i < narratives.length; i++) {
                            
                                const n = narratives[i];
                            
                                if (world.gameParams.totalLoss > n.loss) {
                                    
                                    let index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                                    message = n[cc.sys.localStorage.language][index];
                                    break;

                                }

                            }
                            break;
                        default:
                            break;

                    }
                        
                    if (showDialog) {

                        world.gameParams.state = world.res.GAME_STATES.PAUSED;
                        world.showMessageBox(world, 
                            world.res.lang.bulletin[cc.sys.localStorage.language] + currentYear, 
                            message, "OK", function() {
                                world.gameParams.state = world.res.GAME_STATES.STARTED;
                            }, undefined, undefined);

                        if (world.gameParams.automateMode) {

                            //world.fireClickOnTarget(buttons[0]);

                        }

                    }

                }

                world.gameParams.previousDate = world.gameParams.currentDate;


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
                world.gameParams.policy = totalPolicy;

                totalLoss /= Object.keys(world.countries).length;
                world.gameParams.previousLoss = totalLoss;
                world.gameParams.totalLoss = totalLoss;

                world.gameParams.countriedAffected = countriedAffected;
                world.gameParams.populationAware = populationAware;
                world.gameParams.populationPrepared = populationPrepared;
                world.gameParams.populationAwarePercent = 100 * world.gameParams.populationAware / world.gameParams.populationWorld;
                world.gameParams.populationPreparedPercent = 100 * world.gameParams.populationPrepared / world.gameParams.populationWorld;

                if (world.gameParams.currentCountry != null) {

                    world.printCountryStats();

                }
                else {

                    world.printWorldStats();

                }

            }


            // Various events
            let ci = world.gameParams.crisisInterval;
            Object.keys(world.gameParams.policies).forEach(policyID => {

                const policy = world.gameParams.policyOptions[policyID];
                const policyLevel = world.gameParams.policies[policyID];
                ci /= 1 + (policy.effect_on_crises * Math.log(policyLevel + 1.718));
                
            });         

            // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
            if (world.gameParams.counter - world.gameParams.lastCrisis >= ci  && Math.random() < world.res.CRISIS_CHANCE) {

                world.addCrisis();

            }

            let adjustEffect = (effect) => {

                // Effect must be positive
                effect += 1.000001;
                // Invert effect
                effect = 1.0 / effect;
                // Multiply by difficulty
                if (effect > 1.0)
                    effect = Math.pow(effect, world.gameParams.difficultyMultiplier);
                else 
                    effect = Math.pow(effect, 1.0 / world.gameParams.difficultyMultiplier);

                return effect;

            };

            let ri = world.gameParams.resourceInterval;
            world.gameParams.crises.forEach(crisisInCountry => {
                
                let crisis = world.res.CRISES[crisisInCountry.crisis];
                let crisisEffect = crisis.effect_on_resources;
                let country = world.countries[crisisInCountry.country];
                // Add country-specific effects here
                // ...

                // Add to overall effect
                ri *= adjustEffect(crisisEffect);
                
            }); 

            Object.keys(world.gameParams.policies).forEach(policyID => {

                let policy = world.gameParams.policyOptions[policyID];
                let policyLevel = world.gameParams.policies[policyID];
                let policyEffect = policy.effect_on_resources * Math.log(policyLevel + 1.718);

                ri *= adjustEffect(policyEffect);
                
            }); 

            // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
            if (world.gameParams.counter - world.gameParams.lastResource >= ri) {

                world.addResource();
                world.gameParams.resourceInterval *= 1.1;

            }
            
            if (world.gameParams.tutorialMode && world.gameParams.counter % world.gameParams.tutorialInterval == 0) {
                
                world.addTutorial();

            }

            // Add buttons
            const newButtons = [];
            for (let i = 0; i < world.buttons.length; i++) {

                const button = world.buttons[i];
                if (button.name == 'Resource' && world.gameParams.counter > button.placedAt + world.res.RESOURCE_DURATION) {

                    button.destroy();

                }
                else {

                    newButtons.push(button);

                }
                    

            }
            world.buttons = newButtons;
            
            // Update labels
            world.resourceScoreLabel.string = world.gameParams.resources.toString();
            world.refreshDate(world);

            // Game over                        
            if (world.gameParams.totalLoss >= 100) {

                // Sort narratives by loss for comparison
                const narratives = Object.values(world.res.NARRATIVES.n2070).sort((o1, o2) => {return o2.loss - o1.loss});
                const n = narratives[0];
                const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                const message = n[cc.sys.localStorage.language][index];
                world.gameOver(world, message, "OK");

            }
            else if (world.gameParams.currentDate >= world.gameParams.targetDate) {

                let message = '';
                // Sort narratives by loss for comparison
                const narratives = Object.values(world.res.NARRATIVES.n2070).sort((o1, o2) => {return o2.loss - o1.loss});
                
                for (let i = 0; i < narratives.length; i++) {

                    const n = narratives[i];
                    if (world.gameParams.totalLoss > n.loss) {

                        const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                        message = n[cc.sys.localStorage.language][index];
                        break;

                    }

                }

                world.gameOver(world, message, "OK");

            }

            // Refresh the timeout
            world.gameParams.timeoutID = setTimeout(updateTime, 20);

        }; 

        // Run the updates in the background, so interaction is not blocked.
        // cc.async.parallel([
        //     function() {
        //         updateTime();
        //     }
        // ]);
        updateTime();

    }

    /**
     * Taken from:
     * https://docs.cocos.com/creator/manual/en/render/camera.html
     * https://gist.github.com/zhangzhibin/c515021931cfc9adb6e9bab53b51a3c1
     */
    snapshot() {

        if (!cc.sys.isBrowser)
            return;

        // This code works only on web platform. To use this features on native platform, please refer to the capture_to_native scene in example-cases.
        let node = new cc.Node();
        node.parent = cc.director.getScene().getChildByName('Canvas');
        node.zIndex = cc.macro.MAX_ZINDEX;
        let w = cc.winSize.width;
        let h = cc.winSize.height;
        node.x = w / 2;
        node.y = h / 2;
        let camera = node.addComponent(cc.Camera);
        // let camera = cc.director.getScene().getChildByName('Canvas').getChildByName('Main Camera').getComponent(cc.Camera);

        // Set the CullingMask of the screenshot you want
        camera.cullingMask = 0xffffffff;

        // Create a new RenderTexture and set this new RenderTexture to the camera's targetTexture so that the camera content will be rendered to this new RenderTexture
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        // If the Mask component is not included in the screenshot, you don't need to pass the third parameter.
        // texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;

        // Render the camera once, updating the content once into RenderTexture
        camera.render(cc.director.getScene());

        // This allows the data to be obtained from the rendertexture.
        let data = texture.readPixels();

        // Then you can manipulate the data.
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let width = canvas.width = texture.width;
        let height = canvas.height = texture.height;

        canvas.width = texture.width;
        canvas.height = texture.height;

        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow*width*4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start+i];
            }

            ctx.putImageData(imageData, 0, row);
        }

        let dataURL = canvas.toDataURL("image/jpeg");
        let img = document.createElement("img");
        img.src = dataURL;  
        
        var href = dataURL.replace(/^data:image[^;]*/, "data:image/octet-stream");
        document.location.href = href;
        
    }

    showAntarcticCities(radius) {

        let world = this.world;
        if (world.countries['AUS'] === undefined)
            return;
        let cities = world.node.getChildByName('mapFront').getChildByName('cities');
        let graphics = cities.getComponent(cc.Graphics);
        graphics.clear();
        graphics.fillColor = world.res.COLOR_GREEN;

        let hobart = world.countries['AUS'].places['Hobart'];
        let christchurch = world.countries['NZL'].places['Christchurch'];
        let capetown = world.countries['ZAF'].places['Cape Town'];
        let puntaarenas = world.countries['CHL'].places['Punta Arenas'];
        let ushuaia = world.countries['ARG'].places['Ushuaia'];

        graphics.circle(hobart.points[0] - world.node.width / 2, world.node.height - hobart.points[1] - world.res.Y_OFFSET - world.node.height / 2, radius);
        graphics.fill();
        graphics.circle(christchurch.points[0] - world.node.width / 2, world.node.height - christchurch.points[1] - world.res.Y_OFFSET - world.node.height / 2, radius);
        graphics.fill();
        graphics.circle(capetown.points[0] - world.node.width / 2, world.node.height - capetown.points[1] - world.res.Y_OFFSET - world.node.height / 2, radius);
        graphics.fill();
        graphics.circle(puntaarenas.points[0] - world.node.width / 2, world.node.height - puntaarenas.points[1] - world.res.Y_OFFSET - world.node.height / 2, radius);
        graphics.fill();
        graphics.circle(ushuaia.points[0] - world.node.width / 2, world.node.height - ushuaia.points[1] - world.res.Y_OFFSET - world.node.height / 2, radius);
        graphics.fill();

    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        
        let Y_OFFSET = 55;
        this._time = 0;
        let world = window.world = this.world = this;
        world.messageBox.opacity = 0;
        
        world.scenarioData = world.res.scenarioData;
        world.automateScripts = world.res.automateScripts;
        world.automateID = -1;
        // if (automateID !== undefined)
        //     world.automateID = automateID;
        //world.mouse = { x: 0, y: 0 };

        this.initGameParams(world.scenarioData);     
        
        if (cc.sys.localStorage.isPlaying === undefined)
            cc.sys.localStorage.isPlaying = true;
        world.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = (cc.sys.localStorage.isPlaying === "true");

        cc.loader.loadRes( 'singleColor', cc.SpriteFrame, function( err, asset) {
            
            world.singleColor = asset;

        });

        cc.loader.loadRes( 'icons/DOT_ON', cc.SpriteFrame, function( err, asset) {
            world.dotOn = asset;
            cc.loader.loadRes( 'icons/DOT_OFF', cc.SpriteFrame, function( err, asset) {
                world.dotOff = asset;

                // Initialise policy screen
                world.updateLanguageSettings();
                world.initStats();

            });
        });

        // Load policy icons
        world.policyIcons = [];
        Object.keys(world.res.res).forEach(function(r) {

            let resUrl = world.res.res[r];
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function(err, asset) {

                world.policyIcons.push(asset);

            })

        });

        world.crisisIcons = new Map<string, cc.SpriteFrame>();
        Object.keys(world.res.CRISES).forEach(function(r) {

            let resUrl = world.res.CRISES[r].image;
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function(err, asset) {

                world.crisisIcons[r] = (asset);

            })

        });

        var url = 'scripts/json-equal-greyscale';
        cc.loader.loadRes( url, ( err, res) => {

            if (err == null) {

                world.countriesJson = res.json;
                world.initCountries();            

                // loading all resource in the test assets directory
                cc.loader.loadResDir("countries", cc.SpriteFrame, function (err, assets, urls) {
                    
                    let mapBack = world.node.getChildByName('mapBack');

                    for (var i = 0; i < assets.length; i++) {
                        
                        const spriteNode = new cc.Node('Sprite ');
                        const sp = spriteNode.addComponent(cc.Sprite);
                        sp.spriteFrame = assets[i];
                        let materialVariant = cc.MaterialVariant.create(world.defaultMaterial, sp);
                        materialVariant.setProperty('u_selected', 0.0);
                        materialVariant.setProperty('u_percentageLoss', 0.0);
                        materialVariant.setProperty('u_percentagePrep', 0.0);
                        sp.setMaterial(0, materialVariant);
                        let url = urls[i];
                        let iso = url.match('/([A-Z]*)_')[1];
                        world.countryNodes[iso] = spriteNode;
                        let country = world.countries[iso];
                        if (country !== undefined) {
                            
                            spriteNode.setAnchorPoint(0.0, 0.0);
                            spriteNode.setPosition((country.offsetX) - mapBack.x, 
                                                    (cc.winSize.height - ( 1 * world.res.Y_OFFSET  ) - country.offsetY) - mapBack.y);
                            spriteNode.parent = mapBack;
                            spriteNode.zIndex = 202;
                            
                        }

                    }
            
                });

            }

        });

        // Initialise controls
        world.initControls();

        let map = world.node.getChildByName('mapFront');
        map.on(cc.Node.EventType.MOUSE_MOVE, (event) => {
            
            world.selectCountry(event, event.getLocation());
                                                
        });

        const beginSim = () => {

            world.gameParams.state = world.res.GAME_STATES.PREPARED;

            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = false;
            world.btnFF.getComponent(cc.Button).interactable = true;

            world.doSim();

        };

        let mapFront = world.node.getChildByName('mapFront');
        mapFront.on(cc.Node.EventType.MOUSE_WHEEL, (event) => {

            if (world.gameParams.modal)
                return false;
        
            const mapBack = world.node.getChildByName('mapBack');
            const delta = cc.sys.isNative ? event.getScrollY() * 6 : -event.getScrollY();
            const newScale = mapBack.scale * (1 + delta / 1000.0);
            // Calculate margins adjusted for size
            const marginX = mapBack.width / (2 / (1e-06 + newScale - 1));
            const allowance = 200;
        
            // &&  node.x < (marginX + allowance) && node.x > (-marginX - allowance)
            if (newScale <= 10.0 && newScale >= 1.0) {
                
                mapBack.setScale(newScale);
                mapFront.setScale(newScale);

            }

        }, mapFront);

        mapFront.on(cc.Node.EventType.MOUSE_MOVE, (event) => {

            if (world.gameParams.modal)
                return false;

            if (event.getButton() == cc.Event.EventMouse.BUTTON_LEFT) {
                const mapBack = world.node.getChildByName('mapBack');
                const scale = mapBack.scale;
                const size = mapBack.getContentSize();
                const scaledX = scale * size.width;
                const scaledY = scale * size.height;
                // Calculate margins adjusted for size
                const marginX = mapBack.width / (2 / (1e-06 + scale - 1));
                const marginY = -Y_OFFSET + mapBack.height / (2 / (1e-06 + scale - 1));
                const allowance = 200;

                // if (node.x + event.getDeltaX() < (marginX + allowance)  && 
                //     node.x + event.getDeltaX() > (-marginX - allowance) &&
                //     node.y + event.getDeltaY() < (marginY + allowance) && 
                //     node.y + event.getDeltaY() > (-marginY - allowance) ) {

                    mapBack.x += event.getDeltaX();
                    mapBack.y += event.getDeltaY();
                    mapFront.x += event.getDeltaX();
                    mapFront.y += event.getDeltaY();

                // }

            }

        }, map);

        let antCountries = ["NZL", "AUS", "ZAF", "ARG", "CHL"];
        let startCountry = antCountries[Math.floor(Math.random() * antCountries.length)];

        world.showMessageBox(world, 
            world.scenarioData[cc.sys.localStorage.language].popup_1_title, 
            world.scenarioData[cc.sys.localStorage.language].popup_1_description, 
            world.res.lang.start_tutorial[cc.sys.localStorage.language], (that) => {

                world.gameParams.tutorialMode = true;
                world.gameParams.startCountry = startCountry;
                // world.gameParams.startCountry = keys[Math.floor(Math.random() * keys.length)]
                world.gameParams.statsCountry = startCountry;
                world.gameParams.currentCountry = startCountry;
                const countryName = world.countries[world.gameParams.startCountry].name;
                
                world.showMessageBox(world, 
                    world.res.lang.start_prepare[cc.sys.localStorage.language], 
                    world.res.lang.start_mission_a[cc.sys.localStorage.language]  + 
                    countryName + 
                    world.res.lang.start_mission_b[cc.sys.localStorage.language], 
                    world.scenarioData[cc.sys.localStorage.language].popup_2_title, 
                    (that) => {
                    
                        beginSim();

                }, undefined, undefined);

            },

            world.res.lang.start_tutorial_skip[cc.sys.localStorage.language], (that) => {

                world.gameParams.tutorialMode = false;
                world.gameParams.startCountry = startCountry;
                // world.gameParams.startCountry = keys[Math.floor(Math.random() * keys.length)]
                world.gameParams.statsCountry = startCountry;
                world.gameParams.currentCountry = startCountry;
                const countryName = world.countries[world.gameParams.startCountry].name;

                world.showMessageBox(world, 
                    world.res.lang.start_prepare[cc.sys.localStorage.language], 
                    world.res.lang.start_mission_a[cc.sys.localStorage.language]  + 
                    countryName + 
                    world.res.lang.start_mission_b[cc.sys.localStorage.language], 
                    world.scenarioData[cc.sys.localStorage.language].popup_2_title, 
                    (that) => {

                        beginSim();

                    }, undefined, undefined);
            }
        );        
    }

    start () {

        if (cc.sys.localStorage.isPlaying == undefined)
            cc.sys.localStorage.isPlaying = true;
        
        this.currentAudioId = cc.audioEngine.play(this.audio, true, 0.5);
        let time = cc.audioEngine.getDuration(this.currentAudioId);
        let start = Math.floor(Math.random() * time);
        cc.audioEngine.setCurrentTime(this.currentAudioId, start);
        if (cc.sys.localStorage.isPlaying != "true" )
            cc.audioEngine.pauseAll();
        
    }

    onDestroy() {
        
        cc.audioEngine.stop(this.currentAudioId);

    }

    update (dt) {

        let world = this.world;

        this._time += dt;

        if (world.countryNodes !== undefined) {

            Object.keys(world.countryNodes).forEach((key) => {

                let countryNode = world.countryNodes[key];
                let country = world.countries[key];
                if (country !== undefined) {

                    let mv = countryNode.getComponent(cc.Sprite).materials[0];
                    mv.setProperty('u_selected', (country.selected ? 1.0 : 0.0));
                    mv.setProperty('u_percentageLoss', country.loss);
                    mv.setProperty('u_percentagePrep', country.pop_prepared_percent);

                }
    
            });

        }

        let radius = 3 * ((this._time * 3) % 3);
        world.showAntarcticCities(radius);
        
    }
}
