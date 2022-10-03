const { ObjTable } = require('./ClassOverride');
const {Buildorder} = require('./CreepProductionControl');
const {StructureOverride} = require('./StructureOverride');

class SpawnOverride extends StructureOverride{

    constructor(orig){
        super(orig);
        this.buildorder = new Buildorder();
    }

    SpawnCreep(){
        this.orig.spawnCreep(this.buildorder.NextBody, this.buildorder.NextName);
    }

    Update(){
        super.Update();
        console.log(this.orig.id);
        this.SpawnCreep();
    }
}

class SpawnTable extends ObjTable{

    constructor(){
        super(Game.spawns);
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