const { HtableOverride,plainTable,WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');
const {createUUID} = require('./UUID');

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

    DeleteTask(task){
        this.DeleteRecord(task.id);
    }

    GetTask(id){
        return new Task(this.orig[id]);
    }
}

class Task{
    constructor(data){
        if(typeof(data.id) != 'undefined'){  
            this.id = data.id;
        } else {
            this.id = createUUID();
        }
        this.type = data.type;
        this.parentid = data.parentid;
        this.dest = data.dest;
    }

    get parent(){
        return plainTable.objects[this.parentid];
    }

    get data(){
        return {
            id: this.id,
            type : this.type,
            parentid: this.parentid,
            dest: this.dest
        }
    }
}

class TaskHost extends WithParent{

}

class MovTaskHost extends TaskHost{
    Update(){
        super.Update();
        var task = new Task({type: 'mov', dest: this.parent.GetRandomPos()})
        console.log(task.id);
        taskTable.UploadTask(task);
    }
}

class TaskExecuter extends WithParent{

}

const taskTable = new TaskTable();

module.exports = {
    Task,
    MovTaskHost,
    taskTable
}