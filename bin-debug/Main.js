//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.listResources = new Array(new Resources("preload", "飞机模型"));
        //己方飞机发射时间间隔
        _this.myFightTime = new egret.Timer(500);
        //创建敌机间隔
        _this.enemyFightTime = new egret.Timer(500);
        //敌方飞机
        _this.enemyFights = [];
        //子弹集合
        _this.bullet = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        for (var item in this.listResources) {
            var list = this.listResources[item];
            var resources = list;
            RES.loadGroup(resources.name);
        }
    };
    /**
     * Plane资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        var isOver = false;
        for (var item in this.listResources) {
            var list = this.listResources[item];
            var resources = list;
            if (event.groupName == resources.name) {
                resources.isOver = true;
            }
            isOver = resources.isOver;
        }
        if (isOver) {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //背景
            this.fight = new Fighter(); //创建可滚动的背景
            this.addChild(this.fight);
            this.createGameScene();
        }
    };
    /**
    * 资源组加载出错
    *  The resource group loading failed
    */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     * Plane资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        for (var item in this.listResources) {
            var list = this.listResources[item];
            var resources = list;
            if (event.groupName == resources.name) {
                this.loadingView.setCustomProgress(event.itemsLoaded, event.itemsTotal, resources.chinese);
            }
        }
    };
    /**
    * 创建场景界面
    * Create scene interface
    */
    Main.prototype.createGameScene = function () {
        //super();
        // let gameScene = new GameScene();
        // this.addChild(gameScene);
        // if(gameScene.judge()) 
        this.lastTime = egret.getTimer();
        this.startGame();
        //this.start1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameScene,this);
    };
    Main.prototype.startGame = function () {
        //this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.fight.start();
        //初始化
        /**己方飞机发射时间间隔 */
        this.myFightTime = new egret.Timer(500);
        /**敌机发射间隔 */
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
    Main.prototype.GameOver = function () {
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
        var over = new egret.Bitmap(RES.getRes("curtain_png"));
        var backButton = new egret.Bitmap(RES.getRes("start_png"));
        var label = new egret.TextField();
        label.text = socre + "分";
        console.log("this.stage.x: " + this.stage.stageWidth);
        console.log("this.stage.y" + this.stage.stageHeight);
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
            mapthis.startGame.apply(mapthis);
        }, this);
        this.addChild(over);
        this.addChild(label);
        this.addChild(backButton);
    };
    //添加主角事件
    Main.prototype.AddMyPlane = function () {
        var bullet1 = this[1].Shoot();
        this[0].bullet.push(bullet1);
        this[0].addChild(bullet1.Img);
    };
    //加入敌军
    Main.prototype.enemyFightersTimerfun = function () {
        var enemyplaneClass = new Enemy();
        var x = Math.random() * (this.stage.width - 110); //随机坐标
        var enemyplane = enemyplaneClass.init(x, -110);
        this.enemyFights.push(enemyplane);
        this.addChild(enemyplane.Image);
        var bullet1 = enemyplane.Shoot();
        this.bullet.push(bullet1);
        this.addChild(bullet1.Img);
    };
    /*飞机碰撞检测*/
    Main.prototype.collision = function () {
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
    Main.prototype.gameViewUpdate = function () {
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
            bullet1.Y -= 5 * speedOffset;
            bullet1.Img.y -= 5 * speedOffset;
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
            theFighter.Y += 3 * speedOffset;
            theFighter.Image.y += 3 * speedOffset;
        }
        this.collision();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map