const { MemoryItem } = require('./MemoryManagement');
const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');
const {createUUID} = require('./UUID');
const {Movement} = require('./MoveControl');

class ActionTable extends ObjProxyTable{

    constructor(actor){
        super(new MemoryItem('taskTable',{},actor.orig.memory).value);
        this.actor = actor;
    }
    
    LoadOrig(){
        this.orig = new MemoryItem('taskTable',{},this.actor.orig.memory).value;
    }

    InitSingleObject(orig){
        switch (orig.type) {
            case 'mov':
                    return new MovAction(orig,this.actor);
                break;
        
            default:
                    return new Action(orig,this.actor);
                break;
        }
    }

    CreateAction(data){
        var id = createUUID();
        data.id = id;
        this.AddRecord(id,data);
    }

    Update(){
        super.Update();
        this.CreateAction(MovAction.dataPos(this.actor.Room.getRandomPos()));
    }
}

class Action extends ObjectOverride{
    constructor(orig,actor){
        super(orig);
        this.gettable = false;
        this.actor = actor;
    }

    static get data(){
        return {
            type: 'base',
        }
    }

    get completed(){
        return true;
    }

    Update(){
        super.Update();
        if(this.completed) this.table.DeleteRecord(this.tableid);
    }
}

class MovAction extends Action{
    constructor(orig,actor){
        super(orig,actor);
        this.movement = new Movement(this);
    }

    static get data(){
        var result = super.data;
        result.type = 'mov';
        return result;
    }

    static dataPos(target,range = 0){
        var result = this.data;
        result.target = target;
        result.range = range;
        return result;
    }

    Update(){
        console.log("range = ",this.movement.targetRange);
        super.Update();
    }
}

module.exports = {
    ActionTable,
    Action,
    MovAction,
}