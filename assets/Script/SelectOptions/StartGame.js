// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

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

    },

    start () {
        
    },

    // update (dt) {},
});
