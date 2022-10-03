const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const {StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");

function loop(){

    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    structTable.Update();
    console.log("hashcount ",structTable.count);
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}