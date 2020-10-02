



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

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;

           


        this.sobSP=function(s,p,e){
            trace(">>>>>>>>",s,p)
            if(s=="downSten" ){
                self.par.mObject.setObject(p)
            }
            if(s=="downPoint" ){

                self.par.mObject.setObject(p)
                trace(">>>",e)
                mark=1
                sp.x=p.position.x
                sp.y=p.position.y

                sp.x1 = e.data.originalEvent.clientX//+self.cont.x;
                sp.y1 = e.data.originalEvent.clientY; 
                sp.s= self.cont.scale.x;
                sp.o=p
                trace(">>1>")          
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove); 
            }
        }














        this.mousemove=function(e){

            if(mark==0){
                let xx=sp.x-(e.clientX-sp.x1)           
                self.cont.x=sp.x+(e.clientX-sp.x1);
                self.cont.y=sp.y+(e.clientY-sp.y1);
 
            }
            if(mark==1){
                sp.o.position.x=sp.x+(e.clientX-sp.x1)/sp.s;
                sp.o.position.y=sp.y+(e.clientY-sp.y1)/sp.s;
               
            }
            
        }
        this.mouseup=function(e){
            document.removeEventListener("mouseup", self.mouseup);
            document.removeEventListener("mousemove", self.mousemove); 
        }

        var mark=0
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}
        this.onDragStart=function(e){
            mark=0
            sp.x1=e.data.originalEvent.clientX//+self.cont.x;
            sp.y1=e.data.originalEvent.clientY; 
            sp.x=self.cont.x;
            sp.y=self.cont.y;
            sp.s= self.cont.scale.x;          
            document.addEventListener("mouseup", self.mouseup);
            document.addEventListener("mousemove", self.mousemove); 
        }


        this.setP20=function(p20){
            if(this.p20!=undefined)return
            this.cont=p20.cont2d;
            this.cont1=p20.c2dNiz;
            this.p20=p20
            this.p20.sobSP=this.sobSP
            //p20.cont2d,p20.c2dNiz,p20.deb.stage);
                     
            this.graphics = new PIXI.Graphics();
            p20.c2dNiz.addChild(this.graphics);
            this.graphics.name="xz";
            var r=20000;
            this.graphics.beginFill(0xdcf1fa, 1.5);
            this.graphics.drawRect(-r,-r,r*2,r*2);

            this.graphics.interactive = true;            
            this.graphics.on('mousedown', this.onDragStart);
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
            trace(delta)
        }


        document.addEventListener('mousewheel', this.mousewheel)
        document.addEventListener("DOMMouseScroll", this.mousewheel);

  		this.sizeWindow = function(w,h,s){ 
      		this.cont.x=w/2;
            this.cont.y=h/2;             	
  		} 


  	}

 
}
