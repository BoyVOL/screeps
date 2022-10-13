const { ObjProxyTable } = require('./ClassOverride');
const { Buildorder } = require('./CreepProductionControl');
const { StructureOverride } = require('./StructureOverride');

class SpawnOverride extends StructureOverride{

    constructor(orig){
        super(orig);
        this.buildorder = new Buildorder(this);
    }

    SpawnCreep(){
        console.log("bla");
        this.orig.spawnCreep(this.buildorder.NextBody,this.buildorder.NextName);
    }

    Update(){
        super.Update();
        this.buildorder.Update();
        this.SpawnCreep();
    }
}

class SpawnTable extends ObjProxyTable{

    constructor(){
        super(Game.spawns);
    }
    
    LoadOrig(){
        this.orig = Game.spawns;
    }

    InitSingleObject(orig){
        return new SpawnOverride(orig);
    }
}

const spawnTable = new SpawnTable();

module.exports = {
    spawnTable,
    SpawnOverride,
    SpawnTable
}