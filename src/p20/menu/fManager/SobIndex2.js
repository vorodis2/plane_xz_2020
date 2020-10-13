
import { SobIndex } from './SobIndex.js';


export class SobIndex2  extends SobIndex {
    constructor(par,fun) {
        super(par,fun);            
        this.type="SobIndex2";
        var self=this;
        this.par=par;
        this.fun=fun;

        var pos={x:0,y:0,o:null}
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null}
        var speee={x:0,y:0,x1:0,y1:0,s:0,o:null}
        var line
        this.mousemove=function(e){   

            pos.x=sp.x+(e.clientX-sp.x1)/sp.s;
            pos.y=sp.y+(e.clientY-sp.y1)/sp.s;
            self.korektAP(pos)
            line.position1.set(pos.x,pos.y);            
        } 


        this.mouseup=function(e){
            document.removeEventListener("mouseup", self.mouseup);
            document.removeEventListener("mousemove", self.mousemove); 
        }


        this.sobSP=function(s,p,e){ 
            if( e.data.originalEvent.button!=0){ 
                self.downFont(e); 
                return;
            }                  

            speee.x=(e.data.global.x-self.cont.x)/self.cont.scale.x;
            speee.y=(e.data.global.y-self.cont.y)/self.cont.scale.x;

            line=self.p20.sp.lineWord.craetLine();
            
            self.korektAP(speee)

            line.position.set(speee.x,speee.y);
            line.position1.set(speee.x,speee.y);

            sp.x=line.position.x;
            sp.y=line.position.y;

            sp.x1 = e.data.originalEvent.clientX;
            sp.y1 = e.data.originalEvent.clientY; 

            sp.s = self.cont.scale.x;
            sp.o = line;  
            self.par.par.mObject.setObject(line)

            document.addEventListener("mouseup", self.mouseup);
            document.addEventListener("mousemove", self.mousemove);            
        }


        var pos={x:0,y:0,o:null}
        var r
        this.korektAP=function(_p,_o){
            _p.x=Math.round(_p.x/10)*10;
            _p.y=Math.round(_p.y/10)*10;
            _p.o=null;

            var d1=99999
            var x=0;
            var y=0;
            var d=0
            for (var i = 0; i < this.oP.points.length; i++) {
                d=calc.getDistance(this.oP.points[i], _p);
               // trace(i+"  "+d)
                if(d<200){
                    if(d<d1){
                        d1=d;
                        x=this.oP.points[i].x;
                        y=this.oP.points[i].y;
                    }
                }
            }
            var po;
            function ddd(p,p1,p2){
                po=calc.isPointInLin(p,p1,p2,11111,0);
                d=calc.getDistance(p2,po);
                if(d<100){
                    if(d<d1){
                        d1=d;
                        x=po.x;
                        y=po.y;
                        _p.x= x;
                        _p.y= y;
                        return
                    }
                }
            }

            for (var i = 0; i < this.oP.line.length; i++) {
                ddd(this.oP.line[i].p,this.oP.line[i].p1,_p)                       
            } 

            for (var i = 0; i < this.oP.line1.length; i++) {
                ddd(this.oP.line1[i].p,this.oP.line1[i].p1,_p)                       
            } 
            if(d1!=99999){
               _p.x= x;
               _p.y= y;
            }
        }




        this.oP=undefined
        this.debug=undefined
        this.funActive=function(){
            if(this.active==true){
                this.oP=self.p20.sp.lineWord.getPositionS();
                this.debug=self.p20.sp.lineWord.debugPixi


                
         
               
                this.debug.clearD();
                for (var i = 0; i < this.oP.points.length; i++) {
                    this.debug.dPoint(this.oP.points[i],200)
                }

                for (var i = 0; i < this.oP.line.length; i++) {
                    this.debug.dLine(
                        this.oP.line[i].p,
                        this.oP.line[i].p1,
                        0x00FF00,
                        10
                    )
                }

                for (var i = 0; i < this.oP.line1.length; i++) {
                    this.debug.dLine(
                        this.oP.line1[i].p,
                        this.oP.line1[i].p1,
                        0x0000FF,
                        10
                    )
                   
                }
            }
        }
    }
}