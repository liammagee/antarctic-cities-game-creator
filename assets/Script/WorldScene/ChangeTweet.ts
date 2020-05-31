// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {Resources} from './Resources';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    tweetRendered() {
        
        let universe = cc.director.getScene().getChildByName('Canvas').getChildByName('layout').getComponent("GameController");
        let world = universe.world;
        let tweetLabel = universe.node.getChildByName("topBar").getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet");
        let gameParams = world.gameParams;
        let message = gameParams.scenarioName, 
                    messageIndex = -1;
        if (gameParams.messageOverride != null) {
            
            message = gameParams.messageOverride;
            tweetLabel.color = world.res.COLOR_RED;
            gameParams.messageOverride = null;

        }    
        else if (gameParams.totalLoss > 0 || gameParams.populationPreparedPercent > 0) {

            const weight = gameParams.totalLoss / (gameParams.totalLoss + gameParams.populationPreparedPercent);
            if (Math.random() < weight) {

                messageIndex = Math.floor(Math.random() * gameParams.messagesNegative.length);
                message = gameParams.messagesNegative[messageIndex];

            }
            else {
                
                messageIndex = Math.floor(Math.random() * gameParams.messagesPositive.length);
                message = gameParams.messagesPositive[messageIndex];

            }
            tweetLabel.color = universe.colors.COLOR_ICE;

        }
        
        tweetLabel.getComponent(cc.Label).string = message;

    }

    // update (dt) {}
}
