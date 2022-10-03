const { WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path = new MemoryItem("path",null,this.parent.orig.memory);
        this.lastresult = 0;
    }

    DrawPath(){
        this.parent.Room.orig.visual.poly(this.path.value,{stroke: '#fff', strokeWidth: .15,
        opacity: .2, lineStyle: 'dashed'});
    }

    get IsOnPath(){
        return this.parent.orig.pos.x+this.path.value[0].dx == this.path.value[0].x && 
        this.parent.orig.pos.y+this.path.value[0].dy == this.path.value[0].y;
    }

    get PathIsComplete(){
        return this.path.value.length != 0;
    }

    Move(){
        console.log("Move result = ",this.parent.orig.moveByPath(this.path.value));
        console.log(this.IsOnPath);
    }

    Update(){
        super.Update();
        this.Move();
        this.DrawPath();
    }
}

module.exports = {
    Movement,
}