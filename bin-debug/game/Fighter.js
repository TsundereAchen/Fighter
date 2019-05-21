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
var Fighter = (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = _super.call(this) || this;
        //this.createBitmapByName("resource/assets/res/fighter.exml");
        //this.skinName="resource/assets/res/fighter.exml";
        //this.img = this.createBitmapByName("images/curtain");
        _this.createBitmapByName();
        return _this;
    }
    Fighter.prototype.createBitmapByName = function () {
        var result = new eui.Image();
        result.source = "resource/assets/images/curtain.png";
        this.addChild(result);
    };
    return Fighter;
}(eui.Component));
__reflect(Fighter.prototype, "Fighter");
//# sourceMappingURL=Fighter.js.map