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

    get IsOnPath(){
        console.log(this.parent.orig.pos.x, " ",this.parent.orig.pos.y);
        console.log(his.path.value[0].x, " ",this.path.value[0].y);
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

    GetNewPath(pos){
        this.path.value = this.parent.FindPath(this.target);
    }

    CheckArrival(){
        if(this.PathIsComplete) {
            console.log("arrived");
            this.GetNewPath();
        }
    }

    CheckStayingOnPath(){
        if(!this.IsOnPath){
            console.log("not on path");
            this.GetNewPath();
        }
    }

    CheckValidPath(){
        if(!this.MovIsGood){
            console.log("not valid");
            this.GetNewPath();
        }
    }

    Update(){
        super.Update();
        this.CheckArrival();
        this.CheckStayingOnPath();
        this.Move();
        this.CheckValidPath();
        this.DrawPath();
    }
}

module.exports = {
    Movement,
}