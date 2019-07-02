var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
* 主场景
*/
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.number1 = 0;
        _this.skinName = "resource/assets/res/GameScene.exml";
        //this.lastTime = egret.getTimer();
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.GameScene, _this);
        return _this;
    }
    GameScene.prototype.GameScene = function () {
        this.number1 = 1;
    };
    GameScene.prototype.judge = function () {
        if (this.number1 == 1)
            return true;
        return false;
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map