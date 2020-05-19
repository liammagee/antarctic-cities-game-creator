// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,


    properties: {
        defaultMaterial: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Material, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        messageBox: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        topBar: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        singleColor: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteFrame, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        buttonWhite: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteFrame, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        buttonGrey: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteFrame, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        titleFont: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Font, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        bodyFont: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Font, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        map: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.TiledMap, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        backgroundGreyscale: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        backgroundColour: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        material: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Material, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        sortedObjs: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            serializable: true,   // optional, default is true
        },
        gameParams: {
            // ATTRIBUTES:
            default: {},        // The default value will be used only when the component attaching
                                  // to a node for the first time
            serializable: true,   // optional, default is true
        },

    },

    world: this,
    _time: 0,

    /**
     * Tests whether a point is inside the points that outline a given geometric shape.
     */
    collisionDetection(points,test) {

        let crossed = false;
        let times = 0;
        
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

                    times++;
                    crossed = !crossed;

                }

            }

        }

        return crossed;
        
    },


    /**
     * Returns an array of points associated with a country.
     */
    pointArray(world, name) {

        return world.countriesJson[name].points;

    },
    

    /**
     * Generates min, max coordinates
     */
    extremes(world, name) {
        
        let pa = this.pointArray(world, name);
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

    },


    regionalArea(world, points) {
        
        let area = 0;

        for (let j = 0; j < points.length - 1; j++) {

            let pt1 = points[j];
            let pt2 = points[j + 1];
            let xy1 = pt1.x * pt2.y;
            let xy2 = pt1.y * pt2.x;
            area += Math.abs(xy1 - xy2);

        }

        return area / 2;

    },

    /*
     * Gauss shoelace algorithm - https://gamedev.stackexchange.com/questions/151034/how-to-compute-the-area-of-an-irregular-shape
     */
    areas(world, name) { 

        let pa = this.pointArray(world, name);
        let area = 0;
        
        for (let i = 0; i < pa.length; i++) {

            let p = pa[i];
            area += this.regionalArea(world, p);

        }

        return area;

    },

    /**
     * Create country centroids.
     */
    centroids(world, name) { 

        let pa = this.pointArray(world, name);
        let lastArea = 0, thisArea = 0;
        let regionID = -1;

        for (let i = 0; i < pa.length; i++) {
        
            let p = pa[i];
            thisArea = this.regionalArea(world, p);
        
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

        return { x: totalX / points.length, y: totalY / points.length }

    },

    initCountries() { 
        let world = this;

        world.countries = Object.values(world.countriesJson).reduce((map, obj) => {  

                if (!map[obj.iso_a3]) {

                map[obj.iso_a3] = {

                    name: obj.name,
                    points: this.pointArray(world, obj.iso_a3),
                    extremes: this.extremes(world, obj.iso_a3),
                    centroid: this.centroids(world, obj.iso_a3),
                    area: this.areas(world, obj.iso_a3),
                    
                    affected_chance: 1.0,
                    pop_est: parseInt(obj.pop_est),
                    pop_aware: 0,
                    pop_aware_percent: 0,
                    pop_prepared: 0,
                    pop_prepared_percent: 0,

                    gdp_est: parseInt(obj.gdp_md_est),
                    gid: 1,
                    iso_a2: obj.iso_a2,
                    iso_a3: obj.iso_a3,
                    subregion: obj.subregion,
                    economy: obj.economy,
                    income_grp: obj.income_grp,
                    income_grp_num: parseInt(obj.income_grp.charAt(0)),
                    equator_dist: obj.equatorDist,
                    offsetX: obj.offsetX,
                    offsetY: obj.offsetY,

                    policy: 0,
                    previousLoss: gameParams.previousLoss,
                    loss: gameParams.previousLoss,
                    neighbours: [],
                    points_shared: 0,
                    points_total: 0,
                    shared_border_percentage: 0,
                    policyPoints: [],
                    policyDots: [],
                    destructionPoints: [],
                    destructionDots: [] ,
                    selected: false   
                };

            } 

            return map; 

        }, {});

        /**
         * Sorts objects by their relative screen position, to avoid overlapping tiles.
         */
        world.sortedObjs = Object.values(world.countries).sort((a, b) => { 

            return (a.points[0].y * cc.winSize.height + a.points[0].x) > (b.points[0].y * cc.winSize.height + b.points[0].x);  

        });



        // Add proportion of main land mass with shared borders
        let allPoints = {};
        Object.keys(world.countries).forEach(k => {
            
            var c = world.countries[k];
            
            c.points.forEach(function(p) {
            
                var pStr = p.x +"-"+p.y;

                if (allPoints[pStr]) {
            
                    allPoints[pStr].push(c.iso_a3);
            
                }
                else {
            
                    allPoints[pStr] = [c.iso_a3];
            
                }
            
            });

        });

                
        Object.keys(allPoints).forEach(function(k) {

            var countries = allPoints[k];

            countries.forEach(function(c1) {

                var country = world.countries[c1];
                countries.forEach(function(c2) {

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


        Object.keys(world.countries).forEach(function(c) {
        
            var country = world.countries[c];
            country.shared_border_percentage = country.points_shared / country.points_total;
            
            if (country.shared_border_percentage > 1.0) {

                country.shared_border_percentage = 1.0;
                
            }

        });
        

        // Add population density
        Object.keys(world.countries).forEach(function(c) { 
        
            var country = world.countries[c];
            country.density = country.pop_est / country.area;

        } );

        world.areaMin = 0;
        world.areaMax = 0;
        world.areaMean = 0;
        world.areaMinCountry = "";
        world.areaMaxCountry = "";
        
        Object.keys(world.countries).forEach(function(c) {

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

        Object.keys(world.countries).forEach(function(c) {

            var country = world.countries[c];
            // Change the power for more or less points
            country.numPoints = Math.ceil(Math.pow(country.area / world.areaMean, 2));

        });

        // Add world populations
        gameParams.populationWorld = Object.keys(world.countries).map(function(c) { 
            return world.countries[c].pop_est; 
        }).reduce(function(a, c) {
            return a + parseInt(c);
        }, 0);

    },

    /**
     * Initialises the game parameters.
     */
    initGameParams(scenarioData) {

        if (cc.sys.localStorage.language === undefined) 
            cc.sys.localStorage.language = 'eng';
        if (cc.sys.localStorage.level === undefined) 
            cc.sys.localStorage.level = 'Easy';

        gameParams = {};
        // Set options here
        gameParams.level = cc.sys.localStorage.level;
        gameParams.language = cc.sys.localStorage.language;
        gameParams.greyscale = cc.sys.localStorage.greyscale;
        // Game play options
        gameParams.difficultyMultiplier = 1.0;
        if (gameParams.level === "Medium")
            gameParams.difficultyMultiplier = 2.0;
        else if (gameParams.level === "Hard")
            gameParams.difficultyMultiplier = 3.0;
        gameParams.state = GAME_STATES.INITIALISED;
        gameParams.modal = false;
        gameParams.startDate = new Date(Date.now());
        gameParams.startDate.setDate(1);
        gameParams.startDate.setMonth(scenarioData.start_month);
        gameParams.startDate.setYear(scenarioData.start_year);
        gameParams.targetDate = new Date(Date.now());
        gameParams.targetDate.setDate(1);
        gameParams.targetDate.setMonth(scenarioData.target_month);
        gameParams.targetDate.setYear(scenarioData.target_year);
        gameParams.previousDate = gameParams.startDate;
        gameParams.currentDate = gameParams.startDate;
        gameParams.counter = 0;
        gameParams.lastResource = 0;
        // First crisis will take twice as long
        gameParams.lastCrisis = CRISIS_INTERVAL_MULTIPLIER;
        gameParams.crises = [];
        gameParams.crisisCountry = null;
        gameParams.crisisCount = 0;
        gameParams.policies = {};
        gameParams.policy = 0;
        gameParams.countriedAffected = 0;
        gameParams.populationAware = 0;
        gameParams.populationPrepared = 0;
        gameParams.populationAwarePercent = 0;
        gameParams.populationPreparedPercent = 0;
        gameParams.resources = scenarioData.starting_resources;
        gameParams.alertResources = false;
        gameParams.alertCrisis = false;
        gameParams.resourcesAdded = false;
        gameParams.previousLoss = scenarioData.threat_details.starting_conditions.starting_loss;
        gameParams.rateOfLoss = scenarioData.threat_details.advanced_stats.loss_increase_speed;
        gameParams.minimumLoss = scenarioData.threat_details.advanced_stats.minimum_loss_increase;
        gameParams.totalLoss = 0;
        gameParams.scenarioName = scenarioData[cc.sys.localStorage.language].name;
        gameParams.messagesNegative = scenarioData[cc.sys.localStorage.language].messages.negative;
        gameParams.messagesPositive = scenarioData[cc.sys.localStorage.language].messages.positive;
        gameParams.messageOverride = null;
        gameParams.tutorialMode = false;
        gameParams.tutorialHints = [];
        gameParams.stats = {};

        // Shader options
        gameParams.shader = {};
        if (cc.sys.isMobile) {
            gameParams.shader.u_cellSize = 1.0;
            gameParams.shader.u_randFactor = 0.5;
            gameParams.shader.u_randAlpha = 0.3;
            gameParams.shader.u_sizePower = 4.0;
            gameParams.shader.u_sizeMultiplier = 1.0;
            gameParams.shader.u_stepMin = 0.9;
            gameParams.shader.u_stepMax = 1.0;
            gameParams.shader.u_borderRadius = 10.0;
        }
        else {
            gameParams.shader.u_cellSize = 10.0;
            gameParams.shader.u_randFactor = 0.5;
            gameParams.shader.u_randAlpha = 0.3;
            gameParams.shader.u_sizePower = 4.0;
            gameParams.shader.u_sizeMultiplier = 1.0;
            gameParams.shader.u_stepMin = 0.9;
            gameParams.shader.u_stepMax = 1.0;
            gameParams.shader.u_borderRadius = 10.0;
        }

        // Obtain automation setting from parent
        if (world.automateID > -1) {

            gameParams.automateMode = true;
            gameParams.automateScript = automateScripts[world.automateID - 1];
            console.log("Running " + gameParams.automateScript.name);

        }

        this.updateTimeVars(MONTH_INTERVAL);
        this.calculatePolicyConnections();
        
    },

    /**
     * Update time variables.
     */
    updateTimeVars(interval) {

        gameParams.timeInterval = interval;
        gameParams.tutorialInterval = gameParams.timeInterval * TUTORIAL_INTERVAL_MULTIPLIER;
        gameParams.resourceInterval = gameParams.timeInterval * RESOURCE_INTERVAL_MULTIPLIER; 
        gameParams.crisisInterval = gameParams.timeInterval * CRISIS_INTERVAL_MULTIPLIER;

    },

    /**
     * Sets up game parameters at the start of play
     */
    calculatePolicyConnections() {

        gameParams.policyOptions = {};
        let policyLen = 0;
    
        Object.keys(RESOURCES).forEach(key => {
    
            RESOURCES[key].policyOptions.forEach(pol => {
    
                gameParams.policyOptions[pol.id] = pol;
                if (policyLen < pol.id)
                    policyLen = pol.id;
    
            });
        });
        
        gameParams.policyRelations = {};
        
        for (let i = 0; i < policyLen; i++){
    
            const source = gameParams.policyOptions[i+1];
            gameParams.policyRelations[source.id] = {};
    
            for (let j = i + 1; j < policyLen; j++){
    
                const target = gameParams.policyOptions[j+1];
                if (gameParams.policyRelations[target.id] === undefined)
                    gameParams.policyRelations[target.id] = {};
                
                const val = RESOURCE_MATRIX[j][i];
                const rel = RESOURCE_RELATIONS[j][i];
                gameParams.policyRelations[source.id][target.id] = val;
                
                if (rel == 1) {
    
                    gameParams.policyRelations[target.id][source.id] = val;
    
                }
    
            }
    
        }
    
    },

    /**
     * Sets up game parameters at the start of play
     */
    startGameParams() {
        
        gameParams.state = GAME_STATES.STARTED;

    },

    

    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showMessageBox(parent, title, message, prompt1, callback1, prompt2, callback2) {

        gameParams.modal = true;
        gameParams.state = GAME_STATES.PAUSED;

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
        if (message === null || typeof(message) === "undefined" || message === "") {
        
            if (prompt2 !== undefined) {

                btn1.node.x = -0.25 * world.messageBox.width;
                btn2.node.x = 0.25 * world.messageBox.width;
                btn2.node.opacity = 255;
                btn2.interactable = true;
                btn2.enabled = true;
                buttons.push(btn2);

            }
            else {

                btn1.x = 0.0 * world.messageBox.width;
                btn2.node.opacity = 0;
                btn2.interactable = false;
                btn2.enabled = false;
                
            }
        }
        else {

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

        let btn1Func = function(event) {

            world.messageBox.opacity = 0;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            gameParams.modal = false;
            callback1();
            event.stopPropagation();


        };
        btn1.node.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = function(event) {

            world.messageBox.opacity = 0;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            gameParams.modal = false;
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

    },


    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showQuizBox(parent, title, message, wrongAnswer, rightAnswer) {

        gameParams.modal = true;
        gameParams.state = GAME_STATES.PAUSED;

        world.quizBox.opacity = 255;
        world.quizBox.zIndex = 103;

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
            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            gameParams.modal = false;
            event.stopPropagation();

            world.showMessageBox(parent, "CRISIS RESPONSE", "Great response to this crisis!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                gameParams.resources += res;

                gameParams.state = GAME_STATES.STARTED;

            });

        };
        btn1.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = function(event) {

            world.quizBox.opacity = 0;
            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            gameParams.modal = false;
            event.stopPropagation();

            world.showMessageBox(parent, "CRISIS RESPONSE", "Good try, but this won't be enough to preserve the future of Antarctica!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                if (gameParams.resources - res > 0)
                    gameParams.resources -= res;
                else
                    gameParams.resources = 0;
                
                gameParams.state = GAME_STATES.STARTED;


            });

        };
        btn2.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

        buttons.push(btn1);
        buttons.push(btn2);
        
        return buttons;

    },


    /**
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showSettingsBox(parent) {

        gameParams.modal = true;
        gameParams.state = GAME_STATES.PAUSED;

        world.settingsBox.opacity = 255;
        world.settingsBox.zIndex = 104;

        let btn1 = world.settingsBox.getChildByName("apply");
        let btn2 = world.settingsBox.getChildByName("cancel");
        let gs = (cc.sys.localStorage.greyscale == 'true')
        world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = gs;
        world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !gs;

        let btn1Func = function(event) {

            let gsChecked = world.settingsBox.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;

            cc.sys.localStorage.greyscale = gsChecked;
            gameParams.greyscale = gsChecked;

            if (gsChecked) {
                world.backgroundGreyscale.opacity = (255);
                world.backgroundColour.opacity = (0);
            }
            else {
                world.backgroundGreyscale.opacity = (0);
                world.backgroundColour.opacity = (255);
            }
            
            gameParams.state = GAME_STATES.STARTED;
            world.settingsBox.opacity = 0;
        };
        btn1.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
        
        let btn2Func = function(event) {

            world.settingsBox.opacity = 0;
            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            gameParams.modal = false;
            event.stopPropagation();
            gameParams.state = GAME_STATES.STARTED;

        };
        btn2.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

    },


    /**
     * Post data to server
     * @param {*} parent 
     * @param {*} message 
     * @param {*} prompt 
     */
    postResultsToServer() {

        // Test posting data
        const xhr = cc.loader.getXMLHttpRequest();

        xhr.open("POST", "http://43.240.98.94/game_data");
        // xhr.open("POST", "http://localhost:8000/game_data");

        // Set Content-type "text/plain;charset=UTF-8" to post plain text
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        const gameLog = Object.assign({}, gameParams, { 

            policyOptions: undefined,
            policyRelations: undefined,
            messagesNegative: undefined,
            messagesPositive: undefined,
            timeoutID: undefined,
            tutorialHints: undefined,
            tutorialInterval: undefined,

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
                gid: undefined, 
                gdp: undefined, 
                extremes: undefined, 
                equator_dist: undefined, 
                centroid: undefined, 
                area: undefined, 
                density: undefined, 
                economy: undefined
    
        }) });
        
        gameLog.countries = countries;
        
        cc.log(JSON.stringify(gameLog))
        xhr.send(JSON.stringify(gameLog));

    },


    /**
     * Game over dialog
     * @param {*} parent 
     * @param {*} message 
     * @param {*} prompt 
     */
    gameOver(parent, message, prompt) {
        
        world.postResultsToServer();

        // parent.pauseAllActions(); 
        window.clearTimeout(gameParams.timeoutID );
        gameParams.state = GAME_STATES.PAUSED;
        
        world.showMessageBox(parent, "Game Over", message, prompt, function() {

            initGameParams(world.scenarioData);
            gameParams.state = GAME_STATES.GAME_OVER;
            gameParams.startCountry = null;
            gameParams.policies = {};
            world.tweetLabel.string = (gameParams.scenarioName);
            // world.tweetLabel.attr({ x: world.tweetBackground.width / 2, width: world.tweetBackground.width });
            // world.tweetAlertLabel.attr({ x: world.tweetLabel.x });

            cc.director.runScene(new SelectOptionsScene());
            //cc.director.runScene(new LoadingScene());

        });

    },

    /**
     * A common function for adding mouse/touch events.
     */
    handleMouseTouchEvent(target, callback) {

        if (cc.sys.isMobile) {

            target.on(cc.Node.EventType.TOUCH_BEGAN, function ( event ) {
            
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

    },

    initControls()  {

        // Convenience variables
        world.btnQuit = world.topBar.getChildByName("btnQuit");
        world.btnSettings = world.topBar.getChildByName("btnSettings");
        world.btnSound = world.topBar.getChildByName("btnSound");
        world.btnPause = world.topBar.getChildByName("btnPause");
        world.btnPlay = world.topBar.getChildByName("btnPlay");
        world.btnFF = world.topBar.getChildByName("btnFF");
        world.tweetLabel = world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet");
        world.bottomBar = cc.director.getScene().getChildByName("layout").getChildByName("bottomBar");
        world.countryLabel = world.bottomBar.getChildByName("lblCountry").getComponent(cc.Label);
        world.countryLoss = world.bottomBar.getChildByName("lblLossPercent").getComponent(cc.Label);
        world.countryLossProgress = world.bottomBar.getChildByName("progressBarLoss").getComponent(cc.ProgressBar);
        world.countryAwarePrepared = world.bottomBar.getChildByName("lblPreparednessPercent").getComponent(cc.Label);
        world.countryPreparedProgress = world.bottomBar.getChildByName("progressBarPreparedness").getComponent(cc.ProgressBar);
        world.resourceScoreLabel = cc.director.getScene().getChildByName("resourceScoreBackground").getChildByName("lblResourceScore").getComponent(cc.Label);
        world.quizBox = cc.director.getScene().getChildByName("layerQuizBox");
        world.settingsBox = cc.director.getScene().getChildByName("layerSettings");

        // Handlers
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnQuit"), function() {
            gameParams.state = GAME_STATES.PAUSED;

            world.showMessageBox(world.node.parent, "Quit Game", "", 
                "Quit Game", () => {
                
                    world.postResultsToServer();

                    gameParams.state = GAME_STATES.GAME_OVER;
                    // cc.director.runScene(new LoadingScene());
                    cc.director.runScene(new SelectOptionsScene());

                }, 
                "Return to Game", () => {

                    gameParams.state = GAME_STATES.STARTED;

                });            
        });
        world.topBar.getChildByName("btnSettings").on(cc.Node.EventType.TOUCH_END, function() {

            gameParams.state = GAME_STATES.PAUSED;

            world.showSettingsBox(world.node.parentπ);

        }, this);

        world.handleMouseTouchEvent(world.topBar.getChildByName("btnSound"), function() {
            gameParams.state = GAME_STATES.PAUSED;

            world.showMessageBox(world.node.parent, "Sound", "Not yet implemented", 
                "OK", () => {
                
                    gameParams.state = GAME_STATES.STARTED;

                });

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPause"), function() {

            gameParams.state = GAME_STATES.PAUSED;
            world.btnPause.getComponent(cc.Button).interactable = false;
            world.btnPlay.getComponent(cc.Button).interactable = true;
            world.btnFF.getComponent(cc.Button).interactable = true;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).pause();

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPlay"), function() {
            
            world.updateTimeVars(MONTH_INTERVAL);
            gameParams.state = GAME_STATES.STARTED;
            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = false;
            world.btnFF.getComponent(cc.Button).interactable = true;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).play();

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnFF"), function() {

            world.updateTimeVars(MONTH_INTERVAL_FF);
            gameParams.state = GAME_STATES.STARTED;
            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = true;
            world.btnFF.getComponent(cc.Button).interactable = false;
            world.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).play();

        });


        let btnDesignPolicy = world.node.getChildByName("bottomBar").getChildByName("btnDesignPolicy");
        let btnStats = world.node.getChildByName("bottomBar").getChildByName("btnStats");
        let designPolicy = cc.director.getScene().getChildByName("layerDesignPolicy");
        let resourceScore = cc.director.getScene().getChildByName("resourceScoreBackground");
        let stats = cc.director.getScene().getChildByName("layerStats");
        let messageBox = cc.director.getScene().getChildByName("layerMessageBox");


        // Add handling for bottom bar buttons
        btnDesignPolicy.on(cc.Node.EventType.TOUCH_END, function() {
            
            gameParams.state = GAME_STATES.PAUSED;
            designPolicy.zIndex = 105;
            resourceScore.zIndex = 106;
            let layerDesignPolicy = cc.director.getScene().getChildByName("layerDesignPolicy");
            let policyLabel = layerDesignPolicy.getChildByName("policyLabel");
            let policyDescription = layerDesignPolicy.getChildByName("policyDescription");
            let policyCostLabel = layerDesignPolicy.getChildByName("policyCostLabel");
            let btnPolicyInvest = layerDesignPolicy.getChildByName("btnPolicyInvest");
            
            policyLabel.opacity = 0;
            policyLabel.getComponent(cc.Label).string = "<< Select";
            policyDescription.opacity = 255;
            const policyGeneralLabel = gd.lang.policy_platform_hint[cc.sys.localStorage.language];
            policyDescription.getComponent(cc.Label).string = policyGeneralLabel;
            policyCostLabel.opacity = 0;
            btnPolicyInvest.getComponent(cc.Button).interactable = true;
            btnPolicyInvest.opacity = 0;
    
        });
        let btnDesignPolicyQuit = designPolicy.getChildByName("btnDesignPolicyQuit");
        btnDesignPolicyQuit.on(cc.Node.EventType.TOUCH_END, function() {
            gameParams.state = GAME_STATES.STARTED;
            designPolicy.zIndex = -1;
            resourceScore.zIndex = 101;
        }, btnDesignPolicyQuit);

        btnStats.on(cc.Node.EventType.TOUCH_END, function() {
            
            gameParams.state = GAME_STATES.PAUSED;
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
            page1.getChildByName("lblYear").getComponent(cc.Label).string = gd.lang.stats_year[cc.sys.localStorage.language] + gameParams.currentDate.getFullYear();
            page1.getChildByName("lblYearMessage").getComponent(cc.Label).string = gd.lang.stats_year_message_a[cc.sys.localStorage.language] + (gameParams.targetDate.getFullYear() - gameParams.currentDate.getFullYear()) + gd.lang.stats_year_message_b[cc.sys.localStorage.language];
            page1.getChildByName("lblLoss").getComponent(cc.Label).string = gd.lang.stats_loss[cc.sys.localStorage.language];
            page1.getChildByName("lblLossMessage").getComponent(cc.Label).string = gd.lang.stats_loss_message_a[cc.sys.localStorage.language] + gameParams.startDate.getFullYear() + gd.lang.stats_loss_message_b[cc.sys.localStorage.language] + makeString(gameParams.totalLoss) + ".";
            page1.getChildByName("lblPreparedness").getComponent(cc.Label).string = gd.lang.stats_preparedness[cc.sys.localStorage.language] + makeString(gameParams.populationPreparedPercent) + " / " + Math.round(gameParams.populationPrepared / 1000000) + "M";
            let pd = gd.lang.stats_preparedness_message_a[cc.sys.localStorage.language] + makeString(gameParams.populationPreparedPercent) + gd.lang.stats_preparedness_message_b[cc.sys.localStorage.language];
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
            //.getChildByName("itemCountry").getComponent(cc.Label).string = txtCountry;

            let counter = 0;
            countriesSorted.forEach((country) => {
                counter++;
                let color = country.loss > 20 ? COLOR_DESTRUCTION_POINTS : (country.pop_prepared_percent > 20 ? COLOR_POLICY_POINTS : COLOR_ICE);

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
            // console.log(txtCountry);
            // page2.getChildByName("scrollview").getChildByName("view").getChildByName("content").getChildByName("itemCountry").getComponent(cc.Label).string = txtCountry;
            // page2.getChildByName("scrollview").getChildByName("view").getChildByName("content").getChildByName("itemLoss").getComponent(cc.Label).string = txtLoss;
            // page2.getChildByName("scrollview").getChildByName("view").getChildByName("content").getChildByName("itemPreparedness").getComponent(cc.Label).string = txtPreparedness;

            // Trends
            let drawNode = page3.getChildByName("graph");
            let graphics = drawNode.getComponent(cc.Graphics);
            graphics.clear();
            drawNode.destroyAllChildren();
            
            let x_o = 0, yP_o = 0, yL_o = 0, x = 0, yP = 0, yL = 0;
            const colorD =  new cc.Color(COLOR_DESTRUCTION_POINTS.r, 
                                        COLOR_DESTRUCTION_POINTS.g, 
                                        COLOR_DESTRUCTION_POINTS.b);
            const colorP =  new cc.Color(COLOR_POLICY_POINTS.r, 
                                        COLOR_POLICY_POINTS.g, 
                                        COLOR_POLICY_POINTS.b);

            const graphX = 4;
            const graphY = 0;
            const years = gameParams.targetDate.getFullYear() - gameParams.startDate.getFullYear();
            let scaleFactor = 0.9;
            const graphIncrementX = page3.width * scaleFactor / years;
            const graphIncrementY = page3.height * scaleFactor / 100;
            const graphOffset = 0;
            const lineOffset = -10;    
            drawSegment(new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX + page3.width * scaleFactor, graphOffset + lineOffset), 1, COLOR_ICE);
            drawSegment(new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX, graphOffset + page3.height * scaleFactor), 1, COLOR_ICE);
    
            for (let i = gameParams.startDate.getFullYear(); i < gameParams.targetDate.getFullYear(); i++) {
    
                const index = i - gameParams.startDate.getFullYear();

                const stats = gameParams.stats[i];

                if (stats === undefined)
                    continue;
    
                const loss = stats.loss;
                const prepared = stats.prepared;
                x = graphX + index * graphIncrementX;
                yL = graphOffset + (100 - Math.round(loss)) * graphIncrementY;
                yP = graphOffset + Math.round(prepared) * graphIncrementY;
    
                if (index > 0) {
    
                    // Line 
                    // drawNode.drawSegment(cc.p(x_o, yL_o), cc.p(x, yL), 2, COLOR_DESTRUCTION_POINTS);
                    // drawNode.drawSegment(cc.p(x_o, yP_o), cc.p(x, yP), 2, COLOR_POLICY_POINTS);
    
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
            lblDestructionScore.string = makeString(gameParams.totalLoss);
            lblDestructionScore.font = world.titleFont;
            lblDestructionScore.fontSize = 28;
            lblDestructionScoreNode.color = colorD;
            lblDestructionScoreNode.setPosition(4 + graphX + x, graphY + yL);
            lblDestructionScoreNode.setAnchorPoint(0, 0.5);
            lblDestructionScoreNode.parent = drawNode;
            lblDestructionScoreNode.zIndex = 106;
            let lblPolicyScoreNode = new cc.Node();
            let lblPolicyScore = lblPolicyScoreNode.addComponent(cc.Label);
            lblPolicyScore.string = makeString(gameParams.populationPreparedPercent);
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
            
            gameParams.state = GAME_STATES.STARTED;
            stats.zIndex = -1;

        }, btnStatsQuit);

        // Set ordering
        stats.zIndex = -1;
        
    },

    initPolicyDesign() {

        let layerDesignPolicy = cc.director.getScene().getChildByName("layerDesignPolicy");
        let pageView = layerDesignPolicy.getChildByName("pageview").getComponent(cc.PageView);
        let resourceScoreLabel = cc.director.getScene().getChildByName("resourceScoreBackground").getChildByName("lblResourceScore").getComponent(cc.Label);

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
        btnEconomy.getChildByName("Label").color = COLOR_UMBER;

        let allButtons = [btnEconomy, btnPolitics, btnCulture, btnEcology];
        let prevButton = btnEconomy;
        let policyButtons = [];

        const costCalculation = (policySelected) => {
            
            let policyLevel = gameParams.policies[policySelected.id];
            let cost = policySelected.cost_1;

            if (policyLevel !== undefined) {

                switch(policyLevel) {
                    case 1:
                        cost = policySelected.cost_2;
                        break;
                    case 2:
                        cost = policySelected.cost_3;
                        break;
                    case 3:
                        cost = 0;
                        break;
                }

            }

            let dists = world.generateResourceDistribution();
            let policyCategory = Math.floor((policySelected.id - 1) / 4);
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

            policySelected = null;
            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {
                
                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = COLOR_ICE;

            }
            
            prevButton = btn;

            policyLabel.opacity = 0;
            const policyGeneralLabel = gd.lang.policy_platform_hint[cc.sys.localStorage.language];
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
                btn.getChildByName("Label").color = COLOR_UMBER;
                prevButton = btn;
            
            }
            
            return btn;

        };
        btnPolicyInvest.on(cc.Node.EventType.TOUCH_END,  () => {

            const cost = costCalculation(policySelected);

            if (gameParams.resources - cost >= 0 && 
                gameParams.policies[policySelected.id] === undefined) {

                gameParams.resources -= cost;  
                gameParams.policies[policySelected.id] = 1;
                policySelectedButton.enabled = false;
                resourceScoreLabel.string = (gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 1].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 1].color = COLOR_UMBER;

            }
            else if (gameParams.resources - cost >= 0 && 
                gameParams.policies[policySelected.id] === 1) {

                gameParams.resources -= cost;  
                gameParams.policies[policySelected.id] = 2;
                policySelectedButton.enabled = false;
                resourceScoreLabel.string = (gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 2].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 2].color = COLOR_UMBER;

            }
            else if (gameParams.resources - cost >= 0 && 
                gameParams.policies[policySelected.id] == 2) {

                gameParams.resources -= cost;  
                gameParams.policies[policySelected.id] = 3;
                policySelectedButton.enabled = false;
                resourceScoreLabel.string = (gameParams.resources.toString());
                levelButtons[policySelected.id * 100 + 3].getComponent(cc.Sprite).spriteFrame = world.dotOff;
                levelButtons[policySelected.id * 100 + 3].color = COLOR_UMBER;

            }

            let newCost = costCalculation(policySelected);
            policyCostLabel.getComponent(cc.Label).string = (gd.lang.policy_platform_cost[cc.sys.localStorage.language] + newCost.toString());

            if (gameParams.policies[policySelected.id] == 3) {

                btnPolicyInvest.getComponent(cc.Button).interactable = false;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (gd.lang.policy_platform_completed[cc.sys.localStorage.language]);

            }
            else if (newCost <= gameParams.resources) {

                btnPolicyInvest.getComponent(cc.Button).interactable = true;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (gd.lang.policy_platform_invest[cc.sys.localStorage.language]);

            }
            else {

                btnPolicyInvest.getComponent(cc.Button).interactable = false;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (gd.lang.policy_platform_more_resources[cc.sys.localStorage.language]);

            }

        }, this);
        Object.values(RESOURCES).forEach((res, index) => {
            
            let btn = makeButton(res[cc.sys.localStorage.language].name, new cc.Vec2(300 + 200 * index, 80), index);
            //allButtons.push(btn);
        
        });

        const pageCount = 4;
        const levelButtons = {};
       
        for (let i = 0; i < pageCount; ++i) {

            let resourceGrp = RESOURCES[Object.keys(RESOURCES)[i]];
            let xLoc = 0, yLoc = 0, policyOptionCounter = 0; 
            let page = pageView.node.getChildByName("view").getChildByName("content").children[i];

            for (let j = 0; j < resourceGrp.policyOptions.length; j++) {

                let opt = resourceGrp.policyOptions[j];
                
                xLoc = (policyOptionCounter % 2) * page.width / 2;
                yLoc = (1 - Math.floor(policyOptionCounter / 2)) * page.height / 2;
                policyOptionCounter++;

                const optNode = new cc.Node();
                optNode.setAnchorPoint(cc.Vec2(0.0, 0.0));
                optNode.parent = page;
                optNode.setPosition(xLoc, yLoc);
                optNode.setContentSize(cc.size(page.width / 3, page.height / 3));

                const btnNodeBgd = new cc.Node();
                btnNodeBgd.setAnchorPoint(cc.Vec2(0, 0));
                btnNodeBgd.setContentSize(cc.size(104, 104));
                btnNodeBgd.setPosition(50, 50);
                btnNodeBgd.parent = optNode;
                btnNodeBgd.color = COLOR_ICE;
                cc.loader.loadRes(opt.img_normal, cc.SpriteFrame, function (err, sfNormal) {
                    const btnBgd = btnNodeBgd.addComponent(cc.Sprite);
                    btnBgd.materials = [world.defaultMaterial];
                    btnBgd.spriteFrame = sfNormal;
                });

                optNode.cost_1 = opt.cost_1;
                optNode.cost_2 = opt.cost_2;
                optNode.cost_3 = opt.cost_3;
                optNode.option = opt;
                optNode.enabled = true;

                if (gameParams.policies[opt.id] !== undefined) {
                    optNode.enabled = false;
                }

                let btnLabelNode = new cc.Node();
                btnLabelNode.name = "Label";
                btnLabelNode.color = COLOR_ICE;
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

                    policySelected = optNode.option;
                    policyLabel.getComponent(cc.Label).string = (policySelected[cc.sys.localStorage.language].text_long);
                    policyDescription.getComponent(cc.Label).string = (policySelected[cc.sys.localStorage.language].description);
                    
                    const cost = costCalculation(policySelected);
                    policyCostLabel.getComponent(cc.Label).string = gd.lang.policy_platform_cost[cc.sys.localStorage.language] + cost.toString();

                    if (gameParams.policies[opt.id] == 3) {

                        btnPolicyInvest.getComponent(cc.Button).interactable = false;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = gd.lang.policy_platform_completed[cc.sys.localStorage.language];

                    }
                    else if (cost <= gameParams.resources) {

                        btnPolicyInvest.getComponent(cc.Button).interactable = true;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = gd.lang.policy_platform_invest[cc.sys.localStorage.language];

                    }
                    else {

                        btnPolicyInvest.getComponent(cc.Button).interactable = false;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = gd.lang.policy_platform_more_resources[cc.sys.localStorage.language];

                    }

                    policySelectedButton = optNode;

                    policyLabel.opacity = 255;
                    policyDescription.opacity = 255;
                    policyCostLabel.opacity = 255;
                    btnPolicyInvest.opacity = 255;

                };

                const enterBtn = function(event) {
                    // if (!optNode.enabled)
                    //     return;
                    btnNodeBgd.color = COLOR_UMBER;
                    btnLabelNode.color = COLOR_UMBER;
                };
                const exitBtn = function(event) {
                    btnNodeBgd.color = COLOR_ICE;
                    btnLabelNode.color = COLOR_ICE;
                };
                
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.TOUCH_END, policySelector, optNode);  } );
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_ENTER, enterBtn, optNode);  } );
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_LEAVE, exitBtn, optNode);  } );

                let btnLvl1Node = new cc.Node();
                let btnLvl1 = btnLvl1Node.addComponent(cc.Sprite);
                btnLvl1.spriteFrame = world.dotOff;
                btnLvl1.materials = [world.defaultMaterial];
                let btnLvl2Node = new cc.Node();
                let btnLvl2 = btnLvl2Node.addComponent(cc.Sprite);
                btnLvl2.spriteFrame = world.dotOff;
                btnLvl2.materials = [world.defaultMaterial];
                let btnLvl3Node = new cc.Node();
                let btnLvl3 = btnLvl3Node.addComponent(cc.Sprite);
                btnLvl3.spriteFrame = world.dotOff;
                btnLvl3.materials = [world.defaultMaterial];

                if (gameParams.policies[opt.id] === undefined) {
                    
                    btnLvl1.spriteFrame = world.dotOff;
                    btnLvl2.spriteFrame = world.dotOff;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (gameParams.policies[opt.id] === 1) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOff;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (gameParams.policies[opt.id] === 2) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOn;
                    btnLvl3.spriteFrame = world.dotOff;

                }
                else if (gameParams.policies[opt.id] === 3) {
                    
                    btnLvl1.spriteFrame = world.dotOn;
                    btnLvl2.spriteFrame = world.dotOn;
                    btnLvl3.spriteFrame = world.dotOn;

                }

                btnLvl1Node.setPosition(0 , 50);
                btnLvl1Node.setContentSize(25, 25);
                btnLvl1Node.setAnchorPoint(cc.Vec2(0.0, 0.0));
                btnLvl2Node.setPosition(0 , btnLvl1Node.y + 35);
                btnLvl2Node.setContentSize(25, 25);
                btnLvl2Node.setAnchorPoint(cc.Vec2(0.0, 0.0));
                btnLvl3Node.setPosition(0 , btnLvl2Node.y + 35);
                btnLvl3Node.setAnchorPoint(cc.Vec2(0.0, 0.0));
                btnLvl3Node.setContentSize(25, 25);
                btnLvl1Node.parent = optNode;
                btnLvl2Node.parent = optNode;
                btnLvl3Node.parent = optNode;
                
                levelButtons[opt.id * 100 + 1] = btnLvl1Node;
                levelButtons[opt.id * 100 + 2] = btnLvl2Node;
                levelButtons[opt.id * 100 + 3] = btnLvl3Node;

            }
        }        

        btnEconomy.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnEconomy, 0);
        });
        btnPolitics.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnPolitics, 1);
        });
        btnCulture.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnCulture, 2);
        });
        btnEcology.on(cc.Node.EventType.TOUCH_END, function(event) {
            switchPage(btnEcology, 3);
        });

        pageView.node.on('page-turning', function(pv) {
            let index = pv.getCurrentPageIndex();
            let btn = allButtons[index];
            switchPage(btn, index);
        }, world);

    },

    initStats() {

        let layerStats = cc.director.getScene().getChildByName("layerStats");

        let pageView = layerStats.getChildByName("pageview").getComponent(cc.PageView);

        // Switch pages
        let btnWorld = layerStats.getChildByName("btnWorld");
        let btnCountries = layerStats.getChildByName("btnCountries");
        let btnTrends = layerStats.getChildByName("btnTrends");

        pageView.setCurrentPageIndex(0);
        btnWorld.getComponent(cc.Button).interactable = false;
        btnWorld.getChildByName("Label").color = COLOR_UMBER;

        let allButtons = [btnWorld, btnCountries, btnTrends];
        let prevButton = btnWorld;

        const switchPage = (btn, index) => {

            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {
                
                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = COLOR_ICE;

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
    },
        
    processResourceSelection(event) {
            
        // Do nothing if game is paused
        if (gameParams.state === GAME_STATES.PAUSED)
            return;

        const res = Math.floor(1 + Math.random() * 3);
        gameParams.resources += res;

        event.target.destroy();

        if (!gameParams.resourcesAdded) {
            
            gameParams.state = GAME_STATES.PAUSED;
            gameParams.resourcesAdded = true;
            
            if (gameParams.tutorialMode) {
                
                world.showMessageBox(world, "HINT:", TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language], "OK!", function() {
                    
                    gameParams.tutorialHints.push(TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language]);
                    gameParams.state = GAME_STATES.STARTED;

                });

            }
            else {
                
                gameParams.state = GAME_STATES.STARTED;

            }
        }

    },

    processCrisisSelection(event) {

        // Do nothing if game is paused
        if (gameParams.state === GAME_STATES.PAUSED)
            return;

        gameParams.crisisCountry = null;
        let crisis = null;

        for (let i = 0; i < gameParams.crises.length; i++) {

            if (gameParams.crises[i].id == event.target.crisisId) {

                const crisisInCountry = gameParams.crises[i];
                crisis = CRISES[crisisInCountry.crisis];
                gameParams.crises.splice(i, 1);
                break;

            }
        }

        event.target.destroy();
        
        if (!gameParams.alertCrisis && gameParams.tutorialMode) {

            gameParams.state = GAME_STATES.PAUSED;
            gameParams.alertCrisis = true;
            
            world.showMessageBox(world, 
                gd.lang.crisis_title[cc.sys.localStorage.language], 
                gd.lang.crisis_message[cc.sys.localStorage.language] + crisis[cc.sys.localStorage.language] + "!", "OK!", function() {

                gameParams.state = GAME_STATES.STARTED;

            });

        }
        else {

            // Add Crisis Quiz, 50% of the time
            if (Math.random() < 0.5) {
            // if (Math.random() < 1.0) {

                // Show quiz
                let qi = gd.quizzes[Math.floor(Math.random() * gd.quizzes.length)];
                let quiz = qi.quiz[cc.sys.localStorage.language];
                let wrong_answer = qi.wrong_answer[cc.sys.localStorage.language];
                let right_answer = qi.right_answer[cc.sys.localStorage.language];

                world.showQuizBox(world, "CRISIS ALERT!", quiz, wrong_answer, right_answer);

            }

        }

    },
    
    /**
     * Update month / year in the interface
     * @param {*} world 
     */
    refreshDate() {

        // world.topBar.getChildByName("lblDay").getComponent(cc.Label).string = (gameParams.currentDate.getDate()).toString();
        world.topBar.getChildByName("lblMonth").getComponent(cc.Label).string = (gameParams.currentDate.getMonth() + 1).toString();
        world.topBar.getChildByName("lblYear").getComponent(cc.Label).string = (gameParams.currentDate.getFullYear()).toString();

    },

    /**
     * Show country-level stats.
     */
    printCountryStats() {

        const country = world.countries[gameParams.currentCountry];
        world.countryLabel.string = (country.name);

        const lossPercent = Math.floor(country.loss);
        const preparedPercent = Math.floor(country.pop_prepared_percent);

        world.countryLoss.string = (lossPercent + "%" );
        world.countryLossProgress.progress = lossPercent / 100.0;
        
        if (lossPercent >= LOSS_TOTAL)
            world.countryLossProgress.opacity = 255;
        else if (lossPercent >= LOSS_PARTIAL)
            world.countryLossProgress.opacity = 191;
        world.countryAwarePrepared.string = (preparedPercent + "%");
        // if (preparedPercent >= 20)
        //     world.countryAwarePrepared.opacity = 255;
        world.countryPreparedProgress.progress = preparedPercent / 100.0;

    },

    /**
     * Show world-level stats.
     */
    printWorldStats() {

        world.countryLabel.string = (gd.lang.world_label[cc.sys.localStorage.language]);

        const lossPercent = Math.round(gameParams.totalLoss);
        const preparedPercent = Math.round(gameParams.populationPreparedPercent);

        world.countryLoss.string = (lossPercent + "%" );
        world.countryAwarePrepared.string = (preparedPercent + "%");

        world.countryLossProgress.progress = lossPercent / 100.0;
        world.countryPreparedProgress.progress = preparedPercent / 100.0;

    },

    generateResourceDistribution() {

        let dists = [];
        let total = 0;

        for (let i = 0; i < 16; i++) {

            let weight = 1;
            if (gameParams.policies[i + 1] !== undefined) 
                weight += gameParams.policies[i + 1];
            
            total += weight;
            dists.push(weight);

        }

        for (let i = 0; i < dists.length; i++) {

            dists[i] /= total;

        }

        return dists;

    },

    selectCountry(event, location) {

        if (gameParams.state !== GAME_STATES.PREPARED && gameParams.state !== GAME_STATES.STARTED && gameParams.state !== GAME_STATES.PAUSED)
            return;
        
        const target = event.getCurrentTarget();
        const locationInNode = target.convertToNodeSpaceAR(location);
        let x = 0, y = 0;
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
            const mousePoint = {x: locationInNode.x, y: cc.winSize.height - locationInNode.y - (2 * Y_OFFSET)};
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

            if (gameParams.currentCountry != null) {
                
                world.countries[gameParams.currentCountry].selected = false;

            }
            gameParams.currentCountry = selectedCountry;

            if (gameParams.currentCountry != null)
                world.countries[gameParams.currentCountry].selected = true;
            currentCountry = selectedCountry;
            
            world.printCountryStats();

        }
        else {
            
            if (gameParams.currentCountry != null)
                world.countries[gameParams.currentCountry].selected = false;
            gameParams.currentCountry = null;

            world.printWorldStats();

        }

        return true;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        
        let Y_OFFSET = 55;
        this._time = 0;
        world = this;
        world.messageBox.opacity = 0;
        
        scenarioData = gd.scenarioData;
        automateScripts = gd.automateScripts;
        world.scenarioData = scenarioData;
        world.automateID = -1;
        if (typeof(automateID) !== "undefined")
            world.automateID = automateID;
        world.mouse = { x: 0, y: 0 };

        this.initGameParams(scenarioData);     

        cc.loader.loadRes( 'singleColor', cc.SpriteFrame, function( err, asset) {
            world.singleColor = asset;
        });

        cc.loader.loadRes( 'icons/DOT_ON', cc.SpriteFrame, function( err, asset) {
            world.dotOn = asset;
            cc.loader.loadRes( 'icons/DOT_OFF', cc.SpriteFrame, function( err, asset) {
                world.dotOff = asset;

                // Initialise policy screen
                world.initPolicyDesign();
                world.initStats();

            });
        });


        // Load policy icons
        world.policyIcons = [];
        Object.keys(res).forEach(function(r) {

            let resUrl = res[r];
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function(err, asset) {

                world.policyIcons.push(asset);

            })

        });
        world.crisisIcons = {};
        Object.keys(CRISES).forEach(function(r) {

            let resUrl = CRISES[r].image;
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function(err, asset) {

                world.crisisIcons[r] = (asset);

            })

        });
        var url = cc.url.raw('resources/scripts/json-equal-greyscale.json');
        cc.loader.load( url, function( err, res) {

            if (err == null) {
                world.countriesJson = res.json;
                world.initCountries();            
                world.spriteCountries = {};
                world.countryNodes = {};

                // loading all resource in the test assets directory
                cc.loader.loadResDir("countries", cc.SpriteFrame, function (err, assets, urls) {
                    
                    for (var i = 0; i < assets.length; i++) {
                        
                        const spriteNode = new cc.Node('Sprite ');
                        const sp = spriteNode.addComponent(cc.Sprite);
                        sp.spriteFrame = assets[i];
                        let materialVariant = cc.MaterialVariant.create(world.material);
                        materialVariant.setProperty('u_selected', 0.0);
                        materialVariant.setProperty('u_percentageLoss', 0.0);
                        materialVariant.setProperty('u_percentagePrep', 0.0);
                        sp.materials = [materialVariant];
                        sp.setMaterial(0, materialVariant);
                        let url = urls[i];
                        let iso = url.match('/([A-Z]*)_')[1];
                        world.countryNodes[iso] = spriteNode;

                    }

                    var scene = cc.director.getScene();
                    let keys = Object.keys(world.countryNodes);

                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        let country = world.countries[key];
                        if (country !== undefined) {
                            
                            let countryNode = world.countryNodes[key];
                            countryNode.setAnchorPoint(0.0, 0.0);
                            countryNode.setPosition((country.offsetX), 
                                                    (cc.winSize.height - ( 1 * Y_OFFSET  ) - country.offsetY));
                            countryNode.parent = scene;
                            countryNode.zIndex = 2;
                            
                        }
                    }
            
                });
            }
        });

        // Initialise controls
        world.initControls();

        let fg = cc.director.getScene().getChildByName("foreground");
        fg.on(cc.Node.EventType.MOUSE_MOVE, function(event) {
            
            world.selectCountry(event, event.getLocation());
                                                
        });

    },


    generateWeightedPolicyIndex(r) {

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

    },

    /**
     * Generate a policy icon, based on a weighted average of existing policies.
     */
    generatePolicyIcon() {

        let policyIndex = world.generateWeightedPolicyIndex(Math.random());
        let icon = "";

        switch(policyIndex) {
            case 0:
                icon = res.resource_economy_1;
                break;
            case 1:
                icon = res.resource_economy_2;
                break;
            case 2:
                icon = res.resource_economy_3;
                break;
            case 3:
                icon = res.resource_economy_4;
                break;
            case 4:
                icon = res.resource_politics_1;;
                break;
            case 5:
                icon = res.resource_politics_2;;
                break;
            case 6:
                icon = res.resource_politics_3;;
                break;
            case 7:
                icon = res.resource_politics_4;;
                break;
            case 8:
                icon = res.resource_culture_1;;
                break;
            case 9:
                icon = res.resource_culture_2;;
                break;
            case 10:
                icon = res.resource_culture_3;;
                break;
            case 11:
                icon = res.resource_culture_4;;
                break;
            case 12:
                icon = res.resource_ecology_1;;
                break;
            case 13:
                icon = res.resource_ecology_2;;
                break;
            case 14:
                icon = res.resource_ecology_3;;
                break;
            case 15:
                icon = res.resource_ecology_4;;
                break;
        }

        
        return policyIndex;
    },
                            
    // Add chance of new resource
    addResource() {

        const btnRes = new cc.Node('Resource');
        const sp = btnRes.addComponent(cc.Sprite);
        const policyIcon = world.generatePolicyIcon();
        sp.spriteFrame = world.policyIcons[policyIcon];
        
        const ind = Math.floor(Math.random() * Object.keys(world.countries).length);
        const countryRand = world.countries[Object.keys(world.countries)[ind]];
        const pt = countryRand.centroid;
        console.log(countryRand.name)
        btnRes.setPosition( pt.x, (world.node.height - (2 * Y_OFFSET) ) - pt.y + RESOURCE_SIZE_H / 2 );
        btnRes.setContentSize(cc.size(RESOURCE_SIZE_W, RESOURCE_SIZE_H));
        // btnRes.setColor(COLOR_RESOURCE);
        btnRes.placedAt = gameParams.counter;
        btnRes.setAnchorPoint(0.5, 0.0);
        btnRes.parent = cc.director.getScene();
        btnRes.zIndex = 102;
        world.buttons.push(btnRes);

        btnRes.on(cc.Node.EventType.TOUCH_END, world.processResourceSelection, btnRes);
        // world.handleMouseTouchEvent(btnRes, world.processResourceSelection);

        /*
        if (gameParams.automateMode) {
            
            const r = Math.random();
            if (r < parseFloat(gameParams.automateScript.resourcesProb)) {

                fireClickOnTarget(btnRes);

            }

        }
        */

        if (!gameParams.alertResources) {

            if (gameParams.tutorialMode) {
                
                gameParams.state = GAME_STATES.PAUSED;
                gameParams.alertResources = true;

                world.showMessageBox(world, "HINT:", TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language], "OK!", function(that) {
                
                    gameParams.tutorialHints.push(TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language]);
                    //gameParams.state = GAME_STATES.STARTED;
                    gameParams.state = GAME_STATES.PAUSED_TUTORIAL;

                });

            }

        }

        gameParams.lastResource = gameParams.counter;

    },
                            
    /**
     * Calculate the probability distribution of crisis & country
     */ 
    crisisProbDistribution() {
        
        const probs = [];
        const crisisKeys = Object.keys(CRISES);
        const countryKeys = Object.keys(world.countries);
        let denom = 0;
        
        crisisKeys.forEach(ck => {

            const crisis = CRISES[ck];
            
            countryKeys.forEach(yk => {
            
                const country = world.countries[yk];
                const lossProp = country.loss / gameParams.totalLoss;
                const preparedProp = country.pop_prepared_percent / gameParams.populationPreparedPercent;
                
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

    },

    crisisProbLocation(r) {

        const probs = world.crisisProbDistribution();
        const crisisKeys = Object.keys(CRISES);
        const countryKeys = Object.keys(world.countries);
        let crisisCountry = {};
        let counter = 0;
        
        for (let i = 0; i < probs.length; i++) {
        
            counter += probs[i];

            if (r < counter) {

                const crisisID = Math.floor(crisisKeys.length * i / probs.length);
                const countryID = i % countryKeys.length;
                crisisCountry.crisis = crisisKeys[crisisID];
                crisisCountry.country = countryKeys[countryID];
                crisisCountry.id = i;
                crisisCountry.counter = gameParams.counter;
                break;

            }
        
        }

        return crisisCountry;

    },

    /**
     * Add a new crisis.
     */
    addCrisis() {

        const r2 = Math.random();
        const crisisInCountry = world.crisisProbLocation(r2);
        gameParams.crisisCountry = crisisInCountry;
        gameParams.crises.push(crisisInCountry);
        gameParams.crisisCount++;
        const crisis = CRISES[crisisInCountry.crisis];
        const country = world.countries[crisisInCountry.country];

        const btnCrisis = new cc.Node('Crisis');
        const sp = btnCrisis.addComponent(cc.Sprite);
        sp.spriteFrame = world.crisisIcons[crisisInCountry.crisis];

        const pt = country.centroid;
        console.log(country.name)
        btnCrisis.setPosition(pt.x, (world.node.height - (2 * Y_OFFSET) ) - pt.y + RESOURCE_SIZE_H / 2 );
        btnCrisis.setContentSize(cc.size(RESOURCE_SIZE_W, RESOURCE_SIZE_H));
        // btnCrisis.setColor(COLOR_DESTRUCTION_POINTS);
        btnCrisis.placedAt = gameParams.counter;
        btnCrisis.setAnchorPoint(0.5, 0.0);
        btnCrisis.crisisId = crisisInCountry.id;
        btnCrisis.name = "crisis" + crisisInCountry.id;
        btnCrisis.parent = cc.director.getScene();
        btnCrisis.zIndex = 102;
        world.buttons.push(btnCrisis);

        btnCrisis.on(cc.Node.EventType.TOUCH_END, world.processCrisisSelection, btnCrisis);

        // After the third crisis, add notifications to the news feed
        let message = gd.lang.crisis_prefix[cc.sys.localStorage.language] + 
                        crisis[cc.sys.localStorage.language] + 
                        gd.lang.crisis_suffix[cc.sys.localStorage.language] + 
                        country.name + "."; 
        
        // btnCrisis.setTitleColor(COLOR_LICORICE);
        // btnCrisis.setTitleText(crisis.name);

        if (gameParams.crisisCount < 4) {

            gameParams.state = GAME_STATES.PAUSED;
            message += gd.lang.crisis_explanation[cc.sys.localStorage.language];

            let buttons = world.showMessageBox(world, gd.lang.crisis_alert[cc.sys.localStorage.language], message, "OK!", (that) => {

                if (gameParams.tutorialMode)
                    gameParams.state = GAME_STATES.PAUSED_TUTORIAL;
                else
                    gameParams.state = GAME_STATES.STARTED;

            });

            if (gameParams.automateMode) {

                fireClickOnTarget(buttons[0]);

            }                    

        }
        else {
            
            // if (gameParams.messageOverride == null)
            //     gameParams.messageOverride = message;

        }
        
        gameParams.lastCrisis = gameParams.counter;

    },

    /**
     * Add tutorial.
     */
    addTutorial() {

        if (gameParams.tutorialHints.length < 2 || gameParams.tutorialHints.length >= 6)
            return;

        gameParams.state = GAME_STATES.PAUSED;
        let message = null;
        switch(gameParams.tutorialHints.length) {
            case 2:
            default:
                message = TUTORIAL_MESSAGES.RANDOM_1[cc.sys.localStorage.language];
                break;
            case 3:
                message = TUTORIAL_MESSAGES.RANDOM_2[cc.sys.localStorage.language];
                break;
            case 4:
                message = TUTORIAL_MESSAGES.RANDOM_3[cc.sys.localStorage.language];
                break;
            case 5:
                message = TUTORIAL_MESSAGES.RANDOM_4[cc.sys.localStorage.language];
                break;
        }

        world.showMessageBox(world, "HINT:", message, "OK", function() {
            
            gameParams.tutorialHints.push(message);
            gameParams.state = GAME_STATES.STARTED;

        });

    },

    sigmoidalPercent(percent, inflectionPoint) {

        if (inflectionPoint === undefined)
            inflectionPoint = 50;

        // Some value between -1.0 and 1.0
        let normedPercent = ( percent - inflectionPoint ) / inflectionPoint;
        let normedPercentWithFactor = normedPercent * 1.0;
        // Some value between e (2.78...) and 1 / e (0.367) 
        let sigmoidalPercent = 1 / Math.pow(Math.E, normedPercentWithFactor);

        return sigmoidalPercent;

    },

    // Evaluates loss
    evaluateLoss(country) {

        const lossCurrent = country.loss;

        // Add random amount to default rate of loss
        const rateOfLoss = gameParams.rateOfLoss * (0.5 + Math.random());
        const rateOfLossMonthly = rateOfLoss;
        let rateOfLossFactor = 1 + rateOfLossMonthly;

        // Weaken rate of loss by population prepared for good policy
        const preparednessFactor = 1 + 0.1 * country.pop_prepared_percent / 100.0;
        rateOfLossFactor /= preparednessFactor;

        //let crisis = CRISES[gameParams.crises[0].crisis];
        gameParams.crises.forEach(crisisInCountry => {
            
            const crisis = CRISES[crisisInCountry.crisis];
            // Add effects of country / global loss ratio to crisis effect
            // Take the square root of the ratio of country to world loss, and multiply this by the crisis effect
            rateOfLossFactor *= (1 + crisis.effect_on_environmental_loss * (Math.pow(lossCurrent / gameParams.totalLoss, 0.5)));
            
        });

        const sigmoidalLossFactor = ( 1 + (rateOfLossFactor - 1) * world.sigmoidalPercent(lossCurrent) );
        let lossNew = lossCurrent + (sigmoidalLossFactor - 1);

        if (lossNew > 100)
            lossNew = 100;
        if (lossNew < 0)
            lossNew = 0;

        return lossNew;

    },

    /**
     * Transmit policy effects from a country
     * @param {*} Calculates transmission of policies from 
     */
    transmitFrom(country) {
        
        const neighbours = country.neighbours;
        const sharedBorder = country.shared_border_percentage;
        const transmissionLand = world.scenarioData.threat_details.transmission.transmission_land;
        const transmissionSea = world.scenarioData.threat_details.transmission.transmission_sea;
        const transmissionAir = world.scenarioData.threat_details.transmission.transmission_air;
        const infectivityMinimumIncrease = world.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        const likelihoodOfTransmission = country.affected_chance; //infectivityIncreaseSpeed / 100.0;

        const popCountry = country.pop_est;
        const popWorld = gameParams.populationWorld;
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

    },

    infectWithin(country) {
        
        if (country.affected_chance == 0)
            return;

        if (country.pop_aware >= parseInt(country.pop_est))
            return;

        // Calculate infectivity
        const infectivityIncreaseSpeed = world.scenarioData.threat_details.advanced_stats.infectivity_increase_speed;
        const infectivityMinimumIncrease = world.scenarioData.threat_details.advanced_stats.minimum_infectivity_increase;

        let infectivityRate = infectivityIncreaseSpeed;

        Object.keys(gameParams.policies).forEach(strategy => {
            const level = gameParams.policies[strategy];
            switch(strategy.id) {
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

    },

    calculatePolicyBalanceOnPreparedness() {

        const strategyCount = Object.values(gameParams.policies).reduce((accum, level) => accum + level, 0);
        if (strategyCount == 0)
            return 1.0;

        const domainMean = strategyCount / 4;
        let ecn = 0, pol = 0, cul = 0, eco = 0;
        Object.keys(gameParams.policies).forEach(policyID => {
            const policy = gameParams.policyOptions[policyID]
            const level = gameParams.policies[policyID];
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

    },


    calculateSinglePolicyImpactOnPreparedness(country, index) {

        let severityEffect = 1.0;

        const policyID = parseInt(Object.keys(gameParams.policies)[index]);
        const policy = gameParams.policyOptions[policyID];
        const level = gameParams.policies[policyID];

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
        for (let j = index + 1; j < Object.keys(gameParams.policies).length; j++) {
            // if (i == j)
            //     continue;

            const otherPolicyID = parseInt(Object.keys(gameParams.policies)[j]);
            const otherLevel = gameParams.policies[otherPolicyID];
            // Generate a natural log, so that level 1 = 1; level 2 = 1.31; level 3 = 1.55
            const otherLevelMultiplier = Math.log(otherLevel + 1.718);

            const relation = gameParams.policyRelations[policyID][otherPolicyID];
            
            if (typeof(relation) !== "undefined") {
            
                severityEffect *= (1 + relation * otherLevelMultiplier);
            
            }

        }

        return severityEffect;

    },

    calculatePolicyImpactOnPreparedness(country) {
        
        let severityEffect = 1.0;

        for (let i = 0; i < Object.keys(gameParams.policies).length; i++) {

            severityEffect *= world.calculateSinglePolicyImpactOnPreparedness(country, i);

        }
        
        // Add sigmoidal effect
        let sigmoidalInfluence = world.sigmoidalPercent(country.pop_prepared_percent, 5) + 0.5;

        return severityEffect * sigmoidalInfluence;

    },

    registerPreparednessWithin(country) {

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
        const policyEffectNormalised = 1 + ((policyEffect - 1) / (MONTH_INTERVAL));

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
            
    },

    doSim() {

        if (gameParams.startCountry === null || gameParams.state !== GAME_STATES.PREPARED)
            return;

        let buttons = [];

        const country = world.countries[gameParams.startCountry];
        country.policy = 1.0;
        country.affected_chance = 1.0;

        // Shuffle from https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
        world.shuffleArray = a => a.sort(() => Math.random() - 0.5);

        world.startGameParams();
        world.refreshDate();
        world.buttons = [];

    
        /**
         * Updates the game state at regular intervals
         */
        const updateTime = () => {

            if (gameParams.state !== GAME_STATES.STARTED) {

                // Refresh the timeout
                gameParams.timeoutID = setTimeout(updateTime, 20);
                return;

            }

            gameParams.counter++;
            

            // Handle automation here
            if (gameParams.automateMode) {

                // Select resources
                for (let i = 0 ; i < gameParams.automateScript.policyEvents.length; i++) {

                    let pe = gameParams.automateScript.policyEvents[i];
                    
                    if (gameParams.counter == pe.counter / MONTH_INTERVAL) {

                        fireClickOnTarget(world.btnDevelopPolicy, function() {
                            
                            let resNames = Object.values(RESOURCES).map(res => res.name);
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
                for (let i = 0; i < gameParams.crises.length; i++) {

                    let crisisInCountry = gameParams.crises[i];
                    
                    if (gameParams.counter == crisisInCountry.counter + gameParams.automateScript.crisisDuration) {
                        
                        let target = world.worldBackground.getChildByName("crisis"+crisisInCountry.id);
                        fireClickOnTarget(target);

                    }

                }

            }

            if (gameParams.counter % gameParams.timeInterval == 0) {

                gameParams.currentDate = new Date(gameParams.currentDate.valueOf());
                gameParams.currentDate.setDate(gameParams.currentDate.getDate() + 30.417);

                // Show message box for each new decade
                const currentYear = gameParams.currentDate.getFullYear();
                const previousYear = gameParams.previousDate.getFullYear();
                
                // Change of year
                if (currentYear > previousYear) {

                    gameParams.stats[previousYear] = {
                        loss: gameParams.totalLoss,
                        prepared: gameParams.populationPreparedPercent
                    };

                    // Change of decade
                    let message = "";
                    let showDialog = false;

                    // Sort narratives by loss for comparison
                    const narratives = Object.values(NARRATIVES.n2048).sort((o1, o2) => {return o2.loss - o1.loss});

                    switch (currentYear) {
                        case 2048:
                            showDialog = true;
                            
                            for (let i = 0; i < narratives.length; i++) {
                            
                                const n = narratives[i];
                            
                                if (gameParams.totalLoss > n.loss) {
                                    
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

                        gameParams.state = GAME_STATES.PAUSED;
                        let buttons = world.showMessageBox(world, 
                            gd.lang.bulletin[cc.sys.localStorage.language] + currentYear, 
                            message, "OK", function() {
                                gameParams.state = GAME_STATES.STARTED;
                            });

                        if (gameParams.automateMode) {

                            world.fireClickOnTarget(buttons[0]);

                        }

                    }

                }

                gameParams.previousDate = gameParams.currentDate;


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
                gameParams.policy = totalPolicy;

                totalLoss /= Object.keys(world.countries).length;
                gameParams.previousLoss = totalLoss;
                gameParams.totalLoss = totalLoss;

                gameParams.countriedAffected = countriedAffected;
                gameParams.populationAware = populationAware;
                gameParams.populationPrepared = populationPrepared;
                gameParams.populationAwarePercent = 100 * gameParams.populationAware / gameParams.populationWorld;
                gameParams.populationPreparedPercent = 100 * gameParams.populationPrepared / gameParams.populationWorld;

                if (gameParams.currentCountry != null) {

                    world.printCountryStats();

                }
                else {

                    world.printWorldStats();

                }

            }


            // Various events
            let ci = gameParams.crisisInterval;
            Object.keys(gameParams.policies).forEach(policyID => {

                const policy = gameParams.policyOptions[policyID];
                const policyLevel = gameParams.policies[policyID];
                ci /= 1 + (policy.effect_on_crises * Math.log(policyLevel + 1.718));
                
            });         

            // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
            if (gameParams.counter - gameParams.lastCrisis >= ci  && Math.random() < CRISIS_CHANCE) {

                world.addCrisis();

            }

            let adjustEffect = (effect) => {

                // Effect must be positive
                effect += 1.000001;
                // Invert effect
                effect = 1.0 / effect;
                // Multiply by difficulty
                if (effect > 1.0)
                    effect = Math.pow(effect, gameParams.difficultyMultiplier);
                else 
                    effect = Math.pow(effect, 1.0 / gameParams.difficultyMultiplier);

                return effect;

            };

            let ri = gameParams.resourceInterval;
            gameParams.crises.forEach(crisisInCountry => {
                
                let crisis = CRISES[crisisInCountry.crisis];
                let crisisEffect = crisis.effect_on_resources;
                let country = world.countries[crisisInCountry.country];
                // Add country-specific effects here
                // ...

                // Add to overall effect
                ri *= adjustEffect(crisisEffect);
                
            }); 

            Object.keys(gameParams.policies).forEach(policyID => {

                let policy = gameParams.policyOptions[policyID];
                let policyLevel = gameParams.policies[policyID];

                ri *= adjustEffect(policy.effect_on_resources * Math.log(policyLevel + 1.718));
                
            }); 

            // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
            if (gameParams.counter - gameParams.lastResource >= ri) {

                world.addResource();
                gameParams.resourceInterval *= 1.1;

            }
            
            if (gameParams.tutorialMode && gameParams.counter % gameParams.tutorialInterval == 0) {
                
                world.addTutorial();

            }

            // Add buttons
            const newButtons = [];
            for (let i = 0; i < world.buttons.length; i++) {

                const button = world.buttons[i];
                if (gameParams.counter > button.placedAt + RESOURCE_DURATION) 
                    button.removeFromParent();
                else 
                    newButtons.push(button);

            }
            world.buttons = newButtons;
            
            // Update labels
            world.resourceScoreLabel.string = gameParams.resources;
            world.refreshDate();

            // Game over                        
            if (gameParams.totalLoss >= 100) {

                // Sort narratives by loss for comparison
                const narratives = Object.values(NARRATIVES.n2070).sort((o1, o2) => {return o2.loss - o1.loss});
                const n = narratives[0];
                const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                const message = n[cc.sys.localStorage.language][index];
                world.gameOver(world, message, "OK");

            }
            else if (gameParams.currentDate >= gameParams.targetDate) {

                let message = "";
                // Sort narratives by loss for comparison
                const narratives = Object.values(NARRATIVES.n2070).sort((o1, o2) => {return o2.loss - o1.loss});
                
                for (let i = 0; i < narratives.length; i++) {

                    const n = narratives[i];
                    if (gameParams.totalLoss > n.loss) {

                        const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                        message = n[cc.sys.localStorage.language][index];
                        break;

                    }

                }

                gameOver(world, message, "OK");

            }

            // Refresh the timeout
            gameParams.timeoutID = setTimeout(updateTime, 20);

        }; 

        // Run the updates in the background, so interaction is not blocked.
        // cc.async.parallel([
        //     function() {
        //         updateTime();
        //     }
        // ]);
        updateTime();
    },

    start () {

        const beginSim = () => {

            gameParams.state = GAME_STATES.PREPARED;

            world.btnPause.getComponent(cc.Button).interactable = true;
            world.btnPlay.getComponent(cc.Button).interactable = false;
            world.btnFF.getComponent(cc.Button).interactable = true;

            world.doSim();

        };

        let antCountries = ["NZL", "AUS", "ZAF", "ARG", "CHL"];
        let startCountry = antCountries[Math.floor(Math.random() * antCountries.length)];
        
        world.showMessageBox(world, 
            world.scenarioData[cc.sys.localStorage.language].popup_1_title, 
            world.scenarioData[cc.sys.localStorage.language].popup_1_description, 
            gd.lang.start_tutorial[cc.sys.localStorage.language], (that) => {

                gameParams.tutorialMode = true;
                gameParams.startCountry = startCountry;
                // gameParams.startCountry = keys[Math.floor(Math.random() * keys.length)]
                gameParams.statsCountry = startCountry;
                gameParams.currentCountry = startCountry;
                const countryName = world.countries[gameParams.startCountry].name;
                
                nestedButtons = world.showMessageBox(world, 
                    gd.lang.start_prepare[cc.sys.localStorage.language], 
                    gd.lang.start_mission_a[cc.sys.localStorage.language]  + 
                    countryName + 
                    gd.lang.start_mission_b[cc.sys.localStorage.language], 
                    world.scenarioData[cc.sys.localStorage.language].popup_2_title, 
                    (that) => {
                    
                        beginSim();

                });

            },
            gd.lang.start_tutorial_skip[cc.sys.localStorage.language], (that) => {

                gameParams.tutorialMode = false;
                gameParams.startCountry = startCountry;
                // gameParams.startCountry = keys[Math.floor(Math.random() * keys.length)]
                gameParams.statsCountry = startCountry;
                gameParams.currentCountry = startCountry;
                const countryName = world.countries[gameParams.startCountry].name;

                nestedButtons = world.showMessageBox(world, 
                    gd.lang.start_prepare[cc.sys.localStorage.language], 
                    gd.lang.start_mission_a[cc.sys.localStorage.language]  + 
                    countryName + 
                    gd.lang.start_mission_b[cc.sys.localStorage.language], 
                    world.scenarioData[cc.sys.localStorage.language].popup_2_title, 
                    (that) => {

                        beginSim();

                    });
            }
        );
    },

    update (dt) {

        this._time += dt;
        // this.material.setProperty('time', this._time);
        // this.material.setProperty('u_percentageLoss', gameParams.totalLoss);
        // this.material.setProperty('u_percentagePrep', gameParams.populationPreparedPercent);
        if (world.countryNodes !== undefined) {

            Object.keys(world.countryNodes).forEach((key) => {

                let countryNode = world.countryNodes[key];
                let country = world.countries[key];
                if (country !== undefined) {

                    let mv = countryNode.getComponent(cc.Sprite).materials[0];
                    mv.setProperty('u_selected', (country.selected ? 1.0 : 0.0));
                    mv.setProperty('u_percentageLoss', country.loss);
                    mv.setProperty('u_percentagePrep', country.pop_prepared_percent / 100.0);

                }
    
            });

        }
        
    },
});
