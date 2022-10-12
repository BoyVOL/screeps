const { WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path = new MemoryItem("path",new Array(),this.parent.orig.memory);
        this.lastresult = 0;
        this.target = null;
        this.distance = 2;
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

    get PathIsDefined(){
        return typeof(this.path.value[0])!= "undefined";
    }

    GetStepPos(id){
        return new RoomPosition(this.path.value[id].x,this.path.value[id].y,this.parent.Room.orig.name);
    }

    get PathRangeToTarget(){
        return this.GetStepPos(this.path.value.length-1).getRangeTo(this.target);
    }

    get PathIsToTarget(){
        if(this.target != null && this.PathIsDefined){
            return this.PathRangeToTarget <= this.distance;
        } else return false;
    }

    get IsOnPath(){
        if(this.PathIsDefined){
            return this.parent.orig.pos.x+this.path.value[0].dx == this.path.value[0].x && 
        this.parent.orig.pos.y+this.path.value[0].dy == this.path.value[0].y;
        } else return false;
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

    GetNewPath(){
        if(this.target!=null){
            this.path.value = this.parent.orig.pos.findPathTo(this.target,{range: this.distance});
        }
    }

    CheckAfterMove(){
        if(!this.MovIsGood){
            this.GetNewPath();
        }
    }

    AdjustPath(){
        if(this.PathIsComplete || !this.IsOnPath || !this.PathIsToTarget) {
            this.GetNewPath();
        }
    }

    Update(){
        super.Update();
        this.path = new MemoryItem("path",new Array(),this.parent.orig.memory);
        this.AdjustPath();
        this.Move();
        this.CheckAfterMove();
        this.DrawPath();
        this.DrawTarget();
    }
}

module.exports = {
    Movement,
}