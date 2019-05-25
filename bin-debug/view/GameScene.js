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
        //己方飞机发射时间间隔
        _this.myFightTime = new egret.Timer(500);
        //创建敌机间隔
        _this.enemyFightTime = new egret.Timer(500);
        //敌方飞机
        _this.enemyFights = [];
        //子弹集合
        _this.bullet = [];
        _this.skinName = "resource/assets/res/gameScene.exml";
        _this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.createGameScene, _this);
        return _this;
    }
    GameScene.prototype.createGameScene = function () {
    };
    GameScene.prototype.startGame = function () {
        this.fight.start();
        this.myFightTime = new egret.Timer(500);
        this.enemyFightTime = new egret.Timer(500);
        var bigFighter = new BigFighter();
        var plane = bigFighter.init(this);
        this.addChild(plane.Image);
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.myFight = plane;
        //主角添加事件
        this.myFightTime.addEventListener(egret.TimerEvent.TIMER, this.AddMyPlane, [this, plane]);
        this.myFightTime.start();
        //敌人添加事件
        this.enemyFightTime.addEventListener(egret.TimerEvent.TIMER, this.enemyFightersTimerfun, this);
        this.enemyFightTime.start();
    };
    //游戏结束
    GameScene.prototype.GameOver = function () {
    };
    //添加主角事件
    GameScene.prototype.AddMyPlane = function () {
    };
    //加入敌军
    GameScene.prototype.enemyFightersTimerfun = function () {
    };
    /*飞机碰撞检测*/
    GameScene.prototype.collision = function () {
    };
    //游戏画面更新
    GameScene.prototype.gameViewUpdate = function () {
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map