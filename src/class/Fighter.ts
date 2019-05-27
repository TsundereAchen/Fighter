/*
* 飞机底图	
*/

class Fighter extends eui.Component {
	/**图片引用*/
	private img: egret.Bitmap[]=[];
    /**图片数量*/
    private rowCount: number;
    /**stage宽*/
    private stageW: number;
    /**stage高*/
    private stageH: number;
    /**纹理本身的高度*/
    private textureHeight: number;
	/**控制滚动速度 */
	private speed:number=3;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createBitmapByName,this);
	}


	private createBitmapByName():void{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.createBitmapByName,this);
		this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
		var texture:egret.Texture = RES.getRes("curtain_png");
		this.textureHeight = texture.textureHeight;//保留原始纹理的高度，用于后续的计算
		this.rowCount = Math.ceil(this.stageH/this.textureHeight)+1;
		//创建这些图片，并设置y坐标，让它们连接起来
		for(var i:number=0;i < this.rowCount;++i){
			var ress: egret.Bitmap = new egret.Bitmap();
			var texture: egret.Texture = RES.getRes("curtain_png");
			ress.texture = texture;

			ress.y = this.textureHeight*i - (this.textureHeight*this.rowCount -this.stageH);
			this.img.push(ress);
			this.addChild(ress);
		}
    }

	 /**开始滚动*/
    public start(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	 /**逐帧运动*/
    private enterFrameHandler(event: egret.Event): void
    {
           for(var i: number = 0; i < this.rowCount; i++){
				var bgBmp: egret.Bitmap = this.img[i];
				bgBmp.y += this.speed;
				//判断超出屏幕后，回到队首，这样来实现循环反复
				if(bgBmp.y > this.stageH)
				{
					bgBmp.y = this.img[0].y - this.textureHeight;
					this.img.pop();
					this.img.unshift(bgBmp);
				}
        }
    }
    /**暂停滚动*/
    public pause(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }
}
