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
        
        let controller = cc.director.getScene().getChildByName('Canvas').getChildByName('layout').getComponent("GameController");
        let world = controller.world;

        let tweetLabel = controller.node.getChildByName("topBar").getChildByName("tweetBackground").getChildByName("nodeMask").getChildByName("lblTweet");
        let gameState = world.gameState;
        let message = gameState.scenarioName,  messageIndex = -1;

        if (gameState.messageOverride != null) {
            
            message = gameState.messageOverride;
            tweetLabel.color = world.colours.COLOR_RED;
            gameState.messageOverride = null;

        }    
        else if (gameState.totalLoss > 0 || gameState.populationPreparedPercent > 0) {

            const weight = gameState.totalLoss / (gameState.totalLoss + gameState.populationPreparedPercent);
            if (Math.random() < weight) {

                messageIndex = Math.floor(Math.random() * gameState.messagesNegative.length);
                message = gameState.messagesNegative[messageIndex];

            }
            else {
                
                messageIndex = Math.floor(Math.random() * gameState.messagesPositive.length);
                message = gameState.messagesPositive[messageIndex];

            }
            tweetLabel.color = controller.colors.COLOR_ICE;

        }
        
        tweetLabel.getComponent(cc.Label).string = message;

    }

    // update (dt) {}
}
