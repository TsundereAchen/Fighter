/*
* 提供可继承的公共对象
*/
class BitmapByName {
    public static sp:egret.Sprite = new egret.Sprite();
	 //加载图像方法
    public static creatBitmapByName(name:string){
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}