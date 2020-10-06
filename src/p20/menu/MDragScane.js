



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
        this._menuIndex=0

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;

           
        var point,point1,sten,activSten

        this.sobSP=function(s,p,e){
            
            if(s=="downSten" ){
                self.par.mObject.setObject(p)
            }
            if(s=="downPoint" ){
                
                

                if(self._menuIndex==0){
                    self.par.mObject.setObject(p)                
                    mark=1
                    sp.x=p.position.x
                    sp.y=p.position.y

                    sp.x1 = e.data.originalEvent.clientX//+self.cont.x;
                    sp.y1 = e.data.originalEvent.clientY; 
                    sp.s= self.cont.scale.x;
                    sp.o=p
                }

                if(self._menuIndex==1){
                    point=self.p20.sp.craetPoint();
                    point.position.setPoint(p.position);
                    activSten=self.p20.sp.craetSplice1();                    
                    point.addSplice(activSten, true);
                    p.addSplice(activSten, false);
                    activSten.delph=500;   

                    self.par.mObject.setObject(point)      
                    mark=1;
                    sp.x=p.position.x;
                    sp.y=p.position.y;

                    sp.x1 = e.data.originalEvent.clientX//+self.cont.x;
                    sp.y1 = e.data.originalEvent.clientY; 
                    sp.s = self.cont.scale.x;
                    sp.o = point;
                }

                         
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove); 
            }
        }



        var po1={x:0,y:0,o:null}
        var po,rezult
        this.getDistSten=function(_sten, _point){
            var rezult=-1;
            po1.x=_point.x;
            po1.y=_point.y;
            
            po=calc.isPointInLin(_sten.position,_sten.position1,po1,11111,0);
        
            rezult=calc.getDistance(po1,po);
            return rezult
        }

        var pos={x:0,y:0,o:null}
        var r
        this.korektAP=function(_p,_o){
            _p.x=Math.round(_p.x/100)*100;
            _p.y=Math.round(_p.y/100)*100;
            _p.o=null;

           /* for (var i = 0; i < self.p20.sp.arrSplice.length; i++) {
                if (!self.p20.sp.arrSplice[i].life) continue;
                r=this.getDistSten(self.p20.sp.arrSplice[i],_p)
               
            }*/
            if(_o==undefined && _o._uuid==undefined)return

            for (var i = 0; i < self.p20.sp.arrPoint.length; i++) {
                if (!self.p20.sp.arrPoint[i].life) continue;
                if (self.p20.sp.arrPoint[i]._uuid==_o._uuid)continue;
                let d=calc.getDistance(self.p20.sp.arrPoint[i].position,_p)
                if(d<300){
                    _p.x=self.p20.sp.arrPoint[i].position.x;
                    _p.y=self.p20.sp.arrPoint[i].position.y;
                    _p.o=self.p20.sp.arrPoint[i];
                    return
                }
            }
         
            
            for (var i = 0; i < self.p20.sp.arrSplice.length; i++) {
                if (!self.p20.sp.arrSplice[i].life) continue;
                if(
                    self.p20.sp.arrSplice[i].addPoint._uuid==_o._uuid||
                    self.p20.sp.arrSplice[i].addPoint1._uuid==_o._uuid
                )continue;
                
                r=this.getDistSten(self.p20.sp.arrSplice[i], _p)
                
                if(r!=-1&&r<600){
                    _p.x=po.x;
                    _p.y=po.y;
                    _p.o=self.p20.sp.arrSplice[i];
                    return                    
                }
            }

        }





        this.mousemove=function(e){
            if(mark==0){
                let xx=sp.x-(e.clientX-sp.x1)           
                self.cont.x=sp.x+(e.clientX-sp.x1);
                self.cont.y=sp.y+(e.clientY-sp.y1); 
            }
            if(mark==1){
                pos.x=sp.x+(e.clientX-sp.x1)/sp.s
                pos.y=sp.y+(e.clientY-sp.y1)/sp.s
                
                self.korektAP(pos,sp.o);
                

                sp.o.position.x=pos.x;
                sp.o.position.y=pos.y;
                self.p20.sp.addObjFun(sp.o);                        
            }            
        }
        this.mouseup=function(e){

            if(mark==1){
                pos.x=sp.o.position.x;
                pos.y=sp.o.position.y;
                self.korektAP(pos,sp.o);
                
                if(pos.o!=null&&pos.o.type!=undefined){
                    if(pos.o.type=="SpPointSten"){
                        sp.o.slitie(pos.o)
                        sp.o.dragVokrug();
                    }                   
                    if(pos.o.type=="SpliceSten"){
                        pos.o.dividedSten(sp.o,true)
                        sp.o.dragVokrug();                        
                    }                     
                }
            }


            mark=-1
            document.removeEventListener("mouseup", self.mouseup);
            document.removeEventListener("mousemove", self.mousemove); 
        }

        var mark=0
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}
        var speee={x:0,y:0,x1:0,y1:0,s:0,o:null}
        this.onDragStart=function(e){

            let drag=true;
            
           
           
            if(self._menuIndex==1&&e.data.originalEvent.button==0){

                speee.x=(e.data.global.x-self.cont.x)/self.cont.scale.x;
                speee.y=(e.data.global.y-self.cont.y)/self.cont.scale.x;

             
                point1=self.p20.sp.craetPoint();
                point1.position.setPoint(speee);
                self.p20.sp.addObjFun(point1); 

                point=self.p20.sp.craetPoint();
                point.position.setPoint(speee);
                self.p20.sp.addObjFun(point);

                activSten=self.p20.sp.craetSplice1();                    
                point.addSplice(activSten, true);
                point1.addSplice(activSten, false);
                activSten.delph=500;  
                mark=1;

                sp.x=point.position.x;
                sp.y=point.position.y;

                sp.x1 = e.data.originalEvent.clientX//+self.cont.x;
                sp.y1 = e.data.originalEvent.clientY; 

                sp.s = self.cont.scale.x;
                sp.o = point;
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove); 
                drag=false
            }

            if(drag==true){
                mark=0;
                sp.x1=e.data.originalEvent.clientX//+self.cont.x;
                sp.y1=e.data.originalEvent.clientY; 
                sp.x=self.cont.x;
                sp.y=self.cont.y;
                sp.s= self.cont.scale.x;          
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove); 
            }
        }


        this.setP20=function(p20){
            if(this.p20!=undefined)return
            this.cont=p20.cont2d;
            this.cont1=p20.c2dNiz;
            this.p20=p20;
            this.p20.sobSP=this.sobSP;
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
           
        }


        document.addEventListener('mousewheel', this.mousewheel)
        document.addEventListener("DOMMouseScroll", this.mousewheel);

  		this.sizeWindow = function(w,h,s){ 
      		this.cont.x=w/2;
            this.cont.y=h/2;             	
  		} 


  	}

    set menuIndex(value) {      
        if(this._menuIndex!=value){
            this._menuIndex= value;
            
        }
    }    
    get menuIndex() { return  this._menuIndex;}
}
