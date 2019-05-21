class GameScene extends eui.Component{   
    public start:eui.Button; 

    public constructor(){
        super();
        this.skinName="resource/assets/res/gameScene.exml";
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGameScene,this);
    }

    public createGameScene():void{
        let fighter = new Fighter();
        this.addChild(fighter);
    }
} 