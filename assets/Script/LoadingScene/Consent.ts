// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;


import {Resources} from '../WorldScene/Resources';

@ccclass
export default class Consent extends cc.Component {

    @property(cc.Button)
    play: cc.Button = null;

    @property(cc.Toggle)
    consent: cc.Toggle = null;

    @property(cc.Label)
    lblConsent: cc.Label = null;

    res: Resources = new Resources()

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

        if (cc.sys.localStorage.language === undefined)
            cc.sys.localStorage.language = 'eng';

        let layout = this.node.getChildByName('layout');
        let lblWelcome = layout.getChildByName('lblWelcome').getComponent(cc.Label);
        let lblAbout = layout.getChildByName('lblAbout').getComponent(cc.Label);
        let chbAgree = layout.getChildByName('consentHolder').getChildByName('chbAgree').getComponent(cc.Toggle);
        let lblAgree = chbAgree.node.getChildByName('Background').getChildByName('lblAgree').getComponent(cc.Label);
        let lblPlayGame = layout.getChildByName('btnPlayGame').getChildByName('Background').getChildByName('Label').getComponent(cc.Label);
        let lblLearnMore = layout.getChildByName('btnLearnMore').getChildByName('Background').getChildByName('Label').getComponent(cc.Label);

        lblWelcome.string = this.res.LANG.welcome[cc.sys.localStorage.language];
        lblAbout.string = this.res.LANG.about_game[cc.sys.localStorage.language];
        lblAgree.string = this.res.LANG.consent[cc.sys.localStorage.language];
        lblPlayGame.string = this.res.LANG.commands_play[cc.sys.localStorage.language];
        lblLearnMore.string = this.res.LANG.commands_learn_more[cc.sys.localStorage.language];

        let consented = (cc.sys.localStorage.consent === 'true');
        chbAgree.isChecked = consented;
        this.play.interactable = consented;

        lblAgree.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            
            chbAgree.node.emit(cc.Node.EventType.TOUCH_END, event);
 
        }, this);

    }


    togglePlay(consent: cc.Toggle) {

        cc.sys.localStorage.consent = consent.isChecked;
        this.play.interactable = consent.isChecked;
        
    }

    playGame (playGame: cc.Button) {

        if (this.play.interactable) {

            cc.director.loadScene("WorldScene");

        }

    }

    learnMore() {

        cc.sys.openURL(this.res.LANG.url_learn_more[cc.sys.localStorage.language]);

    }

    // update (dt) {}
}
