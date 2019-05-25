var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AllFighter = (function () {
    function AllFighter() {
        //血量
        this.blood = 1;
    }
    AllFighter.prototype.init = function () {
        var bullet = new AllBullet();
        bullet.Img.rotation = 180;
        bullet.X = this.X - (this.Image.width / 2 - 30);
        bullet.Y = this.Y + 60;
        bullet.Img.x = bullet.X;
        bullet.Img.y - bullet.Y;
        return bullet;
    };
    return AllFighter;
}());
__reflect(AllFighter.prototype, "AllFighter");
//# sourceMappingURL=AllFighter.js.map