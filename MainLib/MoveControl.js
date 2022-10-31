const { WithParent} = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class Movement extends WithParent{
    
    constructor(task){
        super(task.actor);
        this.task = task;
        this.path = new MemoryItem("path",new Array(),this.task.orig);
        this.lastresult = 0;
    }

    DrawPath(){
        this.task.actor.Room.orig.visual.poly(this.path.value,{stroke: '#fff', strokeWidth: .15,
        opacity: .2, lineStyle: 'dashed'});
    }

    DrawTarget(){
        if(this.target != null){
        this.task.actor.Room.orig.visual.circle(this.target,
            {fill: 'transtaskactor', radius: 0.55, stroke: 'red'});
        }
    }

    get PathIsDefined(){
        return typeof(this.path.value[0])!= "undefined";
    }

    GetStepPos(id){
        return new RoomPosition(this.path.value[id].x,
            this.path.value[id].y,
            this.path.value[id].roomName);
    }

    get pos(){
        return this.task.actor.orig.pos;
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
            return this.pos.x+this.path.value[0].dx == this.path.value[0].x && 
        this.pos.y+this.path.value[0].dy == this.path.value[0].y;
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

    get targetRange(){
        return this.task.orig.range;
    }

    get distance(){
        return this.target.getRangeTo(this.task.actor.orig.pos);
    }

    get InRange(){

    }

    get target(){ 
        RoomPosition(this.task.orig.target.x,
            this.task.orig.target.y,
            this.task.orig.target.roomName);
    }

    Move(){
        this.lastresult = this.task.actor.orig.moveByPath(this.path.value);
        if(!this.Tired) this.path.value.shift();
    }

    GetNewPath(){
        if(this.target!=null){
            this.path.value = this.pos.findPathTo(this.target,{range: this.distance});
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
        this.path = new MemoryItem("path",new Array(),this.this.task.orig);
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