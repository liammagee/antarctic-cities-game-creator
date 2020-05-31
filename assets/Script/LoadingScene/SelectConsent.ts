// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    play: cc.Button = null;

    @property(cc.Toggle)
    consent: cc.Toggle = null;

    @property(cc.Label)
    lblConsent: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.lblConsent.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            
            this.consent.node.emit(cc.Node.EventType.TOUCH_END, event);
 
        }, this);

    }

    togglePlay (consent: cc.Toggle) {

        cc.sys.localStorage.consent = consent.isChecked;
        this.play.interactable = consent.isChecked;
        
    }

    playGame (playGame: cc.Button) {

        if (this.play.interactable) {

            if (cc.sys.isMobile) {

                cc.screen['requestFullScreen'](null, () => {
                    cc.log('now fullscreen');
                });

            }
            cc.director.loadScene("SelectOptions");

        }

    }

    learnMove() {

        cc.sys.openURL("https://antarctic-cities.org/the-game/");

    }

    start () {

    }

    // update (dt) {}
}
