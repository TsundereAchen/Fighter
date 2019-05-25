/*
* 飞机底图
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
var Fighter = (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = _super.call(this) || this;
        /**图片引用*/
        _this.img = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createBitmapByName, _this);
        return _this;
    }
    Fighter.prototype.createBitmapByName = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.createBitmapByName, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        var texture = RES.getRes("curtain_png");
        this.textureHeight = texture.textureHeight; //保留原始纹理的高度，用于后续的计算
        this.rowCount = 2;
        for (var i = 0; i < this.rowCount; ++i) {
            var ress = new egret.Bitmap();
            var texture = RES.getRes("curtain_png");
            ress.texture = texture;
            ress.y = this.textureHeight * i - (this.textureHeight * this.rowCount - this.stageH);
            this.img.push(ress);
            this.addChild(ress);
        }
    };
    /**开始滚动*/
    Fighter.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    /**逐帧运动*/
    Fighter.prototype.enterFrameHandler = function (event) {
        for (var i = 0; i < this.rowCount; i++) {
            var bgBmp = this.img[i];
            bgBmp.y += 10;
            //判断超出屏幕后，回到队首，这样来实现循环反复
            if (bgBmp.y > this.stageH) {
                bgBmp.y = this.img[0].y - this.textureHeight;
                this.img.pop();
                this.img.unshift(bgBmp);
            }
        }
    };
    /**暂停滚动*/
    Fighter.prototype.pause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    return Fighter;
}(eui.Component));
__reflect(Fighter.prototype, "Fighter");
//# sourceMappingURL=Fighter.js.map