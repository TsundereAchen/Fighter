var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AllFighter = (function () {
    function AllFighter() {
        //血量
        this.blood = 1;
    }
    //类型（UP OR DOWN）
    //public type:string;
    AllFighter.prototype.Shoot = function () {
        var bullet = new AllBullet();
        //bullet.type=this.type;
        bullet.Img = new egret.Bitmap(RES.getRes(this.bulletImage));
        bullet.Img.width = 50;
        bullet.Img.height = 50;
        bullet.Plane = this;
        if (this.Image != null) {
            bullet.X = this.X + (this.Image.width / 2 - 35);
            bullet.Y = this.Y - 45;
        }
        bullet.Img.x = bullet.X;
        bullet.Img.y = bullet.Y;
        return bullet;
    };
    return AllFighter;
}());
__reflect(AllFighter.prototype, "AllFighter");
//# sourceMappingURL=AllFighter.js.map