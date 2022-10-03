const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const {StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");

function loop(){

    spawnTable.Update();
    structTable.Update();
    creepTable.Update();
    
}

module.exports = {
    loop,
}