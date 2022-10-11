const { WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path = new MemoryItem("path",new Array(),this.parent.orig.memory);
        this.lastresult = 0;
        this.target = null;
    }

    DrawPath(){
        this.parent.Room.orig.visual.poly(this.path.value,{stroke: '#fff', strokeWidth: .15,
        opacity: .2, lineStyle: 'dashed'});
    }

    DrawTarget(){
        if(this.target != null){
        this.parent.Room.orig.visual.circle(this.target,
            {fill: 'transparent', radius: 0.55, stroke: 'red'});
        }
    }

    get IsOnPath(){
        return this.parent.orig.pos.x+this.path.value[0].dx == this.path.value[0].x && 
        this.parent.orig.pos.y+this.path.value[0].dy == this.path.value[0].y;
    }

    get PathIsComplete(){
        return this.path.value.length <= 0;
    }

    get MovIsGood(){
        return this.lastresult != -5 && this.lastresult != -10;
    }

    get Tired(){
        return this.lastresult == -11;
    }

    Move(){
        this.lastresult = this.parent.orig.moveByPath(this.path.value);
        if(!this.Tired) this.path.value.shift();
    }

    GetNewPath(range = 0){
        if(this.target!=null){
            this.path.value = this.parent.orig.pos.findPathTo(this.target,{range: range});
        }
    }

    CheckArrival(){
        if(this.PathIsComplete) {
            this.GetNewPath();
        }
    }

    CheckStayingOnPath(){
        if(!this.IsOnPath){
            this.GetNewPath();
        }
    }

    CheckValidPath(){
        if(!this.MovIsGood){
            this.GetNewPath();
        }
    }

    Update(){
        super.Update();
        this.path = new MemoryItem("path",new Array(),this.parent.orig.memory);
        console.log(this.IsOnPath,this.MovIsGood,this.PathIsComplete,this.Tired);
        this.CheckArrival();
        this.CheckStayingOnPath();
        this.Move();
        this.CheckValidPath();
        this.DrawPath();
        this.DrawTarget();
    }
}

module.exports = {
    Movement,
}