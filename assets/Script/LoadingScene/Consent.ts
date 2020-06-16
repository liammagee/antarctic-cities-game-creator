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
        let lblAgree = layout.getChildByName('consentHolder').getChildByName('chbAgree').getChildByName('Background').getChildByName('lblAgree').getComponent(cc.Label);
        let lblPlayGame = layout.getChildByName('btnPlayGame').getChildByName('Background').getChildByName('Label').getComponent(cc.Label);
        let lblLearnMore = layout.getChildByName('btnLearnMore').getChildByName('Background').getChildByName('Label').getComponent(cc.Label);

        if (cc.sys.localStorage.language === 'eng') {

            lblWelcome.string = this.res.lang.welcome.eng;
            lblAbout.string = this.res.lang.about_game.eng;
            lblAgree.string = this.res.lang.consent.eng;
            lblPlayGame.string = this.res.lang.commands_play.eng;
            lblLearnMore.string = this.res.lang.commands_learn_more.eng;

        }
        else {

            lblWelcome.string = this.res.lang.welcome.esp;
            lblAbout.string = this.res.lang.about_game.esp;
            lblAgree.string = this.res.lang.consent.esp;
            lblPlayGame.string = this.res.lang.commands_play.esp;
            lblLearnMore.string = this.res.lang.commands_learn_more.esp;

        }

        let consented = (cc.sys.localStorage.consent === 'true');
        this.consent.isChecked = consented;
        this.play.interactable = consented;

        this.lblConsent.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            
            this.consent.node.emit(cc.Node.EventType.TOUCH_END, event);
 
        }, this);

    }

    
    togglePlay(consent: cc.Toggle) {

        cc.sys.localStorage.consent = consent.isChecked;
        this.play.interactable = consent.isChecked;
        
    }

    playGame (playGame: cc.Button) {

        if (this.play.interactable) {

            // if (cc.sys.isMobile) {

            //     cc.screen['requestFullScreen'](null, () => {
            //         cc.log('now fullscreen');
            //     });

            // }
            cc.director.loadScene("WorldScene");
            // cc.director.loadScene("OptionsScene");

        }

    }

    learnMove() {

        cc.sys.openURL("https://antarctic-cities.org/the-game/");

    }

    // update (dt) {}
}
