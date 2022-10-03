const { ObjTable } = require('./ClassOverride');
const { Buildorder } = require('./CreepProductionControl');
const { StructureOverride } = require('./StructureOverride');

class SpawnOverride extends StructureOverride{

    constructor(orig){
        super(orig);
        this.buildorder = new Buildorder(this);
    }

    SpawnCreep(){
        console.log(this.orig.spawnCreep(this.buildorder.NextBody, this.buildorder.NextName));
    }

    Update(){
        super.Update();
        this.buildorder.Update();
        this.SpawnCreep();
    }
}

class SpawnTable extends ObjTable{

    constructor(){
        super(Game.spawns);
    }
    
    LoadFromMem(){
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