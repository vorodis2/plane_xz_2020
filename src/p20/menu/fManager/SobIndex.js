

import { Calc } from './Calc.js';


export class SobIndex  {
  	constructor(par,fun) {  		
  		this.type="SobIndex";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this._active=false;
        this.funActive=undefined;

        this._sah=0

        var calc = new Calc()

        this.setActive = function () { 
            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= true; 
            this.par.floor.bazaMod.activMouse= false;
            this.par.floor.bazaMod.activeRadius= false;
            
        }


        this.move = function (e) { 

        }

        this.out = function (e) {   
            
        }

        this.over = function (e) {   
            
        }

        this.down = function (e) {            
           
        }

        this.clear=function(){
            this._sah=0
        }

        var arrPoint,arrSplice
        var bool
        this.clearActive=function(){
            //this.floor.sp.activMouse
            bool=false 
              
            arrPoint=this.par.floor.sp.arrPoint
            arrSplice=this.par.floor.sp.arrSplice
            for (var i = 0; i < arrPoint.length; i++) {                
                if (!arrPoint[i].life) continue;
                if (arrPoint[i].active !== bool){
                    arrPoint[i].active =bool
                }
            } 

            for (var i = 0; i < arrSplice.length; i++) {
                if (!arrSplice[i].life) continue;
                if (arrSplice[i].active !== bool){
                    arrSplice[i].active =bool
                }                
            }           
        }


        this.distSten=20;

        this.getPosEv3D = function(e){
            var rezult=new THREE.Vector3()
            rezult.set(-this.par.whSize/2+this.par.whSize*e.uv.x,-(-this.par.whSize/2+this.par.whSize*e.uv.y),0)  
            return rezult
        }

        var po=new THREE.Vector2()
        var po1=new THREE.Vector2()
        var sten

        this.getSten=function(c3d){
           // if(c3d.sten!=undefined)return c3d.sten;
            //if(c3d.parent!=undefined)return this.getSten(c3d.parent);

            return this.getParName(c3d,"sten")
            //return null
        }

        this.getParName=function(c3d,name){
            
            if(c3d[name]!=undefined)return c3d[name];
            if(c3d.parent!=undefined)return this.getParName(c3d.parent,name);
            return null
        }


        this.getPosEv3DSten=function(e){
            var rezult=new THREE.Vector3()            
            sten=this.getSten(e.target)
            
            if(sten==null)return null

            
            rezult.z=2
            po1.x=e.point.x;
            po1.y=e.point.z;

            if(calc.getDistance(po1,sten.position)<25){
                rezult.z=0;
                rezult.x=sten.position.x;
                rezult.y=sten.position.y;
                return rezult
            }

            if(calc.getDistance(po1,sten.position1)<25){
                rezult.z=1;
                rezult.x=sten.position1.x;
                rezult.y=sten.position1.y;
                return rezult
            }

            

            
            po=calc.isPointInLin(sten.position,sten.position1,po1,100,100)
            //trace("FIXE 1",po, sten)
            rezult.z=2
            rezult.x=po.x;
            rezult.y=po.y;


            return rezult
        }

/*
        this.getDistSten=function(_sten, _point){
            var rezult=-1;
            po1.x=_point.x;
            po1.y=_point.z;

            po=calc.isPointInLin(_sten.position,_sten.position1,po1,11111,11111)
            rezult=calc.getDistance(_sten.position,po)
            

            return rezult
        }*/




        ////////////////////////////////////
        var aStPo=[]
        var positionOld=new THREE.Vector3() 
        var aPointOld
        var arrPPos=[]
        var arrPSt=[]
        this.startAP=function(aPoint,aPoint1){
            aPointOld=aPoint
            if(aPoint){
                positionOld.x=aPoint.position.x;
                positionOld.y=aPoint.position.y;   
            }else{
                positionOld.x=9999999999;
                positionOld.y=9999999999;   
            }
            
            
            arrPPos.length=0
            for (var i = 0; i < this.par.floor.sp.arrPoint.length; i++) {
                if (!this.par.floor.sp.arrPoint[i].life) continue;
                if (aPoint && this.par.floor.sp.arrPoint[i]._uuid==aPoint._uuid) {                    
                    continue;
                }
                if(aPoint1){
                    if (this.par.floor.sp.arrPoint[i]._uuid==aPoint1._uuid) {                    
                        continue;
                    } 
                }
                arrPPos.push(this.par.floor.sp.arrPoint[i])
            }
            


            arrPSt.length=0
            var b;
            for (var i = 0; i < this.par.floor.sp.arrSplice.length; i++) {
                if (!this.par.floor.sp.arrSplice[i].life) continue;
                b=true
                for (var j = 0; j < aPoint.arrSHron.length; j++) {                    
                    if (aPoint.arrSHron[j].sten._uuid==this.par.floor.sp.arrSplice[i]._uuid) { 
                        b=false
                        
                    } 
                }                
                if(b==true)arrPSt.push(this.par.floor.sp.arrSplice[i])
            }
            


            //arrSplice=this.par.floor.sp.arrSplice
        }
        var ot=10;
        /*this.korektAP=function(point){
            point.x=Math.round(point.x*10)/10;
            point.y=Math.round(point.y*10)/10;

            if(positionOld.x-ot<point.x && positionOld.x+ot>point.x){                
                point.x=positionOld.x
            }
            if(positionOld.y-ot<point.y && positionOld.y+ot>point.y){                
                point.y=positionOld.y
            }
            point.obj=undefined


            



            for (var i = 0; i < arrPPos.length; i++) {                
                if(calc.getDistance(point,arrPPos[i].position)<ot*1.01){
                    point.x=arrPPos[i].position.x;
                    point.y=arrPPos[i].position.y;
                    point.obj=arrPPos[i]                    
                    return
                }
                if(arrPPos[i].position.x-ot<point.x && arrPPos[i].position.x+ot>point.x){                
                    point.x=arrPPos[i].position.x
                }
                if(arrPPos[i].position.y-ot<point.y && arrPPos[i].position.y+ot>point.y){                
                    point.y=arrPPos[i].position.y
                }
            }

            for (var i = 0; i < arrPSt.length; i++) {
                
                po=calc.isPointInLin(arrPSt[i].position,arrPSt[i].position1,point,ot,ot)
                if(po!=null){
                    point.x= po.x;
                    point.y= po.y;
                    point.obj=arrPSt[i]
                    return
                }
                
                
                
            }
        }*/



        var po1={x:0,y:0,o:null}
        var po,rezult
        this.getDistSten=function(_sten, _point){
            var rezult=-1;
            po1.x=_point.x;
            po1.y=_point.y;            
            po=calc.isPointInLin(_sten.position,_sten.position1,po1,11111,0);        
            rezult=calc.getDistance(po1,po);
            return rezult;
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






        this.downFont=function(e){
            self.par.par.mGridDrag.downFont(e);
        }

        this.setP20=function(p20){
            self.cont=p20.cont2d
            self.p20=p20
        }


        this.sobSP=function(s,p,e){ 
            trace(this.type+" sobSP >>",s,p,e)    
        }
                
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;            
            if(this.funActive!=undefined)this.funActive();
           
            
        }       
    }   
    get active() { return  this._active;}  


}



