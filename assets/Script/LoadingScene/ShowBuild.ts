// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {Resources} from '../WorldScene/Resources';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    
    res: Resources = new Resources()

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.label.string = this.res.VERSION_ANTARCTIC_FUTURES;
    }

    start () {
    }

    // update (dt) {}
}
