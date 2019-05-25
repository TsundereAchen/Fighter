/*
* 主场景 
*/
class GameScene extends eui.Component{   
    public start1:eui.Button; 
    private lastTime:number;
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
        this.lastTime = egret.getTimer();
        this.start1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGameScene,this);
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
       this.myFightTime.stop();
       this.enemyFightTime.stop();
       this.myFightTime=null;
       this.enemyFightTime=null;
       for(var it in this.enemyFights){
           this.removeChild(this.enemyFights[it].Image);
       }
       this.enemyFights=[];
       for(var it in this.bullet){
           this.removeChild(this.bullet[it].Img)
       }
       this.bullet=[];
       this.fight.pause();
       
       var socre = this.myFight.scores;
       this.removeChild(this.myFight.Image);
       this.myFight.Image=null;
       this.myFight.scores=0;

       var over:egret.Bitmap=new egret.Bitmap(RES.getRes("curtain1_png"));
       var backButton:egret.Bitmap=new egret.Bitmap(RES.getRes("start_png"));
       var label: egret.TextField = new egret.TextField();
       label.text = socre + "分";
       label.x = this.stage.stageWidth / 2 - label.width / 2
       label.y = this.stage.stageHeight / 2;
       backButton.x = this.stage.stageWidth / 2 - backButton.width / 2;
       backButton.y = (this.stage.stageHeight / 2) + 80;
       var mapthis = this;
       backButton.touchEnabled = true;
        backButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(evt: egret.TouchEvent)
        {
            mapthis.lastTime = 0;
            mapthis.removeChild(over);
            mapthis.removeChild(label);
            mapthis.removeChild(backButton);
            //mapthis.start.apply(mapthis);
        },this);
        this.addChild(over);
        this.addChild(label);
        this.addChild(backButton);
    }

    //添加主角事件
    private AddMyPlane(){
        var bullet1=this[1].Shoot();
        this[0].bulet.push(bullet1);
        this[0].addChild(bullet1.Img);
    }

    //加入敌军
    private enemyFightersTimerfun(){
        var enemyplaneClass = new Enemy();
        var x = Math.random() * (this.stage.width - 128);//随机坐标
        var enemyplane = enemyplaneClass.init(x,-128);
        this.enemyFights.push(enemyplane);
        this.addChild(enemyplane.Image);
        var bullet1 = enemyplane.Shoot();
        this.bullet.push(bullet1);
        this.addChild(bullet1.Img);
    }
    /*飞机碰撞检测*/
    private collision(){
        var bullet1 = this.bullet;
        var enemyplane = this.enemyFights;
        var myPlane = this.myFight;
        for(var i in bullet1){
            if(bullet1[i].Plane.Image!=myPlane.Image){
                if(myPlane.Image!=null){
                    //计算显示对象,以确定它是否与 x 和 y 参数指定的点重叠或相交。
                    var isHi:boolean=myPlane.Image.hitTestPoint(bullet1[i].X,bullet1[i].Y - 40,true);
                    if(isHi){
                        bullet1.splice(bullet1.indexOf(bullet1[i]),1);
                        this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
                        this.GameOver.apply(this);
                        return;
                    }
                }
            }else{
                 for(var l in enemyplane)
                {
                    if(this.myFight != null)
                    {
                        var myHit: boolean = enemyplane[l].Image.hitTestPoint(this.myFight.X,this.myFight.Y,true);
                        if(myHit)
                        {
                            this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
                            this.GameOver.apply(this);
                            return;
                        }
                    }
                    var isHit: boolean = enemyplane[l].Image.hitTestPoint(bullet1[i].X,bullet1[i].Y,true);
                    if(isHit)
                    {
                        this.removeChild(bullet1[i].Img);
                        bullet1.splice(bullet1.indexOf(bullet1[i]),1);
                        this.removeChild(enemyplane[l].Image);
                        enemyplane.splice(enemyplane.indexOf(enemyplane[l]),1);
                        this.myFight.scores += 10;
                    }
                }

            }
        }
    }

    //游戏画面更新
    public gameViewUpdate(){
         //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime: number = egret.getTimer();
        var fps:number=1000/(nowTime-(this.lastTime));
        this.lastTime=nowTime;
        var speedOffset:number=60/fps;

        /*
        * 统一子弹管理
        */ 
        var i:number=0;
        var bullet1:AllBullet;
        var bulletCount:number=this.bullet.length;
        for(i=0;i<bulletCount;++i){
            bullet1=this.bullet[i];
             if(bullet1.Y - bullet1.Img.height > this.stage.stageHeight)
                {
                    this.removeChild(bullet1.Img);
                    this.bullet.splice(i,1);
                    i--;
                    bulletCount--;
                }
                bullet1.Y += 7 * speedOffset;
                bullet1.Img.y += 7 * speedOffset;
            }

        //敌机飞行
        var theFighter:AllFighter;
        var enemyplaneCount:number = this.enemyFights.length;
        for(i = 0;i < enemyplaneCount;++i){
            theFighter=this.enemyFights[i];
            if(theFighter.Y-theFighter.Image.height>this.stage.stageHeight){
                this.removeChild(theFighter.Image);
                this.enemyFights.splice(i,1);
                i--;
                enemyplaneCount--;
            }
            theFighter.Y+=4*speedOffset;
            theFighter.Image.y+=4*speedOffset;
        }
        this.collision();
    }

}