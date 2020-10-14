

import { PGrid } from '../plus/PGrid.js';
import { MKrai } from './MKrai.js';

import { SpDebugPixi } from '../spSten/SpDebugPixi.js';


export class MGridDrag  {
  	constructor(par,fun) {  		
  		this.type="MGridDrag";
  		var self=this;
        this.par=par
        this.fun=fun

        this.otstup=par.otstup;
        this.otstup1=par.otstup1;
        this.wh=par.wh;

        this.width=100;
        this.height=100;

        this._mashtab=1;

        this.sizeMax=par.sizeMax;

        this.dCont = new DCont(this.par.dCont); 
        

        this.visiPixi = this.par.par.visiPixi;


        this.mKrai = new MKrai(this, function(s,p){             
            
        });
        this.debugPixi = new SpDebugPixi();
        this.par.par.cont2d.addChild(this.debugPixi.content2d);
        this.debugPixi.content2d.scale.set(0.2,0.2)
     
        this.grid = new PGrid(this.par.par.content2d,this.sizeMax, 200)

        this.graphics = new PIXI.Graphics();
        this.par.par.content2d.addChild(this.graphics);   
        this.graphics1 = new PIXI.Graphics();
        this.par.par.content2d.addChild(this.graphics1);







        this.panel = new DPanel(this.dCont,this.otstup,this.otstup*4+this.wh);
        this.panel.div.appendChild(this.visiPixi.div);






        //////////////////////////////
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}

        this.cont=this.par.par.content2d;
        this.p20
        function mMove(e){

            self.cont.x=sp.x+(e.clientX-sp.x1);
            self.cont.y=sp.y+(e.clientY-sp.y1);
            self.korestPosit()
        }

        function mUp(e){           
            document.removeEventListener("mouseup", mUp);
            document.removeEventListener("mousemove", mMove); 
        }

        this.downFont=function(e){                        
            sp.x1=e.data.originalEvent.clientX//+self.cont.x;
            sp.y1=e.data.originalEvent.clientY; 
            sp.x=self.cont.x;
            sp.y=self.cont.y;
            sp.s= self.cont.scale.x;          
            document.addEventListener("mouseup", mUp);
            document.addEventListener("mousemove", mMove); 
        }
        this.klikGoem=function(e){            
            self.par.mDragScane.sobSP("downFont",null,e);
        }
        /////////////////////////////////////



        var pp={x:0,y:0,w:0,h:0}
        var pp1={x:0,y:0,w:this.sizeMax,h:this.sizeMax}

        this.korestPosit  = function(){
            let s=this.sizeMax*this._mashtab;
            let s1=s/pp.w;
            if(s/pp.h<s1)s1=s/pp.h;
            if(s1<1){//коректируем маштаб
                this.mashtab/=s1;
                let s=this.sizeMax*this._mashtab;
                return;
            }



            


            pp1.h=pp1.w=s;          
            pp1.x=self.cont.x-pp1.w/2
            pp1.y=self.cont.y-pp1.w/2


            if(pp.x<pp1.x)self.cont.x=pp.x+this.sizeMax/2*this._mashtab
            if(pp.x+pp.w>pp1.x+pp1.w)self.cont.x=-(pp.x+this.sizeMax/2*this._mashtab)
            

            if(pp.y<pp1.y)self.cont.y=pp.y+this.sizeMax/2*this._mashtab
            if(pp.y+pp.h>pp1.y+pp1.h)self.cont.y=-(pp.y+this.sizeMax/2*this._mashtab)    

                   
            pp1.x=self.cont.x-pp1.w/2
            pp1.y=self.cont.y-pp1.w/2

            this.debugPixi.clear()
            this.debugPixi.dPoint({x:0,y:0})
            this.debugPixi.dRect(pp,0xff00000)
            this.debugPixi.dRect(pp1,0x00ff000)


            this.mKrai.set(pp,pp1)
        }
/*


var rect = {x:0,y:0}//e.target.getBoundingClientRect();
        


    this.restartPoint = function (e) {
        if(e && e.target){
            rect = e.target.getBoundingClientRect();
        }*/
        var rect = {x:0,y:0}//
        this.point={x:0,y:0}
        this.point1={x:0,y:0}
        var sahW=0.05;
        var hhh, www;
        this.mousewheel = function (e) {       
            
            var delta=-1;
            var p=e.delta
            if(e.wheelDelta==undefined){
                p=e.wheelDelta
            }
            if(e.delta)if(e.delta<0)delta=1;
            if(e.deltaY)if(e.deltaY<0)delta=1;
            if(e.detail)if(e.detail<0)delta=1;

            
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)delta=-1;
                else delta=1;
            }
            var s=-delta*sahW+self._mashtab;            
            if(s<0.01)s=0.01;

            rect = self.panel.div.getBoundingClientRect();
            self.point.x=((dcmParam.globXY.x-rect.x)/scal/self.width)*2-1
            self.point.y=((dcmParam.globXY.y-rect.y)/scal/self.height)*2-1


            var gg = new PIXI.Graphics();
            self.par.par.content2d.addChild(gg);
            gg.beginFill(0xdc0000, 0.5);
            gg.drawRect(0,0,10,10);

            let xx =(self.width/2*self.point.x)/self._mashtab-self.cont.x/self._mashtab
            let yy =(self.height/2*self.point.y)/self._mashtab-self.cont.y/self._mashtab
            gg.position.x=xx
            gg.position.y=yy
            trace(rect)
            trace(dcmParam.globXY)
            trace(self.point)


            self.mashtab=s


            var gg = new PIXI.Graphics();
            self.par.par.content2d.addChild(gg);
            gg.beginFill(0x00dc00, 0.5);
            gg.drawRect(0,0,10,10);

            let xx1 =(self.width/2*self.point.x)/self._mashtab-self.cont.x/self._mashtab
            let yy1 =(self.height/2*self.point.y)/self._mashtab-self.cont.y/self._mashtab
            gg.position.x=xx1
            gg.position.y=yy1

            self.cont.x-= (xx-xx1)*self._mashtab  
            self.cont.y-= (yy-yy1)*self._mashtab
            self.korestPosit();      
        }


        this.panel.div.addEventListener('mousewheel', this.mousewheel)
        this.panel.div.addEventListener("DOMMouseScroll", this.mousewheel);

        //////////////////////////////////

        
        this.graphics.name="xz";
        var r=this.sizeMax;
        this.graphics.beginFill(0xdcf1fa, 0.5);
        this.graphics.drawRect(-r/2,-r/2,r,r);
        this.graphics.interactive = true; 
        this.graphics.on('mousedown', this.klikGoem)

        this.graphics1.beginFill(0xdc0000, 0.5);
        this.graphics1.drawRect(0,0,100,100);

        var scal=1
        this.sizeWindow = function(w,h,s){            
            scal=s
            this.panel.width= w/s-this.otstup*3-this.wh/2;
            this.panel.height= h/s-this.otstup*6-this.wh-this.wh/2; 

            this.width=Math.round(this.panel.width);
            this.height=Math.round(this.panel.height);

            this.visiPixi.sizeWindow(this.width,this.panel.height)
            this.visiPixi.render();


            pp.w=this.width
            pp.h=this.height

            pp.x=-this.width/2
            pp.y=-this.height/2

            this.par.par.cont2d.position.set(this.width/2,this.height/2)

            this.mKrai.sizeWindow(this.width,this.height,s)
            self.korestPosit();
        }
    }

    set mashtab(value) {      
        if(this._mashtab!=value){
            this._mashtab= value;
            this.cont.scale.x=this.cont.scale.y=value  
            this.korestPosit();
        }
    }    
    get mashtab() { return  this._mashtab;}
    
}
