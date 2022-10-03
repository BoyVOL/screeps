const { WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path = new MemoryItem("path",null,this.parent.orig.memory);
    }

    DrawPath(){
        this.parent.Room.orig.visual.poly(this.path.value,{stroke: '#fff', strokeWidth: .15,
        opacity: .2, lineStyle: 'dashed'});
    }

    get OnStart(){
        return this.parent.orig.pos.x+this.path.value[0].dx == this.path.value[0].x && 
        this.parent.orig.pos.y+this.path.value[0].dy == this.path.value[0].y;
    }

    Move(){
        console.log(this.OnStart);
        this.parent.orig.moveByPath(this.path.value);
        console.log(this.OnStart);
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