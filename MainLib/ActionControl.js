const { MemoryItem } = require('./MemoryManagement');
const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');
const {createUUID} = require('./UUID');

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
        data.id = createUUID();
        this.AddRecord(data.id,data);
    }

    Update(){
        super.Update();
        this.CreateAction(MovAction.data(this.actor.orig.pos));
    }
}

class Action extends ObjectOverride{
    constructor(orig,actor){
        super(orig);
        this.actor = actor;
    }

    static get data(){
        return {
            type: 'base',
        }
    }

    Update(){
        super.Update();
    }
}

class MovAction extends Action{
    constructor(orig,actor){
        super(orig,actor);
    }

    static get data(){
        var result = super.data;
        result.type = 'mov';
        return result;
    }

    static data(target){
        var result = this.data;
        result.target = target;
        return result;
    }

    Update(){
        super.Update();
        console.log(this.orig.target);
    }
}

module.exports = {
    ActionTable,
    Action,
    MovAction,
}