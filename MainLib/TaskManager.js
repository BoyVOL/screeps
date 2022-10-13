const { HtableOverride,plainTable,WithParent,Updatable } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');
const {createUUID} = require('./UUID');

class TaskTable extends Updatable{
    constructor(){
        super();
        this.LoadData();
    }

    LoadData(){
        this.mem = new MemoryItem('taskTable',{});
    }

    UploadTask(task){
        this.mem.value[task.id] = task.data;
    }

    DeleteTask(task){
        delete this.mem.value[task.id];
    }

    GetTask(id){
        return new Task(this.mem.valueg[id]);
    }

    Update(){
        super.Update();
        this.LoadData();
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