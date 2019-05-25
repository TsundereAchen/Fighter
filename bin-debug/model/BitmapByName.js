var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 提供可继承的公共对象
*/
var BitmapByName = (function () {
    function BitmapByName() {
    }
    //加载图像方法
    BitmapByName.creatBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    BitmapByName.sp = new egret.Sprite();
    return BitmapByName;
}());
__reflect(BitmapByName.prototype, "BitmapByName");
//# sourceMappingURL=BitmapByName.js.map