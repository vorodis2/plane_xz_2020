
//import { TriangulateShape } from './TriangulateShape.js';

import { SpDebugPixi } from './SpDebugPixi.js';



import {  SPLine } from './SPLine.js';







export class SPLineWord  {
  	constructor(par,fun) {  		
  		this.type="SPLine";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this.array=[]
        this.content2d = new PIXI.Container();
        this.par.cont2dLine.addChild(this.content2d);

        this.debugPixi = new SpDebugPixi();
        this.content2d.addChild(this.debugPixi.content2d);

        this.craetLine=function() {
        	for (var i = 0; i < this.array.length; i++) {
        		if(this.array[i].life==false){
                    this.array[i].life=true;
                    return this.array[i]
        		}
        	}

        	this.array.push(new SPLine(this));
            this.array[this.array.length-1].idArr=this.array.length-1;
            return this.array[this.array.length-1];
        }


        var pNull={x:0,y:0}

        this.getPositionS=function() {
            let o={}
            o.points=[];
            for (var i = 0; i < this.par.arrPoint.length; i++) {
                if (!this.par.arrPoint[i].life) continue;
                o.points.push({x:this.par.arrPoint[i].position.x,y:this.par.arrPoint[i].position.y})                
            }
            let a,d,a1,d1
            o.line=[];
            o.line1=[];
            for (var i = 0; i < this.par.arrSplice.length; i++) {
                if (!this.par.arrSplice[i].life) continue;
                o.line.push({
                    p:{
                        x:this.par.arrSplice[i].position.x,
                        y:this.par.arrSplice[i].position.y
                    },
                    p1:{
                        x:this.par.arrSplice[i].position1.x,
                        y:this.par.arrSplice[i].position1.y
                    }
                })

                a=calc.getAngle(this.par.arrSplice[i].position, this.par.arrSplice[i].position1);
                //d=calc.getDistance(this.par.arrSplice[i].position, this.par.arrSplice[i].position1);

                let o1={
                    x:this.par.arrSplice[i].arrPosit[0].x,
                    y:this.par.arrSplice[i].arrPosit[0].y
                }
                a1=calc.getAngle(pNull, o1);
                d1=calc.getDistance(pNull, o1);

                calc.getVector(d1,a-a1,o1)
                o1.x+=this.par.arrSplice[i].position.x;
                o1.y+=this.par.arrSplice[i].position.y;



                let o11={
                    x:this.par.arrSplice[i].arrPosit1[0].x,
                    y:this.par.arrSplice[i].arrPosit1[0].y
                }

                a1=calc.getAngle(pNull, o11);
                d1=calc.getDistance(pNull, o11);

                calc.getVector(d1,a1+a,o11)    
                o11.x+=this.par.arrSplice[i].position1.x;
                o11.y+=this.par.arrSplice[i].position1.y;

                o.line1.push({
                    p:o1,
                    p1:o11
                })




                o1={
                    x:this.par.arrSplice[i].arrPosit[5].x,
                    y:this.par.arrSplice[i].arrPosit[5].y
                }
                a1=calc.getAngle(pNull, o1);
                d1=calc.getDistance(pNull, o1);

                calc.getVector(d1,a-a1,o1)
                o1.x+=this.par.arrSplice[i].position.x;
                o1.y+=this.par.arrSplice[i].position.y;



                o11={
                    x:this.par.arrSplice[i].arrPosit1[5].x,
                    y:this.par.arrSplice[i].arrPosit1[5].y
                }

                a1=calc.getAngle(pNull, o11);
                d1=calc.getDistance(pNull, o11);

                calc.getVector(d1,a1+a,o11)    
                o11.x+=this.par.arrSplice[i].position1.x;
                o11.y+=this.par.arrSplice[i].position1.y;

                o.line1.push({
                    p:o1,
                    p1:o11
                })


               /* o1={
                    x:this.par.arrSplice[i].arrPosit[5].x,
                    y:this.par.arrSplice[i].arrPosit[5].y
                }
                a1=calc.getAngle(pNull, o1);
                d1=calc.getDistance(pNull, o1);

                calc.getVector(d1,a1-a,o1)
                o1.x+=this.par.arrSplice[i].position1.x;
                o1.y+=this.par.arrSplice[i].position1.y;

                o.line1[o.line1.length-1].p1=o1;*/
            }

            return o
        }



        this.setObj=function(o){
            trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",o.array)
            for (var i = 0; i < o.array.length; i++) {
                let line=this.craetLine();
                line.setObj(o.array[i])
            }
        }
        this.getObj=function(){
            var o={}
            o.array=[];
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].life==false) continue;
                o.array.push(this.array[i].getObj())
            }
            trace("<<<<<<<<<<<<<<<<<<<",o.array)
            return  o
        }

    }
}