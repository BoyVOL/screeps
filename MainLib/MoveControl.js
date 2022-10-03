const { WithParent } = require('./ClassOverride');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path;
    }

    DrawPath(){
        this.parent.Room.orig.visual.poly(this.path,{stroke: '#fff', strokeWidth: .15,
        opacity: .2, lineStyle: 'dashed'});
    }

    Update(){
        super.Update();
        this.DrawPath();
    }
}

module.exports = {
    Movement,
}