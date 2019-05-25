/*
* 主场景 
*/
class GameScene extends eui.Component{   
    public start:eui.Button; 
    //己方飞机发射时间间隔
    private myFightTime:egret.Timer=new egret.Timer(500);
    //创建敌机间隔
    private enemyFightTime:egret.Timer=new egret.Timer(500);
    //己方飞机
    private myFight:AllFighter;
    //敌方飞机
    private enemyFights:AllFighter[]=[];
    //子弹集合
    private bullet:AllBullet[]=[];
    //游戏底图
    private fight:Fighter;

    public constructor(){
        super();
        this.skinName="resource/assets/res/gameScene.exml";
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGameScene,this);
    }

    public createGameScene():void{
       this.startGame();
    }

    public startGame():void{
        this.fight.start();
        //初始化
        this.myFightTime=new egret.Timer(500);
        this.enemyFightTime=new egret.Timer(500);
        var bigFighter = new BigFighter();
        var plane = bigFighter.init(this);
        this.addChild(plane.Image);

        this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);

        this.myFight=plane;
        //主角添加事件
        this.myFightTime.addEventListener(egret.TimerEvent.TIMER,this.AddMyPlane,[this,plane]);
        this.myFightTime.start();
        
        //敌人添加事件
        this.enemyFightTime.addEventListener(egret.TimerEvent.TIMER,this.enemyFightersTimerfun,this);
        this.enemyFightTime.start();
    }

    //游戏结束
    private GameOver(): void{
        var bullet=this[1].Shoot();
        
    }

    //添加主角事件
    private AddMyPlane(){

    }

    //加入敌军
    private enemyFightersTimerfun(){

    }
    /*飞机碰撞检测*/
    private collision(){

    }

    //游戏画面更新
    public gameViewUpdate(){

    }
} 