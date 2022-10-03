const { WithParent } = require('./ClassOverride');

class Movement extends WithParent{
    
    constructor(parent){
        super(parent);
        this.path;
    }

    Update(){
        super.Update();
    }
}

module.exports = {
    Movement,
}