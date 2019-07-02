/*
* 主场景 
*/
class GameScene extends eui.Component{   
    public start1:eui.Button; 
    public number1:number=0;
    public constructor(){
        super();
        this.skinName="resource/assets/res/GameScene.exml";
        //this.lastTime = egret.getTimer();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameScene,this);
    }  

    public GameScene():void{
       this.number1 = 1;
    }

    public judge():boolean{
        if(this.number1==1) return true;
        return false;
}}