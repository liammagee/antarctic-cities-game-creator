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
    label: cc.Label = null;

    @property
    text: string = 'hello';

    _time: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this._time += dt;
        let red = Math.abs(Math.sin(this._time));
        let green = Math.abs(Math.cos(this._time));
        let countryNode = cc.director.getScene().getChildByName("AUS_equal");
        let mv = countryNode.getComponent(cc.Sprite).getMaterial(0);
        mv.setProperty('u_selected', 1.0);
        mv.setProperty('u_percentageLoss', red * 100.0);
        mv.setProperty('u_percentagePrep', 0.0);
        // mv.setProperty('u_percentagePrep', green * 100.0);
    }
}
