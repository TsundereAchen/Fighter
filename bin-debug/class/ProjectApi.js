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
var ProjectApi = (function (_super) {
    __extends(ProjectApi, _super);
    function ProjectApi() {
        var _this = _super.call(this) || this;
        var newBack = new GameScene();
        _this.addChild(newBack);
        return _this;
    }
    return ProjectApi;
}(eui.Component));
__reflect(ProjectApi.prototype, "ProjectApi");
//# sourceMappingURL=ProjectApi.js.map