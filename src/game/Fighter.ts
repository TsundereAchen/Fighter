class Fighter extends eui.Component {

	private img:eui.Image;
	
	public constructor() {
		super();
		this.createBitmapByName();
	}


	private createBitmapByName():void{
        this.img = new eui.Image();
        this.img.source = "resource/assets/images/curtain.png";
        this.addChild(this.img);
    }
}