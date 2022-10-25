const { MemoryItem } = require('./MemoryManagement');
const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');

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
        this.AddRecord({type:'mov'});
    }
}

class Action extends ObjectOverride{
    constructor(orig,actor){
        super(orig);
        this.actor = actor;
    }
}

class MovAction extends Action{
    constructor(orig,actor){
        super(orig,actor);
    }
}

module.exports = {
    ActionTable,
    Action,
    MovAction,
}