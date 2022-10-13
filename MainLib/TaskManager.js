const { HtableOverride,plainTable,WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class TaskTable extends HtableOverride{
    constructor(){
        super(new MemoryItem('taskTable',{}).value);
    }

    LoadOrig(){
        this.orig = new MemoryItem('taskTable',{}).value;
    }

    UploadTask(task){
        this.AddRecord(task.id,task.data);
    }
}

class Task{
    constructor(data){
        if(typeof(data.id) != 'undefined'){  
            this.id = data.id;
        } else {
            this.id = Date.now();
        }
        this.type = data.type;
        this.parentid = data.parentid;
    }

    get parent(){
        return plainTable.objects[this.parentid];
    }

    get data(){
        return {
            id: this.id,
            type : this.type,
            parentid: this.parentid
        }
    }
}

class TaskProvider extends WithParent{
    
}

const taskTable = new TaskTable();

module.exports = {
    Task,
    taskTable
}