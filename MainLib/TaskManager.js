const { WithParent,HtableOverride } = require('./ClassOverride');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent.key,this);
        console.log("key = ",this.parent.key);
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