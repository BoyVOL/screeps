const { ObjProxyTable,plainTable,ObjectOverride,WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');
const {createUUID} = require('./UUID');

class TaskTable extends ObjProxyTable{
    constructor(){
        super(new MemoryItem('taskTable',{}).value);
    }

    LoadOrig(){
        this.orig = new MemoryItem('taskTable',{}).value;
    }

    InitSingleObject(orig){
        switch (orig.type) {
            case 'mov':
                    return new MovTask(orig);
                break;
        
            default:
                    return new Task(orig)
                break;
        }
    }
}

class Task extends ObjectOverride{
    constructor(orig){
        super(orig);
    }

    LoadOrig(){
        this.orig = taskTable.orig[this.tableid];
    }

    DeleteItself(){
        taskTable.DeleteObject(this.tableid);
    }

    get parent(){
        return plainTable.objects[this.orig.parentid];
    }

    get hasParent(){
        return typeof(this.parent) != 'undefined';
    }

    get executer(){
        return plainTable.objects[this.orig.executerid];
    }

    set executer(exec){
        this.orig.executerid = exec.tableid;
    }

    get hasExecuter(){
        return typeof(this.executer) != 'undefined';
    }

    get dest(){
        var result = new RoomPosition(this.orig.dest.x, this.orig.dest.y, this.orig.dest.roomName);
        return result;
    }

    get viable(){
        return this.hasParent;
    }

    get completed(){
        return false;
    }

    get destDistance(){
        return this.executer.orig.pos.getRangeTo(this.dest);
    }

    Unload(){
        super.Unload();
        taskTable.DeleteRecord(this.tableid);
    }

    Update(){
        super.Update();
        if(!this.viable || this.completed){
            this.DeleteItself();
        }
    }
}

class MovTask extends Task{

    get viable(){
        return true;
    }

    get completed(){
        var result = false;
        console.log('this.hasExecuter = ',this.hasExecuter,this.executer);
        if(this.hasExecuter){
            console.log('distance = ',this.destDistance);
            result = this.destDistance;
        }
        return super.completed;
    }

    Update(){
        super.Update();
        console.log("movtask!");
    }
}

class TaskHandler extends WithParent{
    PostTask(data){
        data.parentid = this.parent.key;
        taskTable.AddRecord(createUUID(),data);
    }

    GetTask(id){
        return taskTable.objArray[id];
    }

    TaskExists(id){
        return taskTable.ObjExists(id);
    }
}

class MovTaskHost extends TaskHandler{
    Update(){
        super.Update();
        var task = {type: 'mov', dest: this.parent.GetRandomPos()};
        this.PostTask(task);
    }
}

class TaskExecuter extends TaskHandler{
    constructor(parent){
        super(parent);
        this.activeTask = null;
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
    }

    GetAvailableTasks(){
        var taskArray = taskTable.ObjAsArray();
        return taskArray;
    }

    get hasavailable(){
        return this.GetAvailableTasks().length > 0;
    }

    PickRandomTaskID(){
        var tasks = this.GetAvailableTasks();
        var id = Math.floor(Math.random()*tasks.length);
        return tasks[id][0];
    }

    LoadActiveTask(){
        this.activeTask = this.GetTask(this.activeTaskId.value);
    }

    Update(){
        super.Update();
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
        if(!this.TaskExists(this.activeTaskId.value) && this.hasavailable){
            this.activeTaskId.value = this.PickRandomTaskID();
        }
        this.LoadActiveTask();
        if(!this.activeTask.hasExecuter) this.activeTask.executer = this.parent;
        console.log(this.activeTask,this.activeTaskId.value);
    }
}

const taskTable = new TaskTable();

module.exports = {
    Task,
    TaskExecuter,
    MovTaskHost,
    taskTable
}