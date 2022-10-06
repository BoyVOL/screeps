const { WithParent,HtableOverride } = require('./ClassOverride');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent,this.parent.key);
    }

    Update(){
        super.Update();
    }
}

class TaskServer extends HtableOverride{

    constructor(){
        super({});
    }

    Update(){
        super.Update();
                
        var funct = function(obj,key){
            console.log(key);
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}