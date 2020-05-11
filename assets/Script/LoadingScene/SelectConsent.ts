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

        console.log(this.play.enabled);
        console.log(cc.sys.localStorage.consent);
        //this.isChecked = (cc.sys.localStorage.consent === true);
        //cc.log(this.isChecked);

        /*
        this.node.on('mouseup', function ( event ) {

            cc.log(this.isChecked);
            cc.sys.localStorage.consent = this.isChecked;
            this.button.enabled = this.isChecked;
            cc.log(this);
            cc.log(event);
            
        }, this);
        */

    }

    togglePlay (consent: cc.Toggle) {

        cc.log("got here "+consent.isChecked);
        cc.sys.localStorage.consent = consent.isChecked;
        this.play.interactable = consent.isChecked;
        
        cc.log("got here "+this.play.interactable);

    }

    playGame (playGame: cc.Button) {

        if (this.play.interactable)
            cc.director.loadScene("WorldScene");

    }

    start () {

    }

    // update (dt) {}
}
