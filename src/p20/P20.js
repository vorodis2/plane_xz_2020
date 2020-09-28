
import { SpStageSten } from './spSten/SpStageSten.js';
import { DebbugPixi } from './DebbugPixi.js';

export class P20  {
    constructor(textLink, fun) {
    	this.type="P20";
    	var self=this;

        this.fun=fun;
        this._activObject=undefined;
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';



        this.deb=new DebbugPixi() 
        this.div.appendChild(this.deb.div);

        this.content2d = new PIXI.Container();
        this.deb.content2d.addChild(this.content2d);

        /*this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);
    

        this.graphics.beginFill(Math.random()*0xffffff, 0.1);
        this.graphics.drawRect(-1000,-1000,2000,2000);
        this.content2d.scale.x=this.content2d.scale.y=0.1;*/

        this.sp=new SpStageSten(this);
        this.content2d.addChild(this.sp.content2d);

        this.setArrObj=function(a){
            this.sp.clear();
            trace(a);

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

            this.content2d.scale.x=this.content2d.scale.y=document.documentElement.clientHeight/(max.y1- max.y);
            this.content2d.x=(document.documentElement.clientWidth-this.content2d.scale.x*(max.x1- max.x))/2-max.x*this.content2d.scale.x;
            this.content2d.y=(document.documentElement.clientHeight-this.content2d.scale.y*(max.y1- max.y))/2-max.y*this.content2d.scale.y;                       

            this.sp.setObj(o); 
            //this.sp.doRender()
            for (var i = 0; i < this.sp.arrSplice.length; i++) {
                this.sp.arrSplice[i].dragPost();
            }

            trace(this.sp);
            //let s=JSON.stringify(o);
            //array[0].textArea.value=s;



        } 

            


        this.sizeWindow=function(w,h,s){
            this.deb.width=w;
            this.deb.height=h;    
            /*this.content2d.x= w/2
            this.content2d.y= h/2*/
        }

        this.getObj=function(){
            var o={};           
            return o;
        }

        this.setObj=function(o){           
            hScane.setObj(o.hScane);
        }

        this.render=function(){
            visi3D.intRend=1;
        }

        this.fun("complit")
    }




}  

