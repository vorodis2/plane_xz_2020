
import { SobIndex } from './SobIndex.js';


export class SobIndex0  extends SobIndex {
    constructor(par,fun) {
        super(par,fun);            
        this.type="SobIndex0";
  		var self=this;
        this.par=par;
        this.fun=fun;

        var pos={x:0,y:0,o:null}
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}
        this.mousemove=function(e){           
            pos.x=sp.x+(e.clientX-sp.x1)/sp.s
            pos.y=sp.y+(e.clientY-sp.y1)/sp.s            
            self.korektAP(pos,sp.o);
            sp.o.position.x=pos.x;
            sp.o.position.y=pos.y;
            self.p20.sp.addObjFun(sp.o);        
        } 


        this.mouseup=function(e){
            document.removeEventListener("mouseup", self.mouseup);
            document.removeEventListener("mousemove", self.mousemove); 
        }


        this.sobSP=function(s,p,e){          

            if(s=="downSten"){
                self.par.par.mObject.setObject(p)
            }

            if(s=="downPoint"){
                self.par.par.mObject.setObject(p) 
                if( e.data.originalEvent.button==0){ 
                    sp.x=p.position.x;
                    sp.y=p.position.y;
                    sp.x1 = e.data.originalEvent.clientX
                    sp.y1 = e.data.originalEvent.clientY; 
                    sp.s= self.cont.scale.x;
                    sp.o=p
                    document.addEventListener("mouseup", self.mouseup);
                    document.addEventListener("mousemove", self.mousemove); 
                    return;
                }
            }
            self.downFont(e);            
        }
    }
}
       /* this._sah=0




        var point,posit,posit1
        var arrPosit=[]
        var positDin=new THREE.Vector3()
        var positDin1=new THREE.Vector3()
        var positDin2=new THREE.Vector3()

        this.move = function (e) { 

        }

        this.out = function (e) {   
            //trace(e)
        }

        this.over = function (e) {   
            
        }


        var dragBool=true;


        this.drahPoint = function () { 
            
            if(pol) { 
                for (var i = 0; i < pol.array.length; i++) {
                    let v= new THREE.Vector3()
                    v.x=arrPosit[i].x+self.par.tukalka.valueX
                    v.y=arrPosit[i].y+self.par.tukalka.valueY
                    pol.array[i].position.setPoint(v)
                    

                    pol.array[i].dragVokrug();
                    pol.array[i].drag(); 
                }
                self.par.visi3D.intRend=1;
            }

            if(point) {   
                

                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY;
                self.korektAP(positDin)
                point.position.setPoint(positDin)
                point.dragVokrug();
                point.drag();            
                self.par.visi3D.intRend=1;

                
            }

            if(sten) {                
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY; 

                positDin1.x = positDin.x;
                positDin1.y = positDin.y;

                self.korektAP(positDin)   

                positDin2.x = positDin1.x-positDin.x;
                positDin2.y = positDin1.y-positDin.y;          
               
                sten.addPoint.position.setPoint(positDin)
                sten.addPoint.dragVokrug();
                sten.addPoint.drag()   

                positDin.x=posit1.x+self.par.tukalka.valueX-positDin2.x;
                positDin.y=posit1.y+self.par.tukalka.valueY-positDin2.y;

                sten.addPoint1.position.setPoint(positDin)
                sten.addPoint1.dragVokrug();
                sten.addPoint1.drag() 

                self.par.visi3D.intRend=1;
            }


        }
        this.stopPoint = function () {  
            if(point) {                
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY;
                self.korektAP(positDin)

                if(positDin.obj!=undefined){
                    if(positDin.obj.type=="SpPointSten"){
                        positDin.obj.slitie(point)
                    }
                    if(positDin.obj.type=="SpliceSten"){
                        positDin.obj.dividedSten(point,true)
                    }                    
                }                
            }
        }
    

        var sten, pol
        this.down = function (e) {  
            point=null;
            sten=null;
            pol=null;
            if(e.target){  
               


                if(e.target.name=="Pol3D"){ 
                    pol=e.target.gObj;                    
                    self.par.activOne(pol);
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return

                    for (var i = 0; i < pol.array.length; i++) {
                        if(arrPosit[i]==undefined)arrPosit[i] = new THREE.Vector3()
                        trace(pol.array[i].position)
                        arrPosit[i].x= pol.array[i].position.x;
                        arrPosit[i].y= pol.array[i].position.y; 
                    }
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                   
                    dragBool=true
                    
                    return;
                }


                if(e.target.name=="PointSten"){                    
                    point=e.target.objGlob;
                    self.par.activOne(point);
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return

                    posit=new THREE.Vector3(point.position.x,point.position.y)
                    trace(point)
                    trace(e.point.x,"",e.point)
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                    self.startAP(point)
                    dragBool=true                    
                    return;
                }  

                if(e.target.name=="Sten3D"){                     
                    sten=self.getSten(e.target)  
                    self.par.activOne(sten);  
                    self.par.visi3D.intRend=1;                         
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return

                    posit=new THREE.Vector3(sten.position.x,sten.position.y)

                    posit1=new THREE.Vector3(sten.position1.x,sten.position1.y)
                    
                    

                    self.startAP(sten.addPoint,sten.addPoint1) 

                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    

                    
                    dragBool=true
                    return;
                }   

                           
            }
            self.par.activOne(null);
        }

        this.clear=function(){
            this._sah=0
        }
        
    }
}
*/