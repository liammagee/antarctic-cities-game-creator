// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,


    properties: {
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
    pointArrayOLD(world, name) {

        return world.sortedObjs.filter(so => so.name == name).map(so => so.points);

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

        /*
        this.sortedObjs = this.map.getObjectGroups()[0].getObjects().slice(0).sort((a, b) => { 
            return (a.points[0].y * cc.winSize.height + a.points[0].x) > (b.points[0].y * cc.winSize.height + b.points[0].x);  
        }); 
        world.countries = world.map.getObjectGroups()[0].getObjects().reduce((map, obj) => {  

            if (!map[obj.name]) {

                map[obj.name] = {

                    name: obj.NAME,
                    points: this.pointArray(world, obj.name),
                    extremes: this.extremes(world, obj.name),
                    centroid: this.centroids(world, obj.name),
                    area: this.areas(world, obj.name),
                    
                    affected_chance: 1.0,
                    pop_est: parseInt(obj.POP_EST),
                    pop_aware: 0,
                    pop_aware_percent: 0,
                    pop_prepared: 0,
                    pop_prepared_percent: 0,

                    gdp_est: parseInt(obj.GDP_MD_EST),
                    gid: obj.GID,
                    iso_a2: obj.ISO_A2,
                    iso_a3: obj.ISO_A3,
                    subregion: obj.SUBREGION,
                    economy: obj.ECONOMY,
                    income_grp: obj.INCOME_GRP,
                    income_grp_num: parseInt(obj.INCOME_GRP.charAt(0)),
                    equator_dist: obj.EQUATOR_DIST,
                    offsetX: obj.OFFSET_X,
                    offsetY: obj.OFFSET_Y,

                    policy: 0,
                    previousLoss: this.gameParams.previousLoss,
                    loss: this.gameParams.previousLoss,
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

        */

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
                previousLoss: this.gameParams.previousLoss,
                loss: this.gameParams.previousLoss,
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
        this.gameParams.populationWorld = Object.keys(world.countries).map(function(c) { 
            return world.countries[c].pop_est; 
        }).reduce(function(a, c) {
            return a + parseInt(c);
        }, 0);

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
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showMessageBoxOK(parent, title, message, prompt1, callback1, prompt2, callback2) {

        // parent.pauseAllActions(); 
        gameParams.modal = true;
        gameParams.state = GAME_STATES.PAUSED;

        world.messageBox.opacity = 255;
        let btn1Offset = 0.5, btn2Offset = 0.0;
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
                buttons.push(btn2);

            }
            else {

                btn1.x = 0.0 * world.messageBox.width;
                
                btn2.node.opacity = 0;
                
            }
        }
        else {

            if (prompt2 !== undefined) {

                btn1.node.x = -0.25 * world.messageBox.width;
                btn2.node.x = 0.25 * world.messageBox.width;
                btn2.node.opacity = 255;
                buttons.push(btn2);

            }
            else {

                btn1.node.x = 0.0 * world.messageBox.width;
                btn2.node.opacity = 0;

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
        btn2.node.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

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

        parent.pauseAllActions(); 
        gameParams.modal = true;
        gameParams.state = GAME_STATES.PAUSED;

        let winWidth = cc.winSize.width, 
            winHeight = cc.winSize.height;
        let lyr1OffsetX = 0.05, lyr2OffsetX = 0.55,
            lyr1OffsetY = 0.05, lyr2OffsetY = 0.05;
        let lbl1OffsetX = 0.05, lbl2OffsetX = 0.55,
            lbl1OffsetY = 0.2, lbl2OffsetY = 0.2;
        let btn1OffsetX = 0.25, btn2OffsetX = 0.75,
            btn1OffsetY = 0.1, btn2OffsetY = 0.1;
        let btn1Text = "OPTION 1", btn2Text = "OPTION 2";
        
        if (Math.random() > 0.5) {

            let tmp = lyr1OffsetX;
            lyr1OffsetX = lyr2OffsetX;
            lyr2OffsetX = tmp;
            tmp = lbl1OffsetX;
            lbl1OffsetX = lbl2OffsetX;
            lbl2OffsetX = tmp;
            tmp = btn1OffsetX;
            btn1OffsetX = btn2OffsetX;
            btn2OffsetX = tmp;
            tmp = btn1Text;
            btn1Text = btn2Text;
            btn2Text = tmp;

        }

        let layerBackground = new cc.LayerColor(COLOR_LICORICE, winWidth * 0.85, winHeight * 0.86);
        layerBackground.attr({ 
            x: winWidth / 2 - layerBackground.width / 2, 
            y: winHeight / 2 - layerBackground.height / 2});
        parent.addChild(layerBackground, 4);

        let titleText = new ccui.Text(title, FONT_FACE_TITLE, FONT_FACE_TITLE_BIG);
        titleText.overflow = cc.Label.Overflow.REFLOW;
        titleText.setAnchorPoint(0.5, 0);
        titleText.setContentSize(cc.size(layerBackground.width * 0.9, layerBackground.height * 0.15));
        titleText.setPosition(layerBackground.width * 0.5, layerBackground.height * 0.85);
        titleText.horizontalAlign = (cc.Label.HorizontalAlign.CENTER);
        titleText.verticalAlign = cc.Label.VerticalAlign.CENTER;
        titleText.color = COLOR_WHITE;
        layerBackground.addChild(titleText, 2);

        let contentText = new ccui.Text(message, FONT_FACE_BODY, FONT_FACE_BODY_MEDIUM);
        contentText.overflow = cc.Label.Overflow.REFLOW;
        contentText.setAnchorPoint(0, 0);
        contentText.setContentSize(cc.size(layerBackground.width * 0.9, layerBackground.height * 0.35));
        contentText.setPosition(layerBackground.width * 0.05, layerBackground.height * 0.5);
        contentText.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        contentText.verticalAlign = cc.Label.VerticalAlign.TOP;
        contentText.color = COLOR_WHITE;
        contentText.getVirtualRenderer().setLineHeight(FONT_FACE_BODY_BIG + FONT_SPACING)
        layerBackground.addChild(contentText, 2);

        let buttons = [];
        let opt1Layer = new cc.LayerColor(COLOR_WHITE);
        opt1Layer.setPosition(layerBackground.width * lyr1OffsetX, layerBackground.height * lyr1OffsetY);
        opt1Layer.setContentSize(cc.size(layerBackground.width * 0.4, layerBackground.height * 0.5));
        layerBackground.addChild(opt1Layer, 2);
        let option1Text = new ccui.Text(wrongAnswer, FONT_FACE_BODY, FONT_FACE_BODY_MEDIUM);
        option1Text.overflow = cc.Label.Overflow.REFLOW;
        option1Text.setAnchorPoint(0, 0);
        option1Text.setPosition(opt1Layer.width * 0.05, opt1Layer.height * 0.3);
        option1Text.setContentSize(cc.size(opt1Layer.width * 0.9, opt1Layer.height * 0.7));
        option1Text.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        option1Text.verticalAlign = cc.Label.VerticalAlign.CENTER;
        option1Text.color = (COLOR_LICORICE);
        opt1Layer.addChild(option1Text, 2);

        let btn1 = new ccui.Button();
        btn1.setTouchEnabled(true);
        btn1.setSwallowTouches(false);
        btn1.setTitleText(btn1Text);
        btn1.setTitleColor(COLOR_LICORICE);
        btn1.setTitleFontSize(FONT_FACE_BODY_BIG);
        btn1.setTitleFontName(FONT_FACE_BODY);
        btn1.setScale9Enabled(true);
        btn1.loadTextures(res.button_white, res.button_grey, res.button_grey);
        btn1.setBright(true);
        btn1.setEnabled(true);
        btn1.setAnchorPoint(0, 0);
        btn1.setPosition(opt1Layer.width * 0.05, opt1Layer.height * 0.05);
        btn1.setContentSize(cc.size(opt1Layer.width * 0.9, opt1Layer.height * 0.25));
        opt1Layer.addChild(btn1);

        handleMouseTouchEvent(btn1, () => {

            layerBackground.removeAllChildren(true);
            layerBackground.removeFromParent(true);
            parent.resumeAllActions(); 
            gameParams.modal = false;

            showMessageBoxOK(parent, "CRISIS RESPONSE", "Good try, but this won't be enough to preserve the future of Antarctica!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                if (gameParams.resources - res > 0)
                    gameParams.resources -= res;
                else
                    gameParams.resources = 0;
                
                gameParams.state = GAME_STATES.STARTED;

            });

        });

        let opt2Layer = new cc.LayerColor(COLOR_WHITE);
        opt2Layer.setPosition(layerBackground.width * lyr2OffsetX, layerBackground.height * lyr2OffsetY);
        opt2Layer.setContentSize(cc.size(layerBackground.width * 0.4, layerBackground.height * 0.5));
        layerBackground.addChild(opt2Layer, 2);
        let option2Text = new ccui.Text(rightAnswer, FONT_FACE_BODY, FONT_FACE_BODY_MEDIUM);
        option2Text.overflow = cc.Label.Overflow.REFLOW;
        option2Text.setAnchorPoint(0, 0);
        option2Text.setPosition(opt2Layer.width * 0.05, opt2Layer.height * 0.3);
        option2Text.setContentSize(cc.size(opt2Layer.width * 0.9, opt2Layer.height * 0.7));
        option2Text.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        option2Text.verticalAlign = cc.Label.VerticalAlign.CENTER;
        option2Text.color = (COLOR_LICORICE);
        opt2Layer.addChild(option2Text, 2);

        btn2 = new ccui.Button();
        btn2.setTouchEnabled(true);
        btn2.setSwallowTouches(false);
        btn2.setTitleText(btn2Text);
        btn2.setTitleColor(COLOR_LICORICE);
        btn2.setTitleFontSize(FONT_FACE_BODY_BIG);
        btn2.setTitleFontName(FONT_FACE_BODY);
        btn2.setScale9Enabled(true);
        btn2.loadTextures(res.button_white, res.button_grey, res.button_grey);
        btn2.setBright(true);
        btn2.setEnabled(true);
        btn2.setAnchorPoint(0, 0);
        btn2.setPosition(opt2Layer.width * 0.05, opt2Layer.height * 0.05);
        btn2.setContentSize(cc.size(opt2Layer.width * 0.9, opt2Layer.height * 0.25));
        opt2Layer.addChild(btn2);  

        handleMouseTouchEvent(btn2, () => {
            
            layerBackground.removeAllChildren(true);
            layerBackground.removeFromParent(true);
            parent.resumeAllActions(); 
            gameParams.modal = false;

            world.showMessageBoxOK(parent, "CRISIS RESPONSE", "Great response to this crisis!", "OK!", function() {
                
                const res = Math.floor(1 + Math.random() * 3);
                gameParams.resources += res;

                gameParams.state = GAME_STATES.STARTED;

            });

        });

        buttons.push(btn1);
        buttons.push(btn2);
        
        return buttons;

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

        parent.pauseAllActions(); 
        window.clearTimeout(gameParams.timeoutID );
        gameParams.state = GAME_STATES.PAUSED;
        
        showMessageBoxOK(parent, "Game Over", message, prompt, function() {

            initGameParams(world.scenarioData);
            gameParams.state = GAME_STATES.GAME_OVER;
            gameParams.startCountry = null;
            gameParams.policies = {};
            world.tweetLabel.setString(gameParams.scenarioName);
            world.tweetLabel.attr({ x: world.tweetBackground.width / 2, width: world.tweetBackground.width });
            world.tweetAlertLabel.attr({ x: world.tweetLabel.x });

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

        world.btnQuit = world.topBar.getChildByName("btnQuit");
        world.btnSettings = world.topBar.getChildByName("btnSettings");
        world.btnSound = world.topBar.getChildByName("btnSound");
        world.btnPause = world.topBar.getChildByName("btnPause");
        world.btnPlay = world.topBar.getChildByName("btnPlay");
        world.btnFF = world.topBar.getChildByName("btnFF");
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnQuit"), function() {
            gameParams.state = GAME_STATES.PAUSED;

            world.showMessageBoxOK(world.node.parent, "Quit Game", "", 
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
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnSettings"), function() {

            gameParams.state = GAME_STATES.PAUSED;

            cc.sys.localStorage.greyscale = !(cc.sys.localStorage.greyscale == 'true');
            gameParams.greyscale = cc.sys.localStorage.greyscale;

            if (gameParams.greyscale == 'true') {
                world.backgroundGreyscale.opacity = (255);
                world.backgroundColour.opacity = (0);
            }
            else {
                world.backgroundGreyscale.opacity = (0);
                world.backgroundColour.opacity = (255);
            }
                // world.background.spriteFrame = '';
            
            gameParams.state = GAME_STATES.STARTED;
        });

        world.handleMouseTouchEvent(world.topBar.getChildByName("btnSound"), function() {
            gameParams.state = GAME_STATES.PAUSED;

            world.showMessageBoxOK(world.node.parent, "Sound", "Not yet implemented", 
                "OK", () => {
                
                    gameParams.state = GAME_STATES.STARTED;

                });

        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPause"), function() {
            gameParams.state = GAME_STATES.PAUSED;
            world.btnPause.enabled = false;
            world.btnPlay.enabled = true;
            world.btnFF.enabled = true;            
        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnPlay"), function() {
            world.updateTimeVars(MONTH_INTERVAL);
            gameParams.state = GAME_STATES.STARTED;
            world.btnPause.enabled = true;
            world.btnPlay.enabled = false;
            world.btnFF.enabled = true;            
        });
        world.handleMouseTouchEvent(world.topBar.getChildByName("btnFF"), function() {
            world.updateTimeVars(MONTH_INTERVAL_FF);
            gameParams.state = GAME_STATES.STARTED;
            world.btnPause.enabled = true;
            world.btnPlay.enabled = true;
            world.btnFF.enabled = false;            
        });



        let btnDesignPolicy = world.node.getChildByName("bottomBar").getChildByName("btnDesignPolicy");
        let btnStats = world.node.getChildByName("bottomBar").getChildByName("btnStats");
        let designPolicy = cc.director.getScene().getChildByName("layerDesignPolicy");
        let resourceScore = cc.director.getScene().getChildByName("resourceScoreBackground");
        let stats = cc.director.getScene().getChildByName("layerStats");

        // Set ordering
        designPolicy.zIndex = -1;
        stats.zIndex = -1;
        resourceScore.zIndex = 101;

        btnDesignPolicy.on(cc.Node.EventType.TOUCH_END, function() {
            gameParams.state = GAME_STATES.PAUSED;
            designPolicy.zIndex = 100;
        });
        let btnDesignPolicyQuit = designPolicy.getChildByName("btnDesignPolicyQuit");
        btnDesignPolicyQuit.on(cc.Node.EventType.TOUCH_END, function() {
            gameParams.state = GAME_STATES.STARTED;
            designPolicy.zIndex = -1;
        }, btnDesignPolicyQuit);

        btnStats.on(cc.Node.EventType.TOUCH_END, function() {
            gameParams.state = GAME_STATES.PAUSED;
            stats.zIndex = 102;
        }, btnStats);
        let btnStatsQuit = stats.getChildByName("btnStatsQuit");
        btnStatsQuit.on(cc.Node.EventType.TOUCH_END, function() {
            gameParams.state = GAME_STATES.STARTED;
            stats.zIndex = -1;
        }, btnStatsQuit);

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

            // if (err == null) {
                world.singleColor = asset;
            // }
        });

        var url = cc.url.raw('resources/scripts/json-equal-greyscale.json');
        cc.loader.load( url, function( err, res) {
            // cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify( res ) );
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
                        sp.materials = [world.material];
                        sp.setMaterial(0, world.material);
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

    },

    start () {
        console.log(this._time);
    },

    update (dt) {
        // console.log(this._time, dt);
        this._time += dt;
        // this.material.u_percentageLoss = this.material.u_time % 100.0;
        this.material.setProperty('time', this._time);
        this.material.setProperty('u_percentageLoss', Math.sin(this._time) * 100.0);
        this.material.setProperty('u_percentagePreparedness', Math.cos(this._time) * 100.0);
        
    },
});
