// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        if (cc.sys.localStorage.language === undefined)
            cc.sys.localStorage.language = 'eng';
        if (cc.sys.localStorage.level === undefined)
            cc.sys.localStorage.level = 'Easy';
        if (cc.sys.localStorage.greyscale === undefined)
            cc.sys.localStorage.greyscale = true;

        this.node.on('mouseup', function ( event ) {

            cc.director.loadScene("WorldScene");

        });

    }

    start () {

    }

    // update (dt) {}
}
