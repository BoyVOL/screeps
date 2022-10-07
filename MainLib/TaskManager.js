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
        console.log("Update");
        super.Update();
            
        var pass = this;
        var funct = function(obj,key){
            obj.Update();
            console.log("count = ",pass.count);
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}