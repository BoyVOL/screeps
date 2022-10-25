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

    Update(){
        super.Update();
        console.log("BRUH");
        this.AddRecord(createUUID(),{type:'mov'});
    }
}

class Action extends ObjectOverride{
    constructor(orig,actor){
        super(orig);
        this.actor = actor;
    }

    Update(){
        super.Update();
        console.log("base");
    }
}

class MovAction extends Action{
    constructor(orig,actor){
        super(orig,actor);
    }

    Update(){
        super.Update();
        console.log("mov");
    }
}

module.exports = {
    ActionTable,
    Action,
    MovAction,
}