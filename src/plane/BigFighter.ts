/*
* 玩家飞机展示
*/

class BigFighter extends egret.DisplayObjectContainer{
	public constructor(){
		super();
	}

	public init(ts: egret.DisplayObjectContainer):AllFighter{
		var allFighter: AllFighter = new AllFighter();
		var fightImg = new egret.Bitmap(RES.getRes("aircraft_png"));
		allFighter.Image = fightImg;
		allFighter.blood = 1;
		allFighter.bulletImage="bullet_png";
		allFighter.scores = 0;
		fightImg.touchEnabled = true;

		this.Pos(allFighter,ts);
		ts.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.PlaneMoveHandle,[allFighter,ts]);
        ts.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.PlaneMoveHandle,[allFighter,ts]);
		return allFighter;
	}

	//飞机移动
	private PlaneMoveHandle(e: egret.TouchEvent): void{
		var plane:AllFighter = this[0];
		if(plane.Image==null) return;
		var p =this[1];
		var h = plane.Image.height;
		var w = plane.Image.width;
		plane.Image.x=e.stageX-(w/2);
		plane.Image.y=e.stageY-(h/2);
		if(plane.Image.x<=0){
			plane.Image.x=0;
		}
		if(e.stageX+w/2>=p.stage.stageWidth){
			plane.Image.x = p.stage.stageWidth;
		}
		if(plane.Image.y<=0){
			plane.Image.y=p.stage.stageHeight-w;
		}
		if(e.stageY+h/2>=p.stage.stageHeight){
			plane.Image.y=p.stage.stageHeight-h;
		}
		plane.X=plane.Image.x;
		plane.Y=plane.Image.y;
	}
	//初始位置
	public Pos(plane:AllFighter,ds:egret.DisplayObject):void{
		var mapH = ds.stage.stageWidth;   
		var mapW = ds.stage.stageHeight;  //
		var h = plane.Image.height;
		var w = plane.Image.width;
		plane.X=(mapH/2)-(plane.Image.width/2);
		plane.Y=mapW-plane.Image.height;
		plane.Image.x=plane.X;
		plane.Image.y=plane.Y;
	}
}