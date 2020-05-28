// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    lblEnglish: cc.Label = null;

    @property(cc.Toggle)
    chkEnglish: cc.Toggle = null;

    @property(cc.Label)
    lblEspanol: cc.Label = null;

    @property(cc.Toggle)
    chkEspanol: cc.Toggle = null;

    @property(cc.Label)
    lblEasy: cc.Label = null;

    @property(cc.Toggle)
    chkEasy: cc.Toggle = null;

    @property(cc.Label)
    lblMedium: cc.Label = null;

    @property(cc.Toggle)
    chkMedium: cc.Toggle = null;

    @property(cc.Label)
    lblDifficult: cc.Label = null;

    @property(cc.Toggle)
    chkDifficult: cc.Toggle = null;


    // LIFE-CYCLE CALLBACKS:

    selectLanguage() {

        if (this.chkEnglish.isChecked) {
            cc.sys.localStorage.language = 'eng';
        }
        else {
            cc.sys.localStorage.language = 'esp';
        }

    }

    selectDifficulty() {

        if (this.chkEasy.isChecked) {
            cc.sys.localStorage.level = 'Easy';
        }
        else if (this.chkMedium.isChecked) {
            cc.sys.localStorage.level = 'Medium';
        }
        else {
            cc.sys.localStorage.level = 'Hard';
        }

    }

    launchGame() {
        
        if (cc.sys.localStorage.language === undefined)
            cc.sys.localStorage.language = 'eng';
        if (cc.sys.localStorage.level === undefined)
            cc.sys.localStorage.level = 'Easy';
        if (cc.sys.localStorage.greyscale === undefined)
            cc.sys.localStorage.greyscale = true;

        cc.director.loadScene("WorldScene");

    }

    onLoad () {
        this.lblEnglish.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.chkEnglish.node.emit(cc.Node.EventType.TOUCH_END, event);
        }, this);
        this.lblEspanol.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.chkEspanol.node.emit(cc.Node.EventType.TOUCH_END, event);
        }, this);
        this.lblEasy.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.chkEasy.node.emit(cc.Node.EventType.TOUCH_END, event);
        }, this);
        this.lblMedium.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.chkMedium.node.emit(cc.Node.EventType.TOUCH_END, event);
        }, this);
        this.lblDifficult.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.chkDifficult.node.emit(cc.Node.EventType.TOUCH_END, event);
        }, this);
    }

    start () {

    }

    // update (dt) {}
}
