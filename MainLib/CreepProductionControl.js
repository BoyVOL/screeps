const { Updatable } = require('./ClassOverride');

class Buildorder extends Updatable{
    
    constructor(){
        super();
        this.NextBody = [WORK, CARRY, MOVE];
        this.NextName = 'Worker';
    }

    Update(){
        super.Update();
        this.NextName = Game.time;
    }
}

module.exports = {
   Buildorder,
}