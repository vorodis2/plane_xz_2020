






import { SobIndex } from './SobIndex.js';


export class SobIndex1  extends SobIndex {
    constructor(par,fun) {
        super(par,fun);            
        this.type="SobIndex1";
        var self=this;
        this.par=par;
        this.fun=fun;

        var pos={x:0,y:0,o:null}
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}
        var point,activSten
        this.mousemove=function(e){           
            pos.x=sp.x+(e.clientX-sp.x1)/sp.s
            pos.y=sp.y+(e.clientY-sp.y1)/sp.s            
            self.korektAP(pos,sp.o);
            sp.o.position.x=pos.x;
            sp.o.position.y=pos.y;
            self.p20.sp.addObjFun(sp.o);       
        } 


        this.mouseup=function(e){
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
            document.removeEventListener("mouseup", self.mouseup);
            document.removeEventListener("mousemove", self.mousemove); 
        }


        this.sobSP=function(s,p,e){          
            if( e.data.originalEvent.button!=0){ 
                self.downFont(e); 
                return;
            }


            if(s=="downSten"){
                self.par.par.mObject.setObject(p)
            }

            if(s=="downPoint"){
                point=self.p20.sp.craetPoint();
                point.position.setPoint(p.position);
                activSten=self.p20.sp.craetSplice1();                    
                point.addSplice(activSten, true);
                p.addSplice(activSten, false);
                activSten.delph=500;   

                self.par.par.mObject.setObject(point)      
                
                sp.x=p.position.x;
                sp.y=p.position.y;

                sp.x1 = e.data.originalEvent.clientX//+self.cont.x;
                sp.y1 = e.data.originalEvent.clientY; 
                sp.s = self.cont.scale.x;
                sp.o = point;
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove);                    
                 
            }
                     
        }
    }
}
















/*
import { SobIndex } from './SobIndex.js';


export class SobIndex1  extends SobIndex {
  	constructor(par,fun) {
        super();      		
  		this.type="SobIndex1";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this._tipDrav=0;

        var p
        var point, point1, pg
        var activSten
        var activStenOld=undefined
        var sten,sten1


        this.setActive = function () { 
            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= true; 
            this.par.floor.bazaMod.activMouse= false;
            this.par.floor.bazaMod.activeRadius= false;
            this.par.floor.sp.amPol = false
        }


        this.move = function (e) {   
            if(self._tipDrav==0)self.moveSten(e);
            if(self._tipDrav==1)self.movePol(e);
        } 




        this.out = function (e) {   
            
        }

        this.over = function (e) {   
            
        }

        this.down = function (e) { 
            if(self._tipDrav==0)self.downSten(e);
            if(self._tipDrav==1)self.downPol(e);
        }






        this.arrPolPoint=[];
        var pol;

        this.movePol = function (e) {
            if(self.arrPolPoint.length>2){//тоскаем одну точку
                if(e.target.name=='ManMouse3D'){   
                    if(e.target.name=='ManMouse3D'){                   
                        p=self.getPosEv3D(e)
                        self.korektAP(p)
                        //trace(p)
                        
                        point.position.setPoint(p)
                        point.dragVokrug();
                        point.drag();

                        self.par.visi3D.intRend=1;
                    }

                }
                if(e.target.name=='PointSten'){                   
                    point.position.setPoint(e.target.objGlob.position)
                    point.dragVokrug();
                    point.drag();
                    self.par.visi3D.intRend=1;
                }

                if(e.target.name=='Sten3D'){ 
                    sten=self.getSten(e.target)
                    if(sten==null)return
                    p=self.getPosEv3DSten(e)

                    point.position.setPoint(p)
                    point.dragVokrug();
                    point.drag();
                    self.par.visi3D.intRend=1;
                }

            }

        }


        this.stopDrag = function () {  
            if(self.arrPolPoint.length!=0){
                if(point)point.activMouse=true;  
                if(pol!=undefined){
                    self.par.activOne(pol);
                    point.clear()
                    pol.activMouse=false;                    
                    if(pol.array.length<=2)pol.clear()
                    
                }
                self.par.visi3D.position3d.pause=false;
                self.par.visi3D.intRend=1;
                self.arrPolPoint=[]; 
                self.setActive(); 
            }
            if(self._sah!=0){
                self._sah=0  
                if(activSten)activSten.clear()
                if(point)point.activMouse=true;
                self.par.visi3D.position3d.pause=false;
                self.par.visi3D.intRend=1;
                self.par.planDrag.setZ(0)                
                if(activStenOld!=undefined)self.par.activOne(activStenOld); 
                activStenOld=undefined
            }
        }


        this.downPol = function (e) {                       
            if(e.originalEvent.button!=0 && e.originalEvent.touches==undefined){                   
                self.stopDrag() 
                self.setActive()               
                return 
            }
              

            if(e.target.name=='ManMouse3D'){    
                if(self.arrPolPoint.length==0){ //на план создаюм 
                    p=self.getPosEv3D(e);                    
                    point=self.par.floor.sp.craetPoint()
                    self.korektAP(p)
                    point.position.setPoint(p)   

                    point.activMouse=false;
                    self.par.visi3D.position3d.pause=true;
                    
                    self.par.activOne(point);
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    self.startAP(point);

                    return
                } 

                if(self.arrPolPoint.length==1){
                    pol=self.par.floor.sp.craetPol() 
                     pol.activMouse=false; 
                    pol.activMouse=false;  
                    pol.addPoint(point)
                    point.activMouse=true;
                    p=self.getPosEv3D(e);                    
                    point=self.par.floor.sp.craetPoint()
                    self.korektAP(p)
                    point.position.setPoint(p) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)                                  
                    point=self.par.floor.sp.craetPoint()                
                    point.position.setPoint(p) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    point.activMouse=false;
                    self.startAP(point);               
                    return
                }

                if(self.arrPolPoint.length>=2){       
                    point.activMouse=true;
                    p=self.getPosEv3D(e);                    
                    point=self.par.floor.sp.craetPoint()
                    self.korektAP(p)
                    point.position.setPoint(p) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    point.activMouse=false; 
                    self.startAP(point);              
                    return
                }
            }
            pg=null
            sten1=null

            if(e.target.name=='Sten3D'){
                p=self.getPosEv3DSten(e)
                sten=self.getSten(e.target)
                if(p.z==2){
                    sten1=sten
                }else{
                    if(p.z==0)pg=sten.addPoint
                    if(p.z==1)pg=sten.addPoint1 
                }
                
            }
            


            if(sten1!=null){               

                var posy=e.point.y; 
                                   
                if(e.point.y>sten.height-2)posy=sten.height-2
                self.par.planDrag.setZ(posy)    
                
                
                if(self.arrPolPoint.length==0){ //В стену встовляем                  
                    point=self.par.floor.sp.craetPoint()
                    point.position.setPoint(p)
                    sten.dividedSten(point,true);
                    self.arrPolPoint.push(point);
                    point.activMouse=false;
                    self.par.visi3D.position3d.pause=true;
                    self.par.activOne(point);
                    self.startAP(point);                                           
                    return 
                }

                if(self.arrPolPoint.length==1){ //В стену встовляем  
                    pol=self.par.floor.sp.craetPol() 
                    pol.activMouse=false; 
                    pol.addPoint(point)
                    point.activMouse=true;
                    point1=self.par.floor.sp.craetPoint()
                    point1.position.setPoint(p)
                    sten.dividedSten(point1,true)
                    pol.addPoint(point1)
                    self.arrPolPoint.push(point1)


                    point=self.par.floor.sp.craetPoint()
                    point.position.setPoint(p) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)

                    point.activMouse=false;
                    
                    self.par.activOne(point);
                    self.startAP(point);                                           
                    return                    
                }



                if(self.arrPolPoint.length>=2){ //В стену встовляем
                    pol.removePoint(point);

                    point1=self.par.floor.sp.craetPoint()
                    point1.position.setPoint(p)
                    sten.dividedSten(point1,true)
                    pol.addPoint(point1)
                    self.arrPolPoint.push(point1)

                    self.arrPolPoint.push(e.target.objGlob)
                    



                    point=self.par.floor.sp.craetPoint()                
                    point.position.setPoint(p) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    point.activMouse=false;
                    self.startAP(point); 

                    return 
                }
            }

            if(e.target.name=='PointSten'){
                pg=e.target.objGlob
            }

            if(pg!=null){
                p=self.getPosEv3DSten(e)
                
                if(self.arrPolPoint.length==0){ //на план создаюм 

                    point=pg;
                    point.activMouse=false;
                    self.par.visi3D.position3d.pause=true;
                    
                    self.par.activOne(point);
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    self.startAP(point);

                    return
                } 

                if(self.arrPolPoint.length==1){
                    pol=self.par.floor.sp.craetPol()
                     pol.activMouse=false;    
                    pol.addPoint(point)
                    point.activMouse=true;

                                      
                    point=pg;
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)

                    point=self.par.floor.sp.craetPoint()                
                    point.position.setPoint(pg.position) 
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    point.activMouse=false;
                    self.startAP(point);               
                    return
                }

                if(self.arrPolPoint.length>=2){ 
                    pol.removePoint(point);
                    
                    pol.addPoint(pg)                    
                    self.arrPolPoint.push(pg)


                    point=self.par.floor.sp.craetPoint()                
                    point.position.setPoint(pg.position)  
                    pol.addPoint(point)
                    self.arrPolPoint.push(point)
                    self.par.activOne(point);
                    point.activMouse=false;
                    self.startAP(point); 
                   
                    
                    return
                }
            }
        }












        //------------------------Стены------------------------------ 
        //----------------------------------------------------------- 
        //----------------------------------------------------------- 




        this.moveSten = function (e) {       
            if(self._sah==1){//тоскаем одну точку
                trace(e.target.name)
                if(e.target.name=='ManMouse3D'){                   
                    p=self.getPosEv3D(e)
                    self.korektAP(p)
                    //trace(p)
                    
                    point.position.setPoint(p)
                    point.dragVokrug();
                    point.drag();

                    self.par.visi3D.intRend=1;
                }

                if(e.target.name=='PointSten'){                   
                    point.position.setPoint(e.target.objGlob.position)
                    point.dragVokrug();
                    point.drag();
                    self.par.visi3D.intRend=1;
                }

                if(e.target.name=='Sten3D'){ 
                    sten=self.getSten(e.target)
                    if(sten==null)return
                    p=self.getPosEv3DSten(e)

                    point.position.setPoint(p)
                    point.dragVokrug();
                    point.drag();
                    self.par.visi3D.intRend=1;
                }
            } 
        }






        this.downSten = function (e) {     
            if(e.originalEvent.button!=0 && e.originalEvent.touches==undefined){               
                self.stopDrag(); 
                return 
            }

            if(e.target.name=='Sten3D'){
                sten=self.getSten(e.target)
                if(sten==null)return

                var posy=e.point.y; 
                                   
                if(e.point.y>sten.height-2)posy=sten.height-2
                self.par.planDrag.setZ(posy)    

                if(self._sah==0){ //В стену встовляем
                    p=self.getPosEv3DSten(e)                    
                    if(p.z==2){                    
                        point1=self.par.floor.sp.craetPoint()
                        point1.position.setPoint(p)
                        sten.dividedSten(point1,true)

                        point=self.par.floor.sp.craetPoint()
                        point.position.setPoint(p)                        

                        activSten=self.par.floor.sp.craetSplice1();
                        point.addSplice(activSten, true);
                        point1.addSplice(activSten, false);                        
                        activSten.activMouse=false;
                        point.activMouse=false;
                        self.par.visi3D.position3d.pause=true;
                        self._sah=1; 

                        self.par.activOne(point); 
                        self.startAP(point);                     
                        return 
                    }
                    
                    if(p.z==1||p.z==0){ //в точки на стене
                        if(p.z==0)point1=sten.addPoint
                        if(p.z==1)point1=sten.addPoint1                        

                        point=self.par.floor.sp.craetPoint()
                        point.position.setPoint(p)    

                           
                        activSten=self.par.floor.sp.craetSplice1();

                        point.addSplice(activSten, true);
                        point1.addSplice(activSten, false);
                        
                        activSten.activMouse=false;

                        point.activMouse=false;
                        self.par.visi3D.position3d.pause=true;
                        self._sah=1; 

                        self.par.activOne(point);
                        self.startAP(point);               
                        return;                       
                    } 
                }


                if(self._sah==1){ //
                    activStenOld=activSten
                    p=self.getPosEv3DSten(e)                    
                    if(p.z==2){ //в стену
                        point.removeSplice(activSten, true);
                        point1=self.par.floor.sp.craetPoint();
                        point1.position.set(p.x,p.y,0)
                        sten.dividedSten(point1,true)
                        point1.addSplice(activSten, true);
                        activSten.activMouse=true;

                        activSten=self.par.floor.sp.craetSplice1();
                        activSten.activMouse=false;
                        point1.addSplice(activSten, false); 
                        point.addSplice(activSten, true);
                        activSten.activMouse=false;
                        point.activMouse=false;
                        point1.dragVokrug();
                        point1.drag(); 

                        self.par.activOne(point); 
                        self.startAP(point);                                    
                        return;
                    }
                    
                    if(p.z==1||p.z==0){ //в точки
                        point.removeSplice(activSten, true);
                        if(p.z==0)point1=sten.addPoint
                        if(p.z==1)point1=sten.addPoint1  
                        point1.addSplice(activSten, true);    
                       
                        
                        activSten.activMouse=true;
                        activSten=self.par.floor.sp.craetSplice1();
                        activSten.activMouse=false;
                        point1.addSplice(activSten, false); 
                        point.addSplice(activSten, true);
                        activSten.activMouse=false;
                        point1.dragVokrug();
                        point1.drag(); 

                        self.par.activOne(point);  
                        self.startAP(point);                                    
                        return;                       
                    }

                    
                   
                }
                
                
            }     

            if(e.target.name=='ManMouse3D'){
                if(self._sah==0){ //на план создаюм 
                    p=self.getPosEv3D(e);                    
                    point1=self.par.floor.sp.craetPoint()
                    point1.position.setPoint(p)
                    point=self.par.floor.sp.craetPoint()
                    point.position.setPoint(p) 
                    activSten=self.par.floor.sp.craetSplice1();
                    point.addSplice(activSten, true);
                    point1.addSplice(activSten, false);                    
                    activSten.activMouse=false;

                    point.activMouse=false;
                    self.par.visi3D.position3d.pause=true;
                    self._sah=1; 

                    self.par.activOne(point);
                    self.startAP(point);

                    return                
                } 

                if(self._sah==1){ //на план создаюм 
                    activStenOld=activSten
                    activSten.activMouse=true;
                    p=self.getPosEv3D(e); 
                    activSten=self.par.floor.sp.craetSplice1();
                    point.addSplice(activSten, false);
                    point.activMouse=true;
                    point=self.par.floor.sp.craetPoint()
                    point.position.set(p.x,p.y)                    
                    point.addSplice(activSten, true);
                    point.activMouse=false;
                    point.dragVokrug();
                    point.drag();
                    activSten.activMouse=false;
                    self.par.visi3D.intRend=1;
                    self.par.activOne(point);
                    self.startAP(point);
                    return              
                }
            }


            if(e.target.name=='PointSten'){

                if(self._sah==0){ //в точку                   
                    activSten=self.par.floor.sp.craetSplice1();
                    activSten.activMouse=false;
                    point=e.target.objGlob;
                    point.addSplice(activSten, false);
                    point.activMouse=true;
                    var v=new THREE.Vector3(point.position.x,point.position.y,point.position.z)
                    point=self.par.floor.sp.craetPoint()
                    
                    point.position.set(v.x, v.y, v.z)                    
                    point.addSplice(activSten, true);
                    point.activMouse=false;
                    point.dragVokrug();
                    point.drag();
                    self.par.visi3D.intRend=1;
                    self._sah=1;
                    self.par.visi3D.position3d.pause=true;
                    
                    var posy=e.point.y                    
                    if(e.point.y>e.target.objGlob.height-2)posy=e.target.objGlob.height-2
                    self.par.planDrag.setZ(posy)

                    self.par.activOne(point);
                    self.startAP(point);
                    return 
                }

                if(self._sah==1){ //в точку 
                    activStenOld=activSten
                    point.removeSplice(activSten, true);
                    e.target.objGlob.addSplice(activSten, true);
                    activSten.activMouse=true;
                    activSten=self.par.floor.sp.craetSplice1();
                    activSten.activMouse=false;
                    e.target.objGlob.addSplice(activSten, false);
                    point.addSplice(activSten, true);
                    e.target.objGlob.dragVokrug();
                    e.target.objGlob.drag();
                    self.par.visi3D.intRend=1;
                    var posy=e.point.y                    
                    if(e.point.y>e.target.objGlob.height-2)posy=e.target.objGlob.height-2
                    self.par.planDrag.setZ(posy)
                    self.par.activOne(point);
                    self.startAP(point);
                }
            }
        }

        //-----------------------------------------------------------       
    }

    set tipDrav(value) {        
        if(this._tipDrav!=value){
            this._tipDrav= value
        }
        this.stopDrag(); 
    }    
    get tipDrav() { return  this._tipDrav;} 
}
*/