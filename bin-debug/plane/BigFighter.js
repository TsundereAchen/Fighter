/*
* 玩家飞机展示
*/
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
var BigFighter = (function (_super) {
    __extends(BigFighter, _super);
    function BigFighter() {
        return _super.call(this) || this;
    }
    BigFighter.prototype.init = function (ts) {
        var allFighter = new AllFighter();
        var fightImg = new egret.Bitmap();
        fightImg = RES.getRes("aircraft_png");
        allFighter.Image = fightImg;
        allFighter.blood = 1;
        allFighter.bulletImage = "bullet_png";
        allFighter.scores = 0;
        this.Pos(allFighter, ts);
        fightImg.touchEnabled = true;
        ts.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.PlaneMoveHandle, [allFighter, ts]);
        ts.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.PlaneMoveHandle, [allFighter, ts]);
        return allFighter;
    };
    //飞机移动
    BigFighter.prototype.PlaneMoveHandle = function (e) {
        var plane = this[0];
        if (plane.Image == null)
            return;
        var p = this[1];
        var h = plane.Image.height;
        var w = plane.Image.width;
        plane.Image.x = e.stageX - (w / 2);
        plane.Image.y = e.stageY - (h / 2);
        if (plane.Image.x <= 0) {
            plane.Image.x = 0;
        }
        if (e.stageX + w / 2 >= p.stage.stageWidth) {
            plane.Image.x = p.stage.stageWidth;
        }
        if (plane.Image.y <= 0) {
            plane.Image.y = p.stage.stageHeight - w;
        }
        if (e.stageY + h / 2 >= p.stage.stageHeight) {
            plane.Image.y = p.stage.stageHeight - h;
        }
        plane.X = plane.Image.x;
        plane.Y = plane.Image.y;
    };
    //初始位置
    BigFighter.prototype.Pos = function (plane, ds) {
        var mapH = ds.stage.stageWidth;
        var mapW = ds.stage.stageHeight; //
        var h = plane.Image.height;
        var w = plane.Image.width;
        plane.X = (mapH / 2) - (plane.Image.width / 2);
        plane.Y = mapW - plane.Image.height;
        plane.Image.x = plane.X;
        plane.Image.y = plane.Y;
    };
    return BigFighter;
}(egret.DisplayObjectContainer));
__reflect(BigFighter.prototype, "BigFighter");
//# sourceMappingURL=BigFighter.js.map