const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");

function loop(){
    var item = new MemoryItem("bla","",Memory.creeps);
    item.value += "bla";
    console.log(item.value);

    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}