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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    togglePlay (consent: cc.Toggle) {

        cc.sys.localStorage.consent = consent.isChecked;
        this.play.interactable = consent.isChecked;
        
    }

    playGame (playGame: cc.Button) {

        if (this.play.interactable)
            cc.director.loadScene("WorldScene");

    }

    start () {

    }

    // update (dt) {}
}
