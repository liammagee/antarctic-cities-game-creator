// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import { Resources } from './Resources';
import { Point, CrisisCountry, Shader, AutomatedScript, GameState, Country, Place, World } from './World';
import { Colors } from './Colors';

class TimedNode extends cc.Node {
    placedAt: number = 0.0
    id: number = 0.0
}



@ccclass
export default class GameController extends cc.Component {

    @property({
        type: cc.AudioClip// use 'type:' to declare Texture2D object directly
    })
    audio: cc.AudioClip = null;
    @property(cc.Material)
    defaultMaterial: cc.Material = null;
    @property(cc.Material)
    countryMaterial: cc.Material = null;
    @property(cc.Material)
    materialA: cc.Material = null;
    @property(cc.Material)
    materialB: cc.Material = null;
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

    controller: GameController = null;
    world: World = null;

    _time: number = 0;
    colors: Colors = new Colors()
    res: Resources = new Resources()
    countries: Country[] = []
    automateID: number = 0
    automateScripts: AutomatedScript[] = []

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


    /**
     * Tests whether a point is inside the points that outline a given geometric shape.
     */
    collisionDetection(points, test) {

        let crossed = false;

        // Double check the detection is within the widest bounds
        let maxx = Math.max(...points.map(p => p.x));

        for (let i = 0; i < points.length; i++) {

            let p1 = points[i];
            let p2 = (i == points.length - 1) ? points[0] : points[i + 1];

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
     * Message box
     * @param {*} parent 
     * @param {*} title
     * @param {*} message 
     * @param {*} prompt 
     * @param {*} callback 
     */
    showMessageBox(parent, title, message, prompt1, callback1, prompt2, callback2) {

        let controller = this.controller;

        controller.world.gameState.modal = true;
        controller.world.gameState.state = controller.world.res.GAME_STATES.PAUSED;
        controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).pause();

        controller.messageBox.zIndex = 104;
        controller.messageBox.opacity = 255;
        let lblTitle = controller.messageBox.getChildByName("messageBoxTitle").getComponent(cc.Label);
        let lblContents = controller.messageBox.getChildByName("messageBoxContents").getComponent(cc.Label);
        let btn1 = controller.messageBox.getChildByName("btn1").getComponent(cc.Button);
        let btn2 = controller.messageBox.getChildByName("btn2").getComponent(cc.Button);
        lblContents = controller.messageBox.getChildByName("messageBoxContents").getComponent(cc.Label);
        lblTitle.string = title;
        lblContents.string = message;
        btn1.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = prompt1;
        btn2.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = prompt2;

        let buttons = [];
        buttons.push(btn1);
        if (message === null || typeof (message) === "undefined" || message === '') {

            if (prompt2 !== undefined) {

                btn1.node.x = -0.25 * controller.messageBox.width;
                btn2.node.x = 0.25 * controller.messageBox.width;
                btn2.node.opacity = 255;
                btn2.interactable = true;
                btn2.enabled = true;
                buttons.push(btn2);

            }
            else {

                btn1.node.x = 0.0 * controller.messageBox.width;
                btn2.node.opacity = 0;
                btn2.interactable = false;
                btn2.enabled = false;

            }
        }
        else {

            if (prompt2 !== undefined) {

                btn1.node.x = -0.2 * controller.messageBox.width;
                btn2.node.x = 0.2 * controller.messageBox.width;
                btn2.node.opacity = 255;
                btn2.interactable = true;
                btn2.enabled = true;
                buttons.push(btn2);

            }
            else {

                btn1.node.x = 0.0 * controller.messageBox.width;
                btn2.node.opacity = 0;
                btn2.interactable = false;
                btn2.enabled = false;

            }

        }

        let btn1Func = (event) => {

            controller.messageBox.opacity = 0;
            controller.messageBox.zIndex = -1;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            controller.world.gameState.modal = false;
            callback1();
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();
            event.stopPropagation();

        };
        btn1.node.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);

        let btn2Func = (event) => {

            controller.messageBox.opacity = 0;
            controller.messageBox.zIndex = -1;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.node.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            //parent.node.resumeAllActions(); 
            controller.world.gameState.modal = false;
            callback2();
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();
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
    showGameOverBox(parent, title, message, prompt1, callback1, prompt2, callback2) {

        let controller = this.controller;
        let world = this.world;

        controller.world.gameState.modal = true;
        controller.world.gameState.state = controller.world.res.GAME_STATES.PAUSED;

        let layerGameOver = controller.node.parent.getChildByName('layerGameOver');
        layerGameOver.zIndex = 104;
        layerGameOver.opacity = 255;
        let lblTitle = layerGameOver.getChildByName("messageBoxTitle").getComponent(cc.Label);
        let lblStatusHeading = layerGameOver.getChildByName("statusHeading").getComponent(cc.Label);
        let lblContents = layerGameOver.getChildByName("messageBoxContents").getComponent(cc.RichText);
        let graphHolder = layerGameOver.getChildByName('graphHolder');
        let statsContent = layerGameOver.getChildByName('statsContent').getComponent(cc.RichText);
        let btn1 = layerGameOver.getChildByName("btn1").getComponent(cc.Button);

        // btn1.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = prompt1;

        // Title
        lblTitle.string = title;

        // Narrative
        lblStatusHeading.string = `The Story in ${world.gameState.currentDate.getFullYear()}...`;
        lblContents.string = message;

        // Add graph
        this.drawGraph(graphHolder);
        
        // Add policies
        let policyIds : Map<string, string> = new Map<string, string>();
        world.res.RESOURCES.economic.policyOptions.map((opt)    => { policyIds[opt.id] = opt.eng.text; });
        world.res.RESOURCES.politics.policyOptions.map((opt)    => { policyIds[opt.id] = opt.eng.text; });
        world.res.RESOURCES.cultural.policyOptions.map((opt)    => { policyIds[opt.id] = opt.eng.text; });
        world.res.RESOURCES.ecology.policyOptions.map((opt)     => { policyIds[opt.id] = opt.eng.text; });
        let policyString = Object.entries(world.gameState.policies).map((entry) => { return `<i>${policyIds[entry[0]]}</i> <b>(${entry[1]})</b>`;  }).join(', ');
        policyString = policyString.length === 0 ? '(no policies)' : policyString; 
        policyString = `These were the policies you chose: ${policyString}`;
        let statsString = policyString;
        statsString += `\n\nThe world experienced ${world.gameState.crisisCount} crises.`;

        let y1 = 0, y2 = 0, ml = 0, mp = 0;
        Object.entries(world.gameState.stats).forEach((a) => {
            let year = parseInt(a[0]);
            let loss = a[1].loss;
            if (loss > ml) {
                ml = loss;
                y1 = year;
            }
            let prepared = a[1].prepared;
            if (prepared > mp) {
                mp = prepared;
                y2 = year;
            }
                
        })
        statsString += `\n\nEnvironmental loss peaked in ${y1}, while preparedness peaked in ${y2}.`
        if (world.gameState.totalLoss > 20) {

            statsString += `\n\n<color=#99cc66>Hint: Try a different mix of resources next time!</color>`;

        }
        else {

            statsString += `\n\n<color=#99cc66>You're a great policy maker! Could another set of policies work next time?</color>`;

        }
        statsContent.string = statsString;


        let btn1Func = (event) => {

            layerGameOver.opacity = 0;
            layerGameOver.zIndex = -1;
            btn1.node.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            //parent.node.resumeAllActions(); 
            controller.world.gameState.modal = false;
            callback1();
            event.stopPropagation();

        };
        btn1.node.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);

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

        let controller = this.controller;

        controller.world.gameState.modal = true;
        controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).pause();
        controller.world.gameState.state = controller.world.res.GAME_STATES.PAUSED;

        controller.quizBox.zIndex = 104;
        cc.tween(controller.quizBox).to(0.5, { position: cc.v2(0, 0) }, { easing: 'backOut'}).start();
        
        controller.quizBox.getChildByName("quizTitle").getComponent(cc.Label).string = title;
        controller.quizBox.getChildByName("quizContents").getComponent(cc.RichText).string = message;

        let btn1 = controller.quizBox.getChildByName("btn1");
        let btn2 = controller.quizBox.getChildByName("btn2");

        if (Math.random() > 0.5) {

            let tmp = btn2;
            btn2 = btn1;
            btn1 = tmp;

        }

        btn1.getChildByName("Background").getChildByName("optContents").getComponent(cc.RichText).string = rightAnswer;
        btn2.getChildByName("Background").getChildByName("optContents").getComponent(cc.RichText).string = wrongAnswer;

        let btn1Func = (event) => {

            cc.tween(controller.quizBox).to(0.5, { position: cc.v2(0, -750) }, { easing: 'backIn'}).start();

            controller.world.gameState.modal = false;
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();
            event.stopPropagation();

            controller.showMessageBox(parent, "CRISIS RESPONSE", "Great response to this crisis!", "OK!", function () {

                const res = Math.floor(1 + Math.random() * 3);
                controller.world.gameState.resources += res;

                controller.world.gameState.state = controller.world.res.GAME_STATES.STARTED;

            }, undefined, undefined);

        };
        btn1.getChildByName('button').on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);

        let btn2Func = (event) => {

            cc.tween(controller.quizBox).to(0.5, { position: cc.v2(0, -750) }, { easing: 'backIn'}).start();

            controller.world.gameState.modal = false;
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();
            event.stopPropagation();

            controller.showMessageBox(parent, "CRISIS RESPONSE", "Good try, but this won't be enough to preserve the future of Antarctica!", "OK!", function () {

                const res = Math.floor(1 + Math.random() * 3);
                if (controller.world.gameState.resources - res > 0)
                    controller.world.gameState.resources -= res;
                else
                    controller.world.gameState.resources = 0;

                controller.world.gameState.state = controller.world.res.GAME_STATES.STARTED;


            }, undefined, undefined);

        };
        btn2.getChildByName('button').on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

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

        let controller = this.controller;
        let world = this.world;

        world.gameState.modal = true;
        let currentState = world.gameState.state;
        world.gameState.state = world.res.GAME_STATES.PAUSED;
        controller.settingsBox.zIndex = 106;
        cc.tween(controller.settingsBox).by(0.5, { position: cc.v2(0, -750) }, { easing: 'backOut'}).start();

        let content = controller.settingsBox.getChildByName("pageview").getChildByName("view").getChildByName("content"); 
        let page1 = content.getChildByName("page_1"); 
        let page2 = content.getChildByName("page_2"); 

        let btn1 = controller.settingsBox.getChildByName("apply");
        let btn2 = controller.settingsBox.getChildByName("cancel");
        let gs = (cc.sys.localStorage.greyscale == 'true')
        page1.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = gs;
        page1.getChildByName("toggleContainer").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !gs;
        let eng = (cc.sys.localStorage.language == 'eng')
        page1.getChildByName("toggleLanguage").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = eng;
        page1.getChildByName("toggleLanguage").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !eng;
        let countryMask = (cc.sys.localStorage.countryMask === undefined || cc.sys.localStorage.countryMask === 'default')
        page1.getChildByName("toggleCountryMask").getChildByName("toggle1").getComponent(cc.Toggle).isChecked = countryMask;
        page1.getChildByName("toggleCountryMask").getChildByName("toggle2").getComponent(cc.Toggle).isChecked = !countryMask;

        let btn1Func = function (event) {

            // Change background
            let gsChecked = page1.getChildByName("toggleContainer").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;
            cc.sys.localStorage.greyscale = gsChecked;
            world.gameState.greyscale = gsChecked;

            if (gsChecked) {

                controller.backgroundGreyscale.opacity = 255;
                controller.backgroundColour.opacity = 0;
                controller.node.color = new cc.Color(234, 245, 247);

            }
            else {

                controller.backgroundGreyscale.opacity = 0;
                controller.backgroundColour.opacity = 255;
                controller.node.color = controller.colors.COLOR_LICORICE;

            }

            // Change language
            let engChecked = page1.getChildByName("toggleLanguage").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;
            if (engChecked) {
                cc.sys.localStorage.language = 'eng';
            }
            else {
                cc.sys.localStorage.language = 'esp';
            }
            controller.updateLanguageSettings();

            // Change country mask
            let defChecked = page1.getChildByName("toggleCountryMask").getChildByName("toggle1").getComponent(cc.Toggle).isChecked;
            if (defChecked) {
                cc.sys.localStorage.countryMask = 'default';
            }
            else {
                cc.sys.localStorage.countryMask = 'experimental';
            }
            controller.updateCountryMask();

            // Hide settings
            world.gameState.modal = false;
            world.gameState.state = currentState;
            cc.tween(controller.settingsBox).by(0.5, { position: cc.v2(0, 750) }, { easing: 'backIn'}).start();

        };
        btn1.on(cc.Node.EventType.TOUCH_END, btn1Func, btn1);

        let btn2Func = function (event) {

            btn1.off(cc.Node.EventType.TOUCH_END, btn1Func, btn1);
            btn2.off(cc.Node.EventType.TOUCH_END, btn2Func, btn2);
            event.stopPropagation();

            // Hide settings
            world.gameState.modal = false;
            world.gameState.state = currentState;
            cc.tween(controller.settingsBox).by(0.5, { position: cc.v2(0, 750) }, { easing: 'backIn'}).start();

        };
        btn2.on(cc.Node.EventType.TOUCH_END, btn2Func, btn2);

    }

    /**
     * Updates all labels with language-specific settings.
     * Note: Used in preferences to i18n Cocos plugin, since some strings need to be updated dynamically.
     */
    updateLanguageSettings() {

        let controller = this.controller;
        let world = this.world;
        let scene = cc.director.getScene();
        let layout = scene.getChildByName('Canvas').getChildByName('layout');
        let bottomBar = layout.getChildByName('bottomBar');

        bottomBar.getChildByName('btnDesignPolicy').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = world.res.lang.commands_policy[cc.sys.localStorage.language];
        bottomBar.getChildByName('lblLossLabel').getComponent(cc.Label).string = world.res.lang.commands_loss[cc.sys.localStorage.language];
        bottomBar.getChildByName('lblPreparednessLabel').getComponent(cc.Label).string = world.res.lang.commands_prepared[cc.sys.localStorage.language];
        bottomBar.getChildByName('btnStats').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = world.res.lang.commands_stats[cc.sys.localStorage.language];

        world.gameState.messagesNegative = world.res.scenarioData[cc.sys.localStorage.language].messages.negative;
        world.gameState.messagesPositive = world.res.scenarioData[cc.sys.localStorage.language].messages.positive;
        world.gameState.messageOverride = null;

        controller.initPolicyDesign();

    }

    /**
     * Updates country images with new material
     */
    updateCountryMask() {

        let controller = this.controller;
        let world = this.world;
        let scene = cc.director.getScene();
        let layout = scene.getChildByName('Canvas').getChildByName('layout');

        let material: cc.Material = null;
        if (cc.sys.localStorage.countryMask == 'default') {

            // 'B' was experimental...
            controller.countryMaterial = controller.materialB;

        }
        else {

            controller.countryMaterial = controller.materialA;

        }

        controller.loadCountrySprites();
        // Reload country sprites to update actual materials

    }

    loadCountrySprites() {

        let controller = this;
        let world = controller.world;
        let mapBack = controller.node.getChildByName('mapBack');
        // mapBack.removeAllChildren();
        Object.values(controller.countryNodes).forEach((node) => {
            node.removeFromParent();
        });

        // loading all resource in the test assets directory
        cc.loader.loadResDir("countries", cc.SpriteFrame, function (err, assets, urls) {

            for (var i = 0; i < assets.length; i++) {

                const spriteNode = new cc.Node('Sprite ');
                const sp = spriteNode.addComponent(cc.Sprite);
                sp.spriteFrame = assets[i];
                let materialVariant = cc.MaterialVariant.create(controller.countryMaterial, sp);
                materialVariant.setProperty('u_selected', 0.0);
                materialVariant.setProperty('u_percentageLoss', 0.0);
                materialVariant.setProperty('u_percentagePrep', 0.0);
                sp.setMaterial(0, materialVariant);
                let url = urls[i];
                let iso = url.match('/([A-Z]*)_')[1];
                controller.countryNodes[iso] = spriteNode;
                let country = world.countries[iso];
                if (country !== undefined) {

                    spriteNode.setAnchorPoint(0.0, 0.0);
                    spriteNode.setPosition((country.offsetX) - mapBack.x,
                        (cc.winSize.height - (1 * world.res.Y_OFFSET) - country.offsetY) - mapBack.y);
                    spriteNode.parent = mapBack;
                    spriteNode.zIndex = 202;

                }

            }

        });
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

        // xhr.open("POST", "http://43.240.98.94/game_data");
        xhr.open("POST", "/game_data");

        // Set Content-type "text/plain;charset=UTF-8" to post plain text
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // const 

        // Creates a copy, but with certain (verbose) properties emptied out
        let gameLog = Object.assign({}, world.gameState, {

            policyOptions: undefined,
            policyRelations: undefined,
            messagesNegative: undefined,
            messagesPositive: undefined,
            timeoutID: undefined,
            tutorialHints: undefined,
            tutorialInterval: undefined,
            automateScript: undefined,
            countries: []

        });

        let countriesCloned : Country[] = [];
        Object.values(world.countries).forEach(c => {
            let clone = Object.assign({}, c, {

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
                economy: undefined,
                places: undefined

            });

            countriesCloned.push(clone);

        });
        gameLog.countries = countriesCloned;

        xhr.send(JSON.stringify(gameLog));

    }


    /**
     * Game over dialog
     * @param {*} parent 
     * @param {*} message 
     * @param {*} prompt 
     */
    gameOver(parent, message, prompt) {

        let controller = this.controller;
        let world = this.world;

        controller.postResultsToServer();

        // parent.pauseAllActions(); 
        window.clearTimeout(world.gameState.timeoutID);
        world.gameState.state = world.res.GAME_STATES.PAUSED;

        controller.showGameOverBox(parent, "Game Over", message, prompt, function () {

            world.initGameState(cc.sys.localStorage.level,
                cc.sys.localStorage.language,
                cc.sys.localStorage.greyscale,
                cc.sys.isMobile,
                cc.winSize.width,
                cc.winSize.height);

            world.gameState.state = world.res.GAME_STATES.GAME_OVER;
            world.gameState.startCountry = null;
            world.gameState.policies = new Map<number, number>();
            controller.tweetLabel.string = world.gameState.scenarioName;

            cc.director.loadScene("OptionsScene");

        }, undefined, undefined);

    }

    /**
     * A common function for adding mouse/touch events.
     */
    handleMouseTouchEvent(target, callback) {

        if (cc.sys.isMobile) {

            target.on(cc.Node.EventType.TOUCH_START, function (event) {

                target.TOUCHED = true;
                event.stopPropagation();

            }.bind(target));

        }

        target.on(cc.Node.EventType.TOUCH_END, function (event) {

            if (!cc.sys.isMobile || target.TOUCHED) {

                callback(target);
                event.stopPropagation();
                target.TOUCHED = false;

            }

        }.bind(target));

    }

    initControls() {

        let controller = this.controller;
        let world = this.world;

        // Convenience variables
        controller.btnQuit = controller.topBar.getChildByName("btnQuit");
        controller.btnSettings = controller.topBar.getChildByName("btnSettings");
        controller.btnSound = controller.topBar.getChildByName("btnSound");
        controller.btnSnapshot = controller.topBar.getChildByName("btnSnapshot");
        controller.btnPause = controller.topBar.getChildByName("btnPause");
        controller.btnPlay = controller.topBar.getChildByName("btnPlay");
        controller.btnFF = controller.topBar.getChildByName("btnFF");
        controller.tweetLabel = controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Label);
        controller.bottomBar = cc.director.getScene().getChildByName('Canvas').getChildByName("layout").getChildByName("bottomBar");
        controller.countryLabel = controller.bottomBar.getChildByName("lblCountry").getComponent(cc.Label);
        controller.countryLoss = controller.bottomBar.getChildByName("lblLossPercent").getComponent(cc.Label);
        controller.countryLossProgress = controller.bottomBar.getChildByName("progressBarLoss").getComponent(cc.ProgressBar);
        controller.countryAwarePrepared = controller.bottomBar.getChildByName("lblPreparednessPercent").getComponent(cc.Label);
        controller.countryPreparedProgress = controller.bottomBar.getChildByName("progressBarPreparedness").getComponent(cc.ProgressBar);
        controller.resourceScoreLabel = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground").getChildByName("lblResourceScore").getComponent(cc.Label);
        controller.quizBox = cc.director.getScene().getChildByName('Canvas').getChildByName("layerQuizBox");
        controller.settingsBox = cc.director.getScene().getChildByName('Canvas').getChildByName("layerSettings");

        // Handlers
        controller.handleMouseTouchEvent(controller.topBar.getChildByName("btnQuit"), function () {

            world.gameState.modal = true;
            world.gameState.state = world.res.GAME_STATES.PAUSED;

            controller.showMessageBox(controller.node.parent, "Quit Game", '',
                "Quit Game", () => {

                    controller.postResultsToServer();

                    world.gameState.state = world.res.GAME_STATES.GAME_OVER;
                    // cc.director.loadScene("LoadingScene");
                    cc.director.loadScene("OptionsScene");

                },
                "Return to Game", () => {

                    world.gameState.modal = false;
                    world.gameState.state = world.res.GAME_STATES.STARTED;

                });
        });
        controller.topBar.getChildByName("btnSettings").on(cc.Node.EventType.TOUCH_END, function () {

            controller.showSettingsBox();

        }, this);

        controller.handleMouseTouchEvent(controller.topBar.getChildByName("btnSound"), function () {

            controller.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = !(cc.sys.localStorage.isPlaying == "true");
            if (cc.sys.localStorage.isPlaying == "true") {

                cc.sys.localStorage.isPlaying = false;
                cc.audioEngine.pauseAll();

            }
            else {

                cc.sys.localStorage.isPlaying = true;
                cc.audioEngine.resumeAll();
                controller.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = true;

            }

        });
        controller.topBar.getChildByName("btnSnapshot").on(cc.Node.EventType.TOUCH_END, function () {

            world.gameState.state = world.res.GAME_STATES.PAUSED;

            controller.snapshot();

            world.gameState.state = world.res.GAME_STATES.STARTED;

        }, this);
        controller.handleMouseTouchEvent(controller.topBar.getChildByName("btnPause"), function () {

            if (world.gameState.state === world.res.GAME_STATES.PAUSED)
                return;

            world.gameState.state = world.res.GAME_STATES.PAUSED;
            controller.btnPause.getComponent(cc.Button).interactable = false;
            controller.btnPlay.getComponent(cc.Button).interactable = true;
            controller.btnFF.getComponent(cc.Button).interactable = true;
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).pause();

        });
        controller.handleMouseTouchEvent(controller.topBar.getChildByName("btnPlay"), function () {

            world.updateTimeVariables(world.res.MONTH_INTERVAL);
            world.gameState.state = world.res.GAME_STATES.STARTED;
            controller.btnPause.getComponent(cc.Button).interactable = true;
            controller.btnPlay.getComponent(cc.Button).interactable = false;
            controller.btnFF.getComponent(cc.Button).interactable = true;
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();

        });
        controller.handleMouseTouchEvent(controller.topBar.getChildByName("btnFF"), function () {

            world.updateTimeVariables(world.res.MONTH_INTERVAL_FF);
            world.gameState.state = world.res.GAME_STATES.STARTED;
            controller.btnPause.getComponent(cc.Button).interactable = true;
            controller.btnPlay.getComponent(cc.Button).interactable = true;
            controller.btnFF.getComponent(cc.Button).interactable = false;
            controller.topBar.getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet").getComponent(cc.Animation).resume();

        });


        let btnDesignPolicy = controller.node.getChildByName("bottomBar").getChildByName("btnDesignPolicy");
        let btnStats = controller.node.getChildByName("bottomBar").getChildByName("btnStats");
        let designPolicy = cc.director.getScene().getChildByName('Canvas').getChildByName("layerDesignPolicy");
        let resourceScore = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground");
        let stats = cc.director.getScene().getChildByName('Canvas').getChildByName("layerStats");
        stats.zIndex = 105;

        // Add handling for bottom bar buttons
        let currentState = world.gameState.state;
        btnDesignPolicy.on(cc.Node.EventType.TOUCH_END, () => {

            if (world.gameState.state !== world.res.GAME_STATES.STARTED && 
                world.gameState.state !== world.res.GAME_STATES.PAUSED && 
                world.gameState.state !== world.res.GAME_STATES.PAUSED_TUTORIAL)
                return;

            currentState = world.gameState.state;
            controller.showPolicyDesign();

        });
        let btnDesignPolicyQuit = designPolicy.getChildByName("btnDesignPolicyQuit");
        btnDesignPolicyQuit.on(cc.Node.EventType.TOUCH_END, () => {
            
            world.gameState.modal = false;
            world.gameState.state = currentState;
            cc.tween(designPolicy).by(0.5, { position: cc.v2(-1334, 0) }, { easing: 'backIn'}).start();
            resourceScore.zIndex = 101;

        }, btnDesignPolicyQuit);

        btnStats.on(cc.Node.EventType.TOUCH_END, () => {

            if (world.gameState.state !== world.res.GAME_STATES.STARTED && 
                world.gameState.state !== world.res.GAME_STATES.PAUSED && 
                world.gameState.state !== world.res.GAME_STATES.PAUSED_TUTORIAL)
                return;

            currentState = world.gameState.state;
            controller.showStatsBox();

        }, btnStats);

        let btnStatsQuit = stats.getChildByName("btnStatsQuit");
        btnStatsQuit.on(cc.Node.EventType.TOUCH_END, () => {

            world.gameState.modal = false;
            world.gameState.state = currentState;
            cc.tween(stats).by(0.5, { position: cc.v2(1334, 0) }, { easing: 'backIn'}).start();

        }, btnStatsQuit);

        // Update tweet label
        controller.tweetLabel.string = world.gameState.scenarioName;

    }


    initPolicyDesign() {

        let controller = this.controller;
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
        btnEconomy.getChildByName("Label").color = controller.colors.COLOR_UMBER;

        let allButtons = [btnEconomy, btnPolitics, btnCulture, btnEcology];
        let prevButton = btnEconomy;
        const pageCount = 4;
        let currentOptNode = null;

        // Changes buttons with switching pages
        const switchPage = (btn, index) => {

            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = controller.colors.COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {

                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = controller.colors.COLOR_ICE;

            }

            prevButton = btn;

            policyLabel.opacity = 0;
            const policyGeneralLabel = world.res.lang.policy_platform_hint[cc.sys.localStorage.language];
            policyDescription.getComponent(cc.Label).string = policyGeneralLabel;
            policyCostLabel.opacity = 0;
            btnPolicyInvest.opacity = 0;

        };

        const makeButton = function (text, point, index) {

            let btn = allButtons[index];
            btn.getChildByName("Label").getComponent(cc.Label).string = text;

            btn.on(cc.Node.EventType.TOUCH_END, function (event) {
                switchPage(btn, index);
            }, layerDesignPolicy);

            // Select the first button only
            if (index == 0) {

                btn.getComponent(cc.Button).interactable = false;
                btn.getChildByName("Label").color = controller.colors.COLOR_UMBER;
                prevButton = btn;

            }

            return btn;

        };

        //btnPolicyInvest.off(cc.Node.EventType.TOUCH_END);
        btnPolicyInvest.on(cc.Node.EventType.TOUCH_END, () => {

            let policySelected = btnPolicyInvest['policy'];
            const cost = world.costCalculation(policySelected);
            let tmp = parseInt(policySelected.id) - 1;
            let i = Math.floor(tmp / 4);
            let j = tmp % 4;
            let page = pageView.node.getChildByName("view").getChildByName("content").children[i];
            let optNode = page.getChildByName(`opt_${i}_${j}`);
            
            if (world.gameState.resources - cost >= 0 &&
                world.gameState.policies[policySelected.id] === undefined) {

                world.gameState.resources -= cost;
                world.gameState.policies[policySelected.id] = 1;
                resourceScoreLabel.string = (world.gameState.resources.toString());
                let btnNode = optNode.getChildByName(`btnLvl1_${i}_${j}`);
                btnNode.color = controller.colors.COLOR_UMBER;

            }
            else if (world.gameState.resources - cost >= 0 &&
                world.gameState.policies[policySelected.id] === 1) {

                world.gameState.resources -= cost;
                world.gameState.policies[policySelected.id] = 2;
                resourceScoreLabel.string = (world.gameState.resources.toString());
                let btnNode = optNode.getChildByName(`btnLvl2_${i}_${j}`);
                btnNode.color = controller.colors.COLOR_UMBER;

            }
            else if (world.gameState.resources - cost >= 0 &&
                world.gameState.policies[policySelected.id] == 2) {

                world.gameState.resources -= cost;
                world.gameState.policies[policySelected.id] = 3;
                resourceScoreLabel.string = (world.gameState.resources.toString());
                let btnNode = optNode.getChildByName(`btnLvl3_${i}_${j}`);
                btnNode.color = controller.colors.COLOR_UMBER;

            }

            let newCost = world.costCalculation(policySelected);
            policyCostLabel.getComponent(cc.Label).string = (world.res.lang.policy_platform_cost[cc.sys.localStorage.language] + newCost.toString());

            if (world.gameState.policies[policySelected.id] == 3) {

                btnPolicyInvest.getComponent(cc.Button).interactable = false;
                btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = (world.res.lang.policy_platform_completed[cc.sys.localStorage.language]);

            }
            else if (newCost <= world.gameState.resources) {

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

        });


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
                optNode.name = `opt_${i}_${j}`;
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
                btnNodeBgd.color = controller.colors.COLOR_ICE;
                cc.loader.loadRes(opt.img_normal, cc.SpriteFrame, function (err, sfNormal) {
                    const btnBgd = btnNodeBgd.addComponent(cc.Sprite);
                    btnBgd.setMaterial(1, controller.defaultMaterial);
                    btnBgd.spriteFrame = sfNormal;
                });

                let btnLabelNode = new cc.Node();
                btnLabelNode.name = "Label";
                btnLabelNode.color = controller.colors.COLOR_ICE;
                const btnLabel = btnLabelNode.addComponent(cc.Label);
                btnLabel.string = opt[cc.sys.localStorage.language].text;
                btnLabel.font = controller.titleFont;
                btnLabel.fontSize = 20;
                btnLabel.verticalAlign = cc.Label.VerticalAlign.BOTTOM
                btnLabelNode.setPosition(0, 0);
                btnLabelNode.setAnchorPoint(0.0, 0.0);
                btnLabelNode.setContentSize(optNode.width, optNode.height * 0.1);
                btnLabelNode.parent = optNode;

                const policySelector = (event) => {

                    policyLabel.getComponent(cc.Label).string = (opt[cc.sys.localStorage.language].text_long);
                    policyDescription.getComponent(cc.Label).string = (opt[cc.sys.localStorage.language].description);

                    const cost = world.costCalculation(opt);
                    policyCostLabel.getComponent(cc.Label).string = world.res.lang.policy_platform_cost[cc.sys.localStorage.language] + cost.toString();
                    btnPolicyInvest.attr({ 'policy': opt });

                    if (world.gameState.policies[opt.id] == 3) {

                        btnPolicyInvest.getComponent(cc.Button).interactable = false;
                        btnPolicyInvest.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = world.res.lang.policy_platform_completed[cc.sys.localStorage.language];

                    }
                    else if (cost <= world.gameState.resources) {

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
                        currentOptNode.getChildByName("Background").color = controller.colors.COLOR_ICE;
                        currentOptNode.getChildByName("Label").color = controller.colors.COLOR_ICE;
                    }
                    currentOptNode = optNode;

                };

                const enterBtn = function (event) {
                    // if (!optNode.enabled)
                    //     return;
                    btnNodeBgd.color = controller.colors.COLOR_UMBER;
                    btnLabelNode.color = controller.colors.COLOR_UMBER;
                };
                const exitBtn = function (event) {
                    if (currentOptNode == optNode)
                        return;
                    btnNodeBgd.color = controller.colors.COLOR_ICE;
                    btnLabelNode.color = controller.colors.COLOR_ICE;
                };

                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.TOUCH_END, policySelector, optNode); });
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_ENTER, enterBtn, optNode); });
                [optNode, btnNodeBgd, btnLabelNode].forEach((node) => { node.on(cc.Node.EventType.MOUSE_LEAVE, exitBtn, optNode); });

                let btnLvl1Node = new cc.Node();
                btnLvl1Node.name = `btnLvl1_${i}_${j}`;
                let btnLvl1 = btnLvl1Node.addComponent(cc.Sprite);
                btnLvl1.spriteFrame = controller.dotOff;
                btnLvl1.setMaterial(1, controller.defaultMaterial);
                let btnLvl2Node = new cc.Node();
                btnLvl2Node.name = `btnLvl2_${i}_${j}`;
                let btnLvl2 = btnLvl2Node.addComponent(cc.Sprite);
                btnLvl2.spriteFrame = controller.dotOff;
                btnLvl2.setMaterial(1, controller.defaultMaterial);
                let btnLvl3Node = new cc.Node();
                btnLvl3Node.name = `btnLvl3_${i}_${j}`;
                let btnLvl3 = btnLvl3Node.addComponent(cc.Sprite);
                btnLvl3.spriteFrame = controller.dotOff;
                btnLvl3.setMaterial(1, controller.defaultMaterial);

                if (world.gameState.policies[opt.id] === undefined) {

                    // btnLvl1.spriteFrame = controller.dotOff;
                    // btnLvl2.spriteFrame = controller.dotOff;
                    // btnLvl3.spriteFrame = controller.dotOff;

                }
                else if (world.gameState.policies[opt.id] === 1) {

                    btnLvl1.node.color = controller.colors.COLOR_UMBER;
                    // btnLvl1.spriteFrame = controller.dotOn;
                    // btnLvl2.spriteFrame = controller.dotOff;
                    // btnLvl3.spriteFrame = controller.dotOff;

                }
                else if (world.gameState.policies[opt.id] === 2) {

                    btnLvl1.node.color = controller.colors.COLOR_UMBER;
                    btnLvl2.node.color = controller.colors.COLOR_UMBER;
                    // btnLvl1.spriteFrame = controller.dotOn;
                    // btnLvl2.spriteFrame = controller.dotOn;
                    // btnLvl3.spriteFrame = controller.dotOff;

                }
                else if (world.gameState.policies[opt.id] === 3) {

                    btnLvl1.node.color = controller.colors.COLOR_UMBER;
                    btnLvl2.node.color = controller.colors.COLOR_UMBER;
                    btnLvl3.node.color = controller.colors.COLOR_UMBER;
                    // btnLvl1.spriteFrame = controller.dotOn;
                    // btnLvl2.spriteFrame = controller.dotOn;
                    // btnLvl3.spriteFrame = controller.dotOn;

                }

                btnLvl1Node.setPosition(0, 50);
                btnLvl1Node.setContentSize(25, 25);
                btnLvl1Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl2Node.setPosition(0, btnLvl1Node.y + 35);
                btnLvl2Node.setContentSize(25, 25);
                btnLvl2Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl3Node.setPosition(0, btnLvl2Node.y + 35);
                btnLvl3Node.setAnchorPoint(new cc.Vec2(0.0, 0.0));
                btnLvl3Node.setContentSize(25, 25);
                btnLvl1Node.parent = optNode;
                btnLvl2Node.parent = optNode;
                btnLvl3Node.parent = optNode;

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
        }, controller);

    }

    showPolicyDesign() {

        let controller = this.controller;
        let world = this.world;
        let designPolicy = cc.director.getScene().getChildByName('Canvas').getChildByName("layerDesignPolicy");
        let resourceScore = cc.director.getScene().getChildByName('Canvas').getChildByName("resourceScoreBackground");

        world.gameState.modal = true;
        world.gameState.state = world.res.GAME_STATES.PAUSED;
        designPolicy.zIndex = 105;
        resourceScore.zIndex = 106;
        cc.tween(designPolicy).by(0.5, { position: cc.v2(1334, 0) }, { easing: 'backOut'}).start();

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

    }

    initStats() {

        let controller = this.controller;
        let world = this.world;

        let layerStats = cc.director.getScene().getChildByName('Canvas').getChildByName("layerStats");

        let pageView = layerStats.getChildByName("pageview").getComponent(cc.PageView);

        // Switch pages
        let btnWorld = layerStats.getChildByName("btnWorld");
        let btnCountries = layerStats.getChildByName("btnCountries");
        let btnTrends = layerStats.getChildByName("btnTrends");

        pageView.setCurrentPageIndex(0);
        btnWorld.getComponent(cc.Button).interactable = false;
        btnWorld.getChildByName("Label").color = controller.colors.COLOR_UMBER;

        let allButtons = [btnWorld, btnCountries, btnTrends];
        let prevButton = btnWorld;

        const switchPage = (btn, index) => {

            pageView.setCurrentPageIndex(index);
            btn.getComponent(cc.Button).interactable = false;
            btn.getChildByName("Label").color = controller.colors.COLOR_UMBER;

            if (prevButton != null && prevButton != btn) {

                prevButton.getComponent(cc.Button).interactable = true;
                prevButton.getChildByName("Label").color = controller.colors.COLOR_ICE;

            }

            prevButton = btn;

        };

        btnWorld.on(cc.Node.EventType.TOUCH_END, function (event) {
            switchPage(btnWorld, 0);
        });
        btnCountries.on(cc.Node.EventType.TOUCH_END, function (event) {
            switchPage(btnCountries, 1);
        });
        btnTrends.on(cc.Node.EventType.TOUCH_END, function (event) {
            switchPage(btnTrends, 2);
        });

        pageView.node.on('page-turning', function (pv) {
            let index = pv.getCurrentPageIndex();
            let btn = allButtons[index];
            switchPage(btn, index);
        }, world);
    }

    drawSegment(graphics, pt1, pt2, width, color) {
        graphics.lineWidth = width;
        graphics.strokeColor = color;
        graphics.fillColor = color;
        graphics.moveTo(pt1.x, pt1.y);
        graphics.lineTo(pt2.x + 1, pt2.y);
        graphics.stroke();
        graphics.fill();

    };

    makeString(num) { return (Math.round(num * 10) / 10).toString() + '%'; };

    showStatsBox() {

        let controller = this.controller;
        let world = this.world;
        let stats = cc.director.getScene().getChildByName('Canvas').getChildByName("layerStats");

        world.gameState.modal = true;
        world.gameState.state = world.res.GAME_STATES.PAUSED;
        cc.tween(stats).by(0.5, { position: cc.v2(-1334, 0) }, { easing: 'backOut'}).start();
        stats.zIndex = 105;

        let page1 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_1");
        let page2 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_2");
        let page3 = stats.getChildByName("pageview").getChildByName("view").getChildByName("content").getChildByName("page_3");

        // World
        page1.getChildByName("lblYear").getComponent(cc.Label).string = world.res.lang.stats_year[cc.sys.localStorage.language] + world.gameState.currentDate.getFullYear();
        page1.getChildByName("lblYearMessage").getComponent(cc.Label).string = world.res.lang.stats_year_message_a[cc.sys.localStorage.language] + (world.gameState.targetDate.getFullYear() - world.gameState.currentDate.getFullYear()) + world.res.lang.stats_year_message_b[cc.sys.localStorage.language];
        page1.getChildByName("lblLoss").getComponent(cc.Label).string = world.res.lang.stats_loss[cc.sys.localStorage.language];
        page1.getChildByName("lblLossMessage").getComponent(cc.Label).string = world.res.lang.stats_loss_message_a[cc.sys.localStorage.language] + world.gameState.startDate.getFullYear() + world.res.lang.stats_loss_message_b[cc.sys.localStorage.language] + this.makeString(world.gameState.totalLoss) + ".";
        page1.getChildByName("lblPreparedness").getComponent(cc.Label).string = world.res.lang.stats_preparedness[cc.sys.localStorage.language] + this.makeString(world.gameState.populationPreparedPercent) + " / " + Math.round(world.gameState.populationPrepared / 1000000) + "M";
        let pd = world.res.lang.stats_preparedness_message_a[cc.sys.localStorage.language] + this.makeString(world.gameState.populationPreparedPercent) + world.res.lang.stats_preparedness_message_b[cc.sys.localStorage.language];
        page1.getChildByName("lblPreparednessMessage").getComponent(cc.Label).string = pd;

        // Countries
        // Sort countries
        const countriesSorted = Object.values(world.countries).sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        let txtCountry = '', txtLoss = '', txtPreparedness = '';

        let content = page2.getChildByName("scrollview").getChildByName("view").getChildByName("content");
        // content.destroyAllChildren();

        if (content.childrenCount === 0) {

            let counter = 0;
            countriesSorted.forEach((country) => {
                counter++;
                let color = country.loss > 20 ? controller.colors.COLOR_RED : (country.pop_prepared_percent > 20 ? controller.colors.COLOR_GREEN : controller.colors.COLOR_ICE);

                let cn = new cc.Node();
                let cnl = cn.addComponent(cc.Label);
                cn.color = color;
                cnl.string = country.name;
                cnl.fontSize = 20;
                cnl.font = controller.titleFont;
                cnl.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                cn.setAnchorPoint(0, 0);
                cn.x = 0;
                cn.y = -40 + counter * -24;
                cn.parent = content;

                let cnln = new cc.Node();
                let cnll = cnln.addComponent(cc.Label);
                cnln.color = color;
                cnll.string = this.makeString(country.loss);
                cnll.fontSize = 20;
                cnll.font = controller.titleFont;
                cnll.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                cnln.setAnchorPoint(1, 0);
                cnln.x = 580;
                cnln.y = -40 + counter * -24;
                cnln.parent = content;

                let cnpn = new cc.Node();
                let cnlp = cnpn.addComponent(cc.Label);
                cnpn.color = color;
                cnlp.string = this.makeString(country.pop_prepared_percent);
                cnlp.fontSize = 20;
                cnlp.font = controller.titleFont;
                cnlp.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                cnpn.setAnchorPoint(1, 0);
                cnpn.x = 780;
                cnpn.y = -40 + counter * -24;
                cnpn.parent = content;

            });
        }
        else {
            let counter = 0;
            countriesSorted.forEach((country) => {

                let color = country.loss > 20 ? controller.colors.COLOR_RED : (country.pop_prepared_percent > 20 ? controller.colors.COLOR_GREEN : controller.colors.COLOR_ICE);

                let lblCountry = content.children[counter * 3 + 0].getComponent(cc.Label);
                let lblLoss = content.children[counter * 3 + 1].getComponent(cc.Label);
                let lblPreparedness = content.children[counter * 3 + 2].getComponent(cc.Label);

                lblCountry.node.color = color;
                lblLoss.node.color = color;
                lblPreparedness.node.color = color;
                lblCountry.string = country.name;
                lblLoss.string = this.makeString(country.loss);
                lblPreparedness.string = this.makeString(country.pop_prepared_percent);

                counter++;

            });
        }

        // Trends
        this.drawGraph(page3);

    }

    drawGraph(parent) {

        let controller = this.controller;
        let world = this.world;

        let drawNode = parent.getChildByName("graph");
        let graphics = drawNode.getComponent(cc.Graphics);
        graphics.clear();
        drawNode.destroyAllChildren();

        let x_o = 0, yP_o = 0, yL_o = 0, x = 0, yP = 0, yL = 0;
        const colorD = new cc.Color(controller.colors.COLOR_RED.r,
            controller.colors.COLOR_RED.g,
            controller.colors.COLOR_RED.b);
        const colorP = new cc.Color(controller.colors.COLOR_GREEN.r,
            controller.colors.COLOR_GREEN.g,
            controller.colors.COLOR_GREEN.b);

        const graphX = 4;
        const graphY = 0;
        const years = world.gameState.targetDate.getFullYear() - world.gameState.startDate.getFullYear();
        let scaleFactor = 0.9;
        const graphIncrementX = parent.width * scaleFactor / years;
        const graphIncrementY = parent.height * scaleFactor / 100;
        const graphOffset = 0;
        const lineOffset = -10;

        this.drawSegment(graphics, new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX + parent.width * scaleFactor, graphOffset + lineOffset), 1, controller.colors.COLOR_ICE);
        this.drawSegment(graphics, new cc.Vec2(graphX, graphOffset + lineOffset), new cc.Vec2(graphX, graphOffset + parent.height * scaleFactor), 1, controller.colors.COLOR_ICE);

        for (let i = world.gameState.startDate.getFullYear(); i < world.gameState.targetDate.getFullYear(); i++) {

            const index = i - world.gameState.startDate.getFullYear();

            const stats = world.gameState.stats[i];

            if (stats === undefined)
                continue;

            const loss = stats.loss;
            const prepared = stats.prepared;
            x = graphX + index * graphIncrementX;
            yL = graphOffset + (100 - Math.round(loss)) * graphIncrementY;
            yP = graphOffset + Math.round(prepared) * graphIncrementY;

            if (index > 0) {

                // Line 
                // drawNode.drawSegment(cc.p(x_o, yL_o), cc.p(x, yL), 2, controller.colors.COLOR_RED);
                // drawNode.drawSegment(cc.p(x_o, yP_o), cc.p(x, yP), 2, controller.colors.COLOR_GREEN);

                // Staircase
                this.drawSegment(graphics, new cc.Vec2(x_o, yL_o), new cc.Vec2(x - 1, yL_o), 1, colorD);
                this.drawSegment(graphics, new cc.Vec2(x, yL_o), new cc.Vec2(x, yL), 1, colorD);
                this.drawSegment(graphics, new cc.Vec2(x_o, yP_o), new cc.Vec2(x - 1, yP_o), 1, colorP);
                this.drawSegment(graphics, new cc.Vec2(x, yP_o), new cc.Vec2(x, yP), 1, colorP);

            }

            x_o = x, yL_o = yL, yP_o = yP;

        }

        let lblDestructionScoreNode = new cc.Node();
        let lblDestructionScore = lblDestructionScoreNode.addComponent(cc.Label);
        lblDestructionScore.string = this.makeString(world.gameState.totalLoss);
        lblDestructionScore.font = controller.titleFont;
        lblDestructionScore.fontSize = 28;
        lblDestructionScoreNode.color = colorD;
        lblDestructionScoreNode.setPosition(4 + graphX + x, graphY + yL);
        lblDestructionScoreNode.setAnchorPoint(0, 0.5);
        lblDestructionScoreNode.parent = drawNode;
        lblDestructionScoreNode.zIndex = 106;
        let lblPolicyScoreNode = new cc.Node();
        let lblPolicyScore = lblPolicyScoreNode.addComponent(cc.Label);
        lblPolicyScore.string = this.makeString(world.gameState.populationPreparedPercent);
        lblPolicyScore.font = controller.titleFont;
        lblPolicyScore.fontSize = 28;
        lblPolicyScoreNode.color = colorP;
        lblPolicyScoreNode.setPosition(4 + graphX + x, graphY + yP);
        lblPolicyScoreNode.setAnchorPoint(0, 0.5);
        lblPolicyScoreNode.parent = drawNode;
        lblPolicyScoreNode.zIndex = 106;

    }

    processResourceSelection(event) {

        let controller = this.controller;
        let world = this.world;

        // Do nothing if game is paused
        if (world.gameState.state === world.res.GAME_STATES.PAUSED)
            return;

        const res = Math.floor(1 + Math.random() * 3);
        world.gameState.resources += res;

        event.target.destroy();

        if (!world.gameState.resourcesAdded) {

            world.gameState.state = world.res.GAME_STATES.PAUSED;
            world.gameState.resourcesAdded = true;

            if (world.gameState.tutorialMode) {

                controller.showMessageBox(world, "HINT:", world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language], "OK!", function () {

                    world.gameState.tutorialHints.push(world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_CLICKED[cc.sys.localStorage.language]);
                    world.gameState.state = world.res.GAME_STATES.STARTED;

                }, undefined, undefined);

            }
            else {

                world.gameState.state = world.res.GAME_STATES.STARTED;

            }
        }

    }

    processCrisisSelection(event) {

        let controller = this.controller;
        let world = this.world;

        // Do nothing if game is paused
        if (world.gameState.state === world.res.GAME_STATES.PAUSED)
            return;

        world.gameState.crisisCountry = null;
        let crisis = null;

        for (let i = 0; i < world.gameState.crises.length; i++) {

            if (world.gameState.crises[i].id == event.target.id) {

                const crisisInCountry = world.gameState.crises[i];
                crisis = world.res.CRISES[crisisInCountry.crisis];
                world.gameState.crises.splice(i, 1);
                break;

            }
        }

        event.target.destroy();

        if (!world.gameState.alertCrisis && world.gameState.tutorialMode) {

            world.gameState.state = world.res.GAME_STATES.PAUSED;
            world.gameState.alertCrisis = true;

            controller.showMessageBox(world,
                world.res.lang.crisis_title[cc.sys.localStorage.language],
                world.res.lang.crisis_message[cc.sys.localStorage.language] + crisis[cc.sys.localStorage.language] + "!", "OK!", function () {

                    world.gameState.state = world.res.GAME_STATES.STARTED;

                }, undefined, undefined);

        }
        else {

            // Add Crisis Quiz
            if (Math.random() < world.res.QUIZ_CHANCE) {

                // Show quiz
                let qindex = Math.floor(Math.random() * world.res.quizzes.length);
                let qi = world.res.quizzes[qindex];

                // Prevent the same quiz question being asked twice
                if (world.gameState.quizzes.indexOf(qindex) > -1)
                    return;

                world.gameState.quizzes.push(qindex);

                let quiz = qi.quiz[cc.sys.localStorage.language];
                let wrong_answer = qi.wrong_answer[cc.sys.localStorage.language];
                let right_answer = qi.right_answer[cc.sys.localStorage.language];
                let title = world.res.lang.crisis_alert[cc.sys.localStorage.language];

                controller.showQuizBox(world, title, quiz, wrong_answer, right_answer);

            }

        }

    }

    /**
     * Update month / year in the interface
     * @param {*} world 
     */
    refreshDate(world: World) {

        let controller = this.controller;

        // world.topBar.getChildByName("lblDay").getComponent(cc.Label).string = (world.gameState.currentDate.getDate()).toString();
        let mth = world.gameState.currentDate.getMonth() + 1;
        let ms = mth < 10 ? '0' + mth.toString() : mth.toString();
        controller.topBar.getChildByName("lblMonth").getComponent(cc.Label).string = ms;
        controller.topBar.getChildByName("lblYear").getComponent(cc.Label).string = (world.gameState.currentDate.getFullYear()).toString();

    }

    /**
     * Show country-level stats.
     */
    printCountryStats() {

        let controller = this.controller;
        let world = this.world;

        const country = world.countries[world.gameState.currentCountry];
        controller.countryLabel.string = (country.name);

        const lossPercent = Math.floor(country.loss);
        const preparedPercent = Math.floor(country.pop_prepared_percent);

        controller.countryLoss.string = (lossPercent + "%");
        controller.countryLossProgress.progress = lossPercent / 100.0;

        if (lossPercent >= world.res.LOSS_TOTAL)
            controller.countryLossProgress.node.opacity = 255;
        else if (lossPercent >= world.res.LOSS_PARTIAL)
            controller.countryLossProgress.node.opacity = 191;
        controller.countryAwarePrepared.string = (preparedPercent + "%");
        // if (preparedPercent >= 20)
        //     controller.countryAwarePrepared.opacity = 255;
        controller.countryPreparedProgress.progress = preparedPercent / 100.0;

    }

    /**
     * Show world-level stats.
     */
    printWorldStats() {

        let controller = this.controller;
        let world = this.world;

        controller.countryLabel.string = (world.res.lang.world_label[cc.sys.localStorage.language]);

        const lossPercent = Math.round(world.gameState.totalLoss);
        const preparedPercent = Math.round(world.gameState.populationPreparedPercent);

        controller.countryLoss.string = (lossPercent + "%");
        controller.countryAwarePrepared.string = (preparedPercent + "%");

        controller.countryLossProgress.progress = lossPercent / 100.0;
        controller.countryPreparedProgress.progress = preparedPercent / 100.0;

    }


    selectCountry(event, location) {

        let controller = this.controller;
        let world = this.world;

        let node = controller.node.getChildByName('mapFront');

        if (world.gameState.state !== world.res.GAME_STATES.PREPARED && world.gameState.state !== world.res.GAME_STATES.STARTED && world.gameState.state !== world.res.GAME_STATES.PAUSED)
            return;

        const target = event.getCurrentTarget();
        const locationInNode = target.convertToNodeSpaceAR(location);
        controller.lastLayerID = -1;

        let start = 0, end = world.sortedObjs.length;
        if (controller.lastLayerID > -1) {

            start = (start < 0) ? 0 : start;
            end = (end > world.sortedObjs.length) ? world.sortedObjs.length : end;

        };

        const ed = (pt1, pt2) => {
            return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
        };

        let minED = -1, selectedCountry = null;
        for (let j = start; j < end; j++) {

            const poly = world.sortedObjs[j];
            const mousePoint = { x: locationInNode.x + node.x, y: cc.winSize.height - locationInNode.y - (1 * world.res.Y_OFFSET) - node.y };
            const cd = controller.collisionDetection(poly.points[0], mousePoint);

            if (cd) {

                controller.lastLayerID = j;
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

            if (world.gameState.currentCountry != null) {

                world.countries[world.gameState.currentCountry].selected = false;

            }
            world.gameState.currentCountry = selectedCountry;

            if (world.gameState.currentCountry != null)
                world.countries[world.gameState.currentCountry].selected = true;
            world.gameState.currentCountry = selectedCountry;

            controller.printCountryStats();

        }
        else {

            if (world.gameState.currentCountry != null)
                world.countries[world.gameState.currentCountry].selected = false;
            world.gameState.currentCountry = null;

            controller.printWorldStats();

        }

        return true;
    }

    /**
     * Generate a policy icon, based on a weighted average of existing policies.
     */
    generatePolicyIcon() {

        let controller = this.controller;
        let world = this.world;

        let policyIndex = world.generateWeightedPolicyIndex(Math.random());
        let icon = '';

        switch (policyIndex) {
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

        let controller = this.controller;
        let world = this.world;

        let map = controller.node.getChildByName('mapFront');

        const btnRes = new TimedNode('Resource');
        const sp = btnRes.addComponent(cc.Sprite);
        const policyIcon = controller.generatePolicyIcon();
        sp.spriteFrame = controller.policyIcons[policyIcon];

        const ind = Math.floor(Math.random() * Object.keys(world.countries).length);
        const countryRand = world.countries[Object.keys(world.countries)[ind]];
        const pt = countryRand.centroid;
        // btnRes.color = controller.colors.COLOR_SKY;
        btnRes.setPosition(pt.x - map.x, (controller.node.height - (1 * world.res.Y_OFFSET)) - pt.y - map.y);// + world.res.RESOURCE_SIZE_H );
        btnRes.setContentSize(cc.size(world.res.RESOURCE_SIZE_W, world.res.RESOURCE_SIZE_H));
        btnRes.placedAt = world.gameState.counter;
        btnRes.setAnchorPoint(0.5, 0.0);
        btnRes.parent = map;
        btnRes.zIndex = 103;
        controller.buttons.push(btnRes);

        btnRes.on(cc.Node.EventType.TOUCH_END, controller.processResourceSelection, this);

        /*
        if (world.gameState.automateMode) {
            
            const r = Math.random();
            if (r < parseFloat(world.gameState.automateScript.resourcesProb)) {

                fireClickOnTarget(btnRes);

            }

        }
        */

        if (!world.gameState.alertResources) {

            if (world.gameState.tutorialMode) {

                world.gameState.state = world.res.GAME_STATES.PAUSED;
                world.gameState.alertResources = true;

                controller.showMessageBox(world, "HINT:", world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language], "OK!", function (that) {

                    world.gameState.tutorialHints.push(world.res.TUTORIAL_MESSAGES.FIRST_RESOURCE_SHOWN[cc.sys.localStorage.language]);
                    //world.gameState.state = world.res.GAME_STATES.STARTED;
                    world.gameState.state = world.res.GAME_STATES.PAUSED_TUTORIAL;

                }, undefined, undefined);

            }

        }

        world.gameState.lastResource = world.gameState.counter;

    }


    /**
     * Add a new crisis.
     */
    addCrisis() {

        let controller = this.controller;
        let world = this.world;

        let map = controller.node.getChildByName('mapFront');

        const r = Math.random();
        const crisisInCountry = world.crisisProbLocation(r);
        if (crisisInCountry === undefined)
            return;

        world.gameState.crisisCountry = crisisInCountry;
        world.gameState.crises.push(crisisInCountry);
        world.gameState.crisisCount++;

        const crisis = world.res.CRISES[crisisInCountry.crisis];
        const country = world.countries[crisisInCountry.country];

        const btnCrisis = new TimedNode('Crisis');
        const sp = btnCrisis.addComponent(cc.Sprite);
        sp.spriteFrame = controller.crisisIcons[crisisInCountry.crisis];

        const pt = country.centroid;
        // btnCrisis.color = controller.colors.COLOR_RED;
        btnCrisis.setPosition(pt.x - map.x, (controller.node.height - (1 * world.res.Y_OFFSET)) - pt.y - map.y);// + world.res.RESOURCE_SIZE_H / 2 );
        btnCrisis.setContentSize(cc.size(world.res.RESOURCE_SIZE_W, world.res.RESOURCE_SIZE_H));
        // btnCrisis.setColor(controller.colors.COLOR_RED);
        btnCrisis.placedAt = world.gameState.counter;
        btnCrisis.setAnchorPoint(0.5, 0.0);
        btnCrisis.id = crisisInCountry.id;
        btnCrisis.name = "crisis" + crisisInCountry.id;
        btnCrisis.parent = map;
        btnCrisis.zIndex = 103;
        controller.buttons.push(btnCrisis);

        btnCrisis.on(cc.Node.EventType.TOUCH_END, controller.processCrisisSelection, this);

        // After the third crisis, add notifications to the news feed
        let message = world.res.lang.crisis_prefix[cc.sys.localStorage.language] +
            crisis[cc.sys.localStorage.language] +
            world.res.lang.crisis_suffix[cc.sys.localStorage.language] +
            country.name + ".";

        if (world.gameState.crisisCount < 4) {

            world.gameState.state = world.res.GAME_STATES.PAUSED;
            message += world.res.lang.crisis_explanation[cc.sys.localStorage.language];

            controller.showMessageBox(world, world.res.lang.crisis_alert[cc.sys.localStorage.language], message, "OK!", (that) => {

                if (world.gameState.tutorialMode)
                    world.gameState.state = world.res.GAME_STATES.PAUSED_TUTORIAL;
                else
                    world.gameState.state = world.res.GAME_STATES.STARTED;

            }, undefined, undefined);

            if (world.gameState.automateMode) {

                //fireClickOnTarget(buttons[0]);

            }

        }
        else {

            // if (world.gameState.messageOverride == null)
            //     world.gameState.messageOverride = message;

        }

        world.gameState.lastCrisis = world.gameState.counter;

    }

    /**
     * Add tutorial.
     */
    addTutorial() {

        let controller = this.controller;
        let world = this.world;

        if (world.gameState.tutorialHints.length < 2 || world.gameState.tutorialHints.length >= 6)
            return;

        world.gameState.state = world.res.GAME_STATES.PAUSED;
        let message = null;
        switch (world.gameState.tutorialHints.length) {
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

        controller.showMessageBox(world, "HINT:", message, "OK", function () {

            world.gameState.tutorialHints.push(message);
            world.gameState.state = world.res.GAME_STATES.STARTED;

        }, undefined, undefined);

    }

    doSim() {

        let controller = this.controller;
        let world = this.world;

        if (world.gameState.startCountry === null || world.gameState.state !== world.res.GAME_STATES.PREPARED)
            return;

        const country = world.countries[world.gameState.startCountry];
        country.policy = 1.0;
        country.affected_chance = 1.0;

        world.gameState.state = world.res.GAME_STATES.STARTED;
        controller.refreshDate(world);
        controller.buttons = [];

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
        node.parent = cc.director.getScene();
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
        let gl = cc.game['_renderContext'];
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
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
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

        let controller = this.controller;
        let world = this.world;

        if (world.countries['AUS'] === undefined)
            return;

        let cities = controller.node.getChildByName('mapFront').getChildByName('cities');
        let graphics = cities.getComponent(cc.Graphics);
        graphics.clear();
        graphics.fillColor = controller.colors.COLOR_GREEN;

        let hobart = world.countries['AUS'].places['Hobart'];
        let christchurch = world.countries['NZL'].places['Christchurch'];
        let capetown = world.countries['ZAF'].places['Cape Town'];
        let puntaarenas = world.countries['CHL'].places['Punta Arenas'];
        let ushuaia = world.countries['ARG'].places['Ushuaia'];

        graphics.circle(hobart.points[0] - controller.node.width / 2, controller.node.height - hobart.points[1] - world.res.Y_OFFSET - controller.node.height / 2, radius);
        graphics.fill();
        graphics.circle(christchurch.points[0] - controller.node.width / 2, controller.node.height - christchurch.points[1] - world.res.Y_OFFSET - controller.node.height / 2, radius);
        graphics.fill();
        graphics.circle(capetown.points[0] - controller.node.width / 2, controller.node.height - capetown.points[1] - world.res.Y_OFFSET - controller.node.height / 2, radius);
        graphics.fill();
        graphics.circle(puntaarenas.points[0] - controller.node.width / 2, controller.node.height - puntaarenas.points[1] - world.res.Y_OFFSET - controller.node.height / 2, radius);
        graphics.fill();
        graphics.circle(ushuaia.points[0] - controller.node.width / 2, controller.node.height - ushuaia.points[1] - world.res.Y_OFFSET - controller.node.height / 2, radius);
        graphics.fill();

    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

        let Y_OFFSET = 55;
        this._time = 0;
        let controller = window['controller'] = this.controller = this;
        controller.world = window['world'] = new World();
        let world = controller.world;

        controller.messageBox.opacity = 0;

        world.automateScripts = world.res.automateScripts;
        world.automateID = -1;
        // if (automateID !== undefined)
        //     world.automateID = automateID;

        if (cc.sys.localStorage.language === undefined)
            cc.sys.localStorage.language = 'eng';
        if (cc.sys.localStorage.level === undefined)
            cc.sys.localStorage.level = 'Easy';

        world.initGameState(cc.sys.localStorage.level,
            cc.sys.localStorage.language,
            cc.sys.localStorage.greyscale,
            cc.sys.isMobile,
            cc.winSize.width,
            cc.winSize.height);

        if (cc.sys.localStorage.isPlaying === undefined)
            cc.sys.localStorage.isPlaying = true;
        controller.topBar.getChildByName("btnSound").getComponent(cc.Button).interactable = (cc.sys.localStorage.isPlaying === "true");

        cc.loader.loadRes('singleColor', cc.SpriteFrame, function (err, asset) {

            controller.singleColor = asset;

        });

        cc.loader.loadRes('icons/DOT_ON', cc.SpriteFrame, function (err, asset) {
            controller.dotOn = asset;
            cc.loader.loadRes('icons/DOT_OFF', cc.SpriteFrame, function (err, asset) {
                controller.dotOff = asset;

                // Initialise policy screen
                controller.updateLanguageSettings();
                controller.initStats();

            });
        });

        // Load policy icons
        controller.policyIcons = [];
        Object.keys(world.res.res).forEach(function (r) {

            let resUrl = world.res.res[r];
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function (err, asset) {

                controller.policyIcons.push(asset);

            })

        });

        controller.crisisIcons = new Map<string, cc.SpriteFrame>();
        Object.keys(world.res.CRISES).forEach(function (r) {

            let resUrl = world.res.CRISES[r].image;
            cc.loader.loadRes(resUrl, cc.SpriteFrame, function (err, asset) {

                controller.crisisIcons[r] = (asset);

            })

        });

        var url = 'scripts/json-equal-greyscale';
        cc.loader.loadRes(url, (err, res) => {

            if (err == null) {

                // Set up countries and their
                controller.world.countriesJson = res.json;
                controller.world.setupCountries();
                // controller.countryMaterial = cc.sys.localStorage.countryMask = 'default' ? controller.materialA : controller.materialB;
                controller.loadCountrySprites();

                // Initialise controls
                controller.initControls();

                let map = controller.node.getChildByName('mapFront');
                map.on(cc.Node.EventType.MOUSE_MOVE, (event) => {

                    controller.selectCountry(event, event.getLocation());

                });

                const beginSim = () => {

                    world.gameState.state = world.res.GAME_STATES.PREPARED;

                    controller.btnPause.getComponent(cc.Button).interactable = true;
                    controller.btnPlay.getComponent(cc.Button).interactable = false;
                    controller.btnFF.getComponent(cc.Button).interactable = true;

                    controller.doSim();

                };

                let mapFront = controller.node.getChildByName('mapFront');
                mapFront.on(cc.Node.EventType.MOUSE_WHEEL, (event) => {

                    if (world.gameState.modal || !world.gameState.mouseZoom)
                        return false;

                    const mapBack = controller.node.getChildByName('mapBack');
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

                    if (world.gameState.modal || !world.gameState.mousePan)
                        return false;

                    if (event.getButton() == cc.Event.EventMouse.BUTTON_LEFT) {
                        const mapBack = controller.node.getChildByName('mapBack');
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

                controller.showMessageBox(world,
                    world.res.scenarioData[cc.sys.localStorage.language].popup_1_title,
                    world.res.scenarioData[cc.sys.localStorage.language].popup_1_description,
                    world.res.lang.start_tutorial[cc.sys.localStorage.language], (that) => {

                        world.gameState.tutorialMode = true;
                        world.gameState.startCountry = startCountry;
                        // world.gameState.startCountry = keys[Math.floor(Math.random() * keys.length)]
                        world.gameState.statsCountry = startCountry;
                        world.gameState.currentCountry = startCountry;
                        const countryName = world.countries[world.gameState.startCountry].name;

                        controller.showMessageBox(world,
                            world.res.lang.start_prepare[cc.sys.localStorage.language],
                            world.res.lang.start_mission_a[cc.sys.localStorage.language] +
                            countryName +
                            world.res.lang.start_mission_b[cc.sys.localStorage.language],
                            world.res.scenarioData[cc.sys.localStorage.language].popup_2_title,
                            (that) => {

                                beginSim();

                            }, undefined, undefined);

                    },

                    world.res.lang.start_tutorial_skip[cc.sys.localStorage.language], (that) => {

                        world.gameState.tutorialMode = false;
                        world.gameState.startCountry = startCountry;
                        // world.gameState.startCountry = keys[Math.floor(Math.random() * keys.length)]
                        world.gameState.statsCountry = startCountry;
                        world.gameState.currentCountry = startCountry;
                        const countryName = world.countries[world.gameState.startCountry].name;

                        controller.showMessageBox(world,
                            world.res.lang.start_prepare[cc.sys.localStorage.language],
                            world.res.lang.start_mission_a[cc.sys.localStorage.language] +
                            countryName +
                            world.res.lang.start_mission_b[cc.sys.localStorage.language],
                            world.res.scenarioData[cc.sys.localStorage.language].popup_2_title,
                            (that) => {

                                beginSim();

                            }, undefined, undefined);
                    }
                );

            }

        });

    }

    start() {

        if (cc.sys.localStorage.isPlaying == undefined)
            cc.sys.localStorage.isPlaying = true;

        this.currentAudioId = cc.audioEngine.play(this.audio, true, 0.5);
        let time = cc.audioEngine.getDuration(this.currentAudioId);
        let start = Math.floor(Math.random() * time);
        cc.audioEngine.setCurrentTime(this.currentAudioId, start);
        if (cc.sys.localStorage.isPlaying != "true")
            cc.audioEngine.pauseAll();

    }

    onDestroy() {

        cc.audioEngine.stop(this.currentAudioId);

    }

    updateLive() {

        let controller = this;
        let world = this.world;

        world.gameState.counter++;

        // Handle automation here
        if (world.gameState.automateMode) {
            /*

            // Select resources
            for (let i = 0 ; i < world.gameState.automateScript.policyEvents.length; i++) {

                let pe = world.gameState.automateScript.policyEvents[i];
                
                if (world.gameState.counter == pe.counter / world.res.MONTH_INTERVAL) {

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
            for (let i = 0; i < world.gameState.crises.length; i++) {

                let crisisInCountry = world.gameState.crises[i];
                
                if (world.gameState.counter == crisisInCountry.counter + world.gameState.automateScript.crisisDuration) {
                    
                    let target = controller.node.getChildByName("crisis"+crisisInCountry.id);
                    world.fireClickOnTarget(target);

                }

            }
                */

        }

        if (world.gameState.counter % world.gameState.timeInterval == 0) {

            world.updateGameTime((message) => {

                world.gameState.state = world.res.GAME_STATES.PAUSED;
                const currentYear = world.gameState.currentDate.getFullYear();
                controller.showMessageBox(world,
                    world.res.lang.bulletin[cc.sys.localStorage.language] + currentYear,
                    message, "OK", function () {
                        world.gameState.state = world.res.GAME_STATES.STARTED;
                    }, undefined, undefined);

                if (world.gameState.automateMode) {

                    //world.fireClickOnTarget(buttons[0]);

                }
            });


            if (world.gameState.currentCountry != null) {

                controller.printCountryStats();

            }
            else {

                controller.printWorldStats();

            }

        }

        world.updateGameStats();


        // Various events
        let ci = world.isItTimeForNewCrisis();

        // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
        if (world.gameState.counter - world.gameState.lastCrisis >= ci && Math.random() < world.res.CRISIS_CHANCE) {

            controller.addCrisis();

        }

        let ri = world.isItTimeForNewResources();

        // Check enough time has elapsed to generate a new resource with some probability (1 / RESOURCE_CHANCE)
        if (world.gameState.counter - world.gameState.lastResource >= ri) {

            controller.addResource();
            world.gameState.resourceInterval *= 1.1;

        }

        if (world.gameState.tutorialMode && world.gameState.counter % world.gameState.tutorialInterval == 0) {

            controller.addTutorial();

        }

        // Add buttons
        const newButtons = [];
        for (let i = 0; i < controller.buttons.length; i++) {

            const button = controller.buttons[i];
            if (button.name == 'Resource' && world.gameState.counter > button.placedAt + world.res.RESOURCE_DURATION) {

                button.destroy();

            }
            else {

                newButtons.push(button);

            }


        }
        controller.buttons = newButtons;

        // Update labels
        controller.resourceScoreLabel.string = world.gameState.resources.toString();
        controller.refreshDate(world);

        // Game over                        
        if (world.gameState.totalLoss >= 100) {

            // Sort narratives by loss for comparison
            const narratives = Object.values(world.res.NARRATIVES.n2070).sort((o1, o2) => { return o2.loss - o1.loss });
            const n = narratives[0];
            const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
            const message = n[cc.sys.localStorage.language][index];
            controller.gameOver(world, message, "OK");

        }
        else if (world.gameState.currentDate >= world.gameState.targetDate) {

            let message = '';
            // Sort narratives by loss for comparison
            const narratives = Object.values(world.res.NARRATIVES.n2070).sort((o1, o2) => { return o2.loss - o1.loss });

            for (let i = 0; i < narratives.length; i++) {

                const n = narratives[i];
                if (world.gameState.totalLoss >= n.loss) {

                    const index = Math.floor(Math.random() * n[cc.sys.localStorage.language].length);
                    message = n[cc.sys.localStorage.language][index];
                    break;

                }

            }

            controller.gameOver(world, message, "OK");

        }


    }

    update(dt) {

        let controller = this.controller;
        let world = this.world;

        this._time += dt;

        if (controller.countryNodes !== undefined) {

            Object.keys(controller.countryNodes).forEach((key) => {

                let countryNode = controller.countryNodes[key];
                let country = world.countries[key];
                if (country !== undefined) {

                    let mv = countryNode.getComponent(cc.Sprite).materials[0];
                    mv.setProperty('u_selected', (country.selected ? 1.0 : 0.0));
                    mv.setProperty('u_percentageLoss', country.loss);
                    // if (country.iso_a3 == 'AUS')
                    //     console.log(`AUS: ${country.loss}`)
                    mv.setProperty('u_percentagePrep', country.pop_prepared_percent);

                }

            });

        }

        let radius = 3 * ((this._time * 3) % 3);
        controller.showAntarcticCities(radius);

        if (world.gameState.state === world.res.GAME_STATES.STARTED) {

            this.updateLive();

        }

    }
}
