const { WithParent,HtableOverride } = require('./ClassOverride');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent,this.parent.key);
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
            console.log(key,obj.parent);
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}