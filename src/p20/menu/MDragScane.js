

import { SobIndex } from './fManager/SobIndex.js';
import { SobIndex0 } from './fManager/SobIndex0.js';
import { SobIndex1 } from './fManager/SobIndex1.js';
import { SobIndex2 } from './fManager/SobIndex2.js';

export class MDragScane  {
  	constructor(par,fun) {  		
  		this.type="MDragScane";
  		var self=this;
        this.par=par
        this.fun=fun
        this.p20=undefined;
        this.cont=undefined;
        this.cont1=undefined;
        this.stage=undefined;
        this._menuIndex=-1

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;



        this.actAI=undefined;
        this.sobIndex=[]
        this.sobIndex[0]=new SobIndex0(this);
        this.sobIndex[1]=new SobIndex1(this);
        this.sobIndex[2]=new SobIndex2(this);
        //this.sobIndex[3]=new SobIndex3(this);






           


        this.sobSP=function(s,p,e){             
            if(self.actAI!=undefined){
                self.actAI.sobSP(s,p,e)
            }   
        }




      
       




        this.klikGoem=function(e){
            self.sobSP("downFont",null,e);
        }

        this.setP20=function(p20){
            if(this.p20!=undefined)return
            this.cont=p20.cont2d;
            this.cont1=p20.c2dNiz;
            this.p20=p20;
            this.p20.sobSP=this.sobSP;

            for (var i = 0; i < this.sobIndex.length; i++) {
                this.sobIndex[i].setP20(p20)
            }
                     
            this.graphics = new PIXI.Graphics();
            p20.c2dNiz.addChild(this.graphics);
            this.graphics.name="xz";
            var r=20000;
            this.graphics.beginFill(0xdcf1fa, 1.5);
            this.graphics.drawRect(-r,-r,r*2,r*2);
            this.graphics.interactive = true;            
            this.graphics.on('mousedown', this.klikGoem)//this.onDragStart);


        }  

        this.redrag  = function(){  
            this.p20.creatRect()
            this.cont.x=this.p20.rectXX1.xs;
            this.cont.y=this.p20.rectXX1.ys;
            this.scale(this.p20.rectXX1.s) /* */           
        }

        this.scale  = function(s){
            this.cont.scale.x=this.cont.scale.y=s
            
        }



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
            var s=-delta*0.01+self.cont.scale.x
            if(s<0.01)s=0.01
            self.scale(s)           
        }


        document.addEventListener('mousewheel', this.mousewheel)
        document.addEventListener("DOMMouseScroll", this.mousewheel);

  		this.sizeWindow = function(w,h,s){ 
            if(this.cont){
                this.cont.x=w/2;
                this.cont.y=h/2;  
            }      		            	
  		} 
  	}

    set menuIndex(value) {      
        if(this._menuIndex!=value){
            this._menuIndex= value;
            for (var i = 0; i < this.sobIndex.length; i++) {
                this.sobIndex[i].active=false
            }
           
            this.actAI=undefined
            if(this.sobIndex[this._menuIndex]!=undefined){
                this.actAI = this.sobIndex[this._menuIndex];
                this.sobIndex[this._menuIndex].active=true
            }
            
        }
    }    
    get menuIndex() { return  this._menuIndex;}
}
