class Enemy extends egret.DisplayObjectContainer{

	public constructor(){
		super();
	}
	 //敌机
	public init(x:number,y:number):AllFighter{
		var enemy = "enemy_png";
		var allFighter = new AllFighter();
		var enemyImg=new egret.Bitmap(RES.getRes(enemy));
		allFighter.blood = 1;
        allFighter.Image = enemyImg;
        allFighter.Image.rotation = 180;
        allFighter.Image.x = x + 128;
        allFighter.Image.y = y + 128;
        allFighter.X = allFighter.Image.x;
        allFighter.Y = allFighter.Image.y;
        allFighter.scores = 10;
        return allFighter; 
	}
}