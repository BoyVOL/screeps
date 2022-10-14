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
        console.log(this.orig[id],id);
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
        if(typeof(data.parentid) != 'undefined'){  
            this.parentid = data.parentid;
        } else {
            this.parentid = null;
        }
        this.dest = data.dest;
        if(typeof(data.executerid) != 'undefined'){  
            this.executerid = data.executerid;
        } else {
            this.executerid = null;
        }
    }

    get parent(){
        return plainTable.objects[this.parentid];
    }

    get executer(){
        return plainTable.objects[this.executerid];
    }

    get data(){
        return {
            id: this.id,
            type : this.type,
            parentid: this.parentid,
            dest: this.dest,
            executerid: this.executerid
        }
    }
}

class TaskHost extends WithParent{

}

class MovTaskHost extends TaskHost{
    Update(){
        super.Update();
        var task = new Task({type: 'mov', dest: this.parent.GetRandomPos()});
        taskTable.UploadTask(task);
    }
}

class TaskExecuter extends WithParent{
    constructor(parent){
        super(parent);
        this.activeTask = null;
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
    }

    GetAvailableTasks(){
        var taskArray = taskTable.AsArray();
        return taskArray;
    }

    PickRandomTask(){
        var tasks = this.GetAvailableTasks();
        var id = Math.floor(Math.random()*tasks.length);
        this.activeTaskId.value = tasks[id][0];
    }

    UploadTask(){
        if(this.hasTask) this.activeTask = taskTable.GetTask(this.activeTaskId.value);
    }

    OccupyTask(taskId){
        taskTable[taskId].executerid = this.key;
    }

    get hasTask(){
        return this.activeTaskId.value != null;
    }

    Update(){
        super.Update();
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
        this.PickRandomTask();
        this.UploadTask();
    }
}

const taskTable = new TaskTable();

module.exports = {
    Task,
    TaskExecuter,
    MovTaskHost,
    taskTable
}