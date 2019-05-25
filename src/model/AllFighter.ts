class AllFighter {
	//血量
    public blood: number = 1;
    //飞机模型
    public Image: egret.Bitmap;
    //X轴
    public X: number;
    //Y轴
    public Y: number;
    //子弹模型
    public bulletImage: string;
	//分数
	public scores:number;  
	//类型（UP OR DOWN）
	//public type:string;

	public init():AllBullet{
		var bullet:AllBullet = new AllBullet();
		//bullet.type=this.type;
		bullet.Img=new egret.Bitmap(RES.getRes(this.bulletImage));
		bullet.Img.width=50;
		bullet.Img.height=50;
		bullet.Plane=this;

		bullet.X=this.X+(this.Image.width/2-35);
		bullet.Y=this.Y-45;

		bullet.Img.x=bullet.X;
		bullet.Img.y=bullet.Y;
		return bullet;
	}

}