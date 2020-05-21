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

    // onLoad () {}

    start () {

        this.node.on('mouseup', function ( event ) {

            if (this.name === 'chbEasy') {
                cc.sys.localStorage.level = 'Easy';
            }
            else if (this.name === 'chbMedium') {
                cc.sys.localStorage.level = 'Medium';
            }
            else {
                cc.sys.localStorage.level = 'Hard';
            }

        }, this);

    }

    // update (dt) {}
}
