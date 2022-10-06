const { WithParent,HtableOverride } = require('./ClassOverride');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent.key,this);
    }

    Update(){
        super.Update();
        console.log("key = ",this.parent.key);
    }
}

class TaskServer extends HtableOverride{

    constructor(){
        super({});
    }

    Update(){
        super.Update();
            
        var pass = this;
        var funct = function(obj,key){
            obj.Update();
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}