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

    Move(){
        this.parent.orig.moveByPath(this.path.value);
        //console.log(this.parent.orig.pos," ",this.path.value[0].x," ",this.path.value[0].y);
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