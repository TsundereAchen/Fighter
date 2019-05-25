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
        _this.lastTime = egret.getTimer();
        _this.start1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.createGameScene, _this);
        return _this;
    }
    GameScene.prototype.createGameScene = function () {
        this.startGame();
    };
    GameScene.prototype.startGame = function () {
        this.fight.start();
        //初始化
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
        this.myFightTime.stop();
        this.enemyFightTime.stop();
        this.myFightTime = null;
        this.enemyFightTime = null;
        for (var it in this.enemyFights) {
            this.removeChild(this.enemyFights[it].Image);
        }
        this.enemyFights = [];
        for (var it in this.bullet) {
            this.removeChild(this.bullet[it].Img);
        }
        this.bullet = [];
        this.fight.pause();
        var socre = this.myFight.scores;
        this.removeChild(this.myFight.Image);
        this.myFight.Image = null;
        this.myFight.scores = 0;
        var over = new egret.Bitmap(RES.getRes("curtain1_png"));
        var backButton = new egret.Bitmap(RES.getRes("start_png"));
        var label = new egret.TextField();
        label.text = socre + "分";
        label.x = this.stage.stageWidth / 2 - label.width / 2;
        label.y = this.stage.stageHeight / 2;
        backButton.x = this.stage.stageWidth / 2 - backButton.width / 2;
        backButton.y = (this.stage.stageHeight / 2) + 80;
        var mapthis = this;
        backButton.touchEnabled = true;
        backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            mapthis.lastTime = 0;
            mapthis.removeChild(over);
            mapthis.removeChild(label);
            mapthis.removeChild(backButton);
            //mapthis.start.apply(mapthis);
        }, this);
        this.addChild(over);
        this.addChild(label);
        this.addChild(backButton);
    };
    //添加主角事件
    GameScene.prototype.AddMyPlane = function () {
        var bullet1 = this[1].Shoot();
        this[0].bulet.push(bullet1);
        this[0].addChild(bullet1.Img);
    };
    //加入敌军
    GameScene.prototype.enemyFightersTimerfun = function () {
        var enemyplaneClass = new Enemy();
        var x = Math.random() * (this.stage.width - 128); //随机坐标
        var enemyplane = enemyplaneClass.init(x, -128);
        this.enemyFights.push(enemyplane);
        this.addChild(enemyplane.Image);
        var bullet1 = enemyplane.Shoot();
        this.bullet.push(bullet1);
        this.addChild(bullet1.Img);
    };
    /*飞机碰撞检测*/
    GameScene.prototype.collision = function () {
        var bullet1 = this.bullet;
        var enemyplane = this.enemyFights;
        var myPlane = this.myFight;
        for (var i in bullet1) {
            if (bullet1[i].Plane.Image != myPlane.Image) {
                if (myPlane.Image != null) {
                    //计算显示对象,以确定它是否与 x 和 y 参数指定的点重叠或相交。
                    var isHi = myPlane.Image.hitTestPoint(bullet1[i].X, bullet1[i].Y - 40, true);
                    if (isHi) {
                        bullet1.splice(bullet1.indexOf(bullet1[i]), 1);
                        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
                        this.GameOver.apply(this);
                        return;
                    }
                }
            }
            else {
                for (var l in enemyplane) {
                    if (this.myFight != null) {
                        var myHit = enemyplane[l].Image.hitTestPoint(this.myFight.X, this.myFight.Y, true);
                        if (myHit) {
                            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
                            this.GameOver.apply(this);
                            return;
                        }
                    }
                    var isHit = enemyplane[l].Image.hitTestPoint(bullet1[i].X, bullet1[i].Y, true);
                    if (isHit) {
                        this.removeChild(bullet1[i].Img);
                        bullet1.splice(bullet1.indexOf(bullet1[i]), 1);
                        this.removeChild(enemyplane[l].Image);
                        enemyplane.splice(enemyplane.indexOf(enemyplane[l]), 1);
                        this.myFight.scores += 10;
                    }
                }
            }
        }
    };
    //游戏画面更新
    GameScene.prototype.gameViewUpdate = function () {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - (this.lastTime));
        this.lastTime = nowTime;
        var speedOffset = 60 / fps;
        /*
        * 统一子弹管理
        */
        var i = 0;
        var bullet1;
        var bulletCount = this.bullet.length;
        for (i = 0; i < bulletCount; ++i) {
            bullet1 = this.bullet[i];
            if (bullet1.Y - bullet1.Img.height > this.stage.stageHeight) {
                this.removeChild(bullet1.Img);
                this.bullet.splice(i, 1);
                i--;
                bulletCount--;
            }
            bullet1.Y += 7 * speedOffset;
            bullet1.Img.y += 7 * speedOffset;
        }
        //敌机飞行
        var theFighter;
        var enemyplaneCount = this.enemyFights.length;
        for (i = 0; i < enemyplaneCount; ++i) {
            theFighter = this.enemyFights[i];
            if (theFighter.Y - theFighter.Image.height > this.stage.stageHeight) {
                this.removeChild(theFighter.Image);
                this.enemyFights.splice(i, 1);
                i--;
                enemyplaneCount--;
            }
            theFighter.Y += 4 * speedOffset;
            theFighter.Image.y += 4 * speedOffset;
        }
        this.collision();
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map