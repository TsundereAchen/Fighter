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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super.call(this) || this;
    }
    //敌机
    Enemy.prototype.init = function (x, y) {
        var enemy = "enemy_png";
        var allFighter = new AllFighter();
        var enemyImg = new egret.Bitmap(RES.getRes(enemy));
        allFighter.blood = 1;
        allFighter.Image = enemyImg;
        allFighter.Image.rotation = 180;
        allFighter.Image.x = x + 128;
        allFighter.Image.y = y + 128;
        allFighter.X = allFighter.Image.x;
        allFighter.Y = allFighter.Image.y;
        allFighter.scores = 10;
        return allFighter;
    };
    return Enemy;
}(egret.DisplayObjectContainer));
__reflect(Enemy.prototype, "Enemy");
//# sourceMappingURL=Enemy.js.map