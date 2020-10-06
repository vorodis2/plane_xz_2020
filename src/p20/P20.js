
import { SpStageSten } from './spSten/SpStageSten.js';
import { DebbugPixi } from './DebbugPixi.js';

export class P20  {
    constructor(fun) {
    	this.type="P20";
    	var self=this;


        this.sobSP=undefined;


        this.fun=fun;
        this._activObject=undefined;
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';



        this.deb=new DebbugPixi(); 
        this.div.appendChild(this.deb.div);



        this.content2d = new PIXI.Container();
        this.c2dNiz = new PIXI.Container();
        this.cont2d = new PIXI.Container();
        this.cont2d.addChild(this.c2dNiz);
        this.cont2d.addChild(this.content2d);

        this.deb.content2d.addChild(this.cont2d);



        /*this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);
    

        this.graphics.beginFill(Math.random()*0xffffff, 0.1);
        this.graphics.drawRect(-1000,-1000,2000,2000);
        this.content2d.scale.x=this.content2d.scale.y=0.1;*/

        this.rectXX1={x:0,x1:0,y:0,y1:0,s:1,xs:0,ys:0}

        this.sp=new SpStageSten(this);
        this.content2d.addChild(this.sp.content2d);
        this.content2d.addChild(this.sp.content2dPoint);

        this.content2d.addChild(this.sp.cont2dDebug);

        this.setArrObj=function(a){
            this.sp.clear();
            
            if(a[0]==undefined&&a.type!=undefined){
                this.setObj(a)
                return
            }
           
            

            var o={};
            o.type="SpStageSten";

            o.tipPoint="SpPointSten";
            o.arrPoint=[];
            o.arrSplice=[];
            var max={x:99999,y:99999,x1:-999999,y1:-99999}
            for (var i = 0; i < a.length; i++) {
                let oo={}
                oo.position=a[i].point0;
                oo.position1=a[i].point1;

                oo.delph=a[i].width;
                oo.idUi=a[i].id;
                o.arrSplice.push(oo);

                

                if(max.x>a[i].point0.x)max.x=a[i].point0.x
                if(max.y>a[i].point0.y)max.y=a[i].point0.y
                
                if(max.x1<a[i].point0.x)max.x1=a[i].point0.x
                if(max.y1<a[i].point0.y)max.y1=a[i].point0.y                
            }

            var mm=150
            max.x-=mm;            
            max.y-=mm;                        
            max.x1+=mm*2;                        
            max.y1+=mm*2;
            var sss=document.documentElement.clientHeight/(max.y1- max.y);
            
            this.rectXX1.x=max.x;
            this.rectXX1.x1=max.x1;
            this.rectXX1.y=max.y;
            this.rectXX1.y1=max.y1;
            this.rectXX1.s=document.documentElement.clientHeight/(max.y1- max.y);
            this.rectXX1.xs=(document.documentElement.clientWidth-this.rectXX1.s*(max.x1- max.x))/2-max.x*this.rectXX1.s;
            this.rectXX1.ys=(document.documentElement.clientHeight-this.rectXX1.s*(max.y1- max.y))/2-max.y*this.rectXX1.s;  
            




            

            this.setObj(o)    
           



        } 



        this.creatRect=function(){
            
           
            var max={x:99999,y:99999,x1:-999999,y1:-99999}
            for (var i = 0; i < this.sp.arrPoint.length; i++) { 
                if(max.x>this.sp.arrPoint[i].position.x)max.x=this.sp.arrPoint[i].position.x
                if(max.y>this.sp.arrPoint[i].position.y)max.y=this.sp.arrPoint[i].position.y
                
                if(max.x1<this.sp.arrPoint[i].position.x)max.x1=this.sp.arrPoint[i].position.x
                if(max.y1<this.sp.arrPoint[i].position.y)max.y1=this.sp.arrPoint[i].position.y                
            }


            var mm=150;
            max.x-=mm;            
            max.y-=mm;                        
            max.x1+=mm*2;                        
            max.y1+=mm*2;
            var sss=document.documentElement.clientHeight/(max.y1- max.y);

            
            
            this.rectXX1.x=max.x;
            this.rectXX1.x1=max.x1;
            this.rectXX1.y=max.y;
            this.rectXX1.y1=max.y1;
            this.rectXX1.s=document.documentElement.clientHeight/(max.y1- max.y);
            this.rectXX1.xs=(document.documentElement.clientWidth-this.rectXX1.s*(max.x1- max.x))/2-max.x*this.rectXX1.s;
            this.rectXX1.ys=(document.documentElement.clientHeight-this.rectXX1.s*(max.y1- max.y))/2-max.y*this.rectXX1.s; 



        }

            


        this.sizeWindow=function(w,h,s){
            this.deb.width=w;
            this.deb.height=h;   
            
        }

        this.getObj=function(){
            var o=this.sp.getObj();
            return o;
        }

        this.setObj=function(o){ 
            this.sp.setObj(o); 
            //this.sp.doRender()
            /*for (var i = 0; i < this.sp.arrSplice.length; i++) {
                this.sp.arrSplice[i].dragPost();
            } */          
          
        }

        this.render=function(){ 
            this.deb.tick()
        }    

        function animate() {
            requestAnimationFrame( animate );
            if(self.sp.doRender()==true){
               
                for (var i = 0; i < self.sp.arrSplice.length; i++) {
                    self.sp.arrSplice[i].dragPost();

                }
                for (var i = 0; i < self.sp.arrPoint.length; i++) {
                    self.sp.arrPoint[i].dragPost();
                }
            }   
              self.render()       
        }
        animate();
        

        this.fun("complit")
    }




}  

