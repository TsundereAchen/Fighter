//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    private textfield: egret.TextField;



        /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private listResources = new Array(
        new Resources("preload","飞机模型"));

    private onAddToStage(event: egret.Event)
    {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    /**
     * 配置文件加载完成,开始预加载资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        for(var item in this.listResources)
        {
            var list: any = this.listResources[item];
            var resources: Resources = list;
            RES.loadGroup(resources.name);
        }
    }


    /**
     * Plane资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void
    {
        var isOver = false;
        for(var item in this.listResources)
        {
            var list: any = this.listResources[item];
            var resources: Resources = list;
            if(event.groupName == resources.name)
            {
                resources.isOver = true;
            }
            isOver = resources.isOver;
        }
        if(isOver)
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
            //背景
            this.fight = new Fighter();//创建可滚动的背景
            this.addChild(this.fight);
            this.createGameScene();
        }
    }

     /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void
    {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void
    {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    /**
     * Plane资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void
    {
        for(var item in this.listResources)
        {
            var list: any = this.listResources[item];
            var resources: Resources = list;
            if(event.groupName == resources.name)
            {
                this.loadingView.setCustomProgress(event.itemsLoaded,event.itemsTotal,resources.chinese);
            }
        }
    }
    public constructor(){
        super();
       
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);    
    }

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
    
     /**
     * 创建场景界面
     * Create scene interface
     */
   
    protected createGameScene():void{
        //super();
        // let gameScene = new GameScene();
        // this.addChild(gameScene);
        // if(gameScene.judge()) 
        this.lastTime = egret.getTimer();
        this.startGame();
        //this.start1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameScene,this);
    }  
 

    public startGame():void{
        //this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.fight.start();
        //初始化
        /**己方飞机发射时间间隔 */
        this.myFightTime=new egret.Timer(500);
        /**敌机发射间隔 */
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

       var over:egret.Bitmap=new egret.Bitmap(RES.getRes("curtain_png"));
       var backButton:egret.Bitmap=new egret.Bitmap(RES.getRes("start_png"));
       var label: egret.TextField = new egret.TextField();
       label.text = socre + "分";
       console.log("this.stage.x: " + this.stage.stageWidth);
       console.log("this.stage.y"  + this.stage.stageHeight);
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
            mapthis.startGame.apply(mapthis);
        },this);
        this.addChild(over);
        this.addChild(label);
        this.addChild(backButton);
    }

    //添加主角事件
    private AddMyPlane(){
        var bullet1=this[1].Shoot();
        this[0].bullet.push(bullet1);
        this[0].addChild(bullet1.Img);
    }

    //加入敌军
    private enemyFightersTimerfun(){
        var enemyplaneClass = new Enemy();
        var x = Math.random() * (this.stage.width - 110);//随机坐标
        var enemyplane = enemyplaneClass.init(x,-110);
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
        for(i=0;i<bulletCount;++i) {
           
            bullet1 = this.bullet[i];
         
           if(bullet1.Y - bullet1.Img.height > this.stage.stageHeight){
               this.removeChild(bullet1.Img);
               this.bullet.splice(i,1);
               i--;
               bulletCount--;
              
           }
            bullet1.Y -= 5 * speedOffset;
            bullet1.Img.y -= 5 * speedOffset;
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
            theFighter.Y+=3*speedOffset;
            theFighter.Image.y+=3*speedOffset;
        }
        this.collision();
    }

}
