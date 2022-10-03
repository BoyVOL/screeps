const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
<<<<<<< Updated upstream
const { MemoryItem } = require('./MemoryManagement');
=======
const {StructureOverride,StructureTable,structTable} = require("./StructureOverride");
>>>>>>> Stashed changes

console.log("______________________________________________________________________________");

function loop(){

    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    structTable.Update();
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}