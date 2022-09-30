const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');

console.log("______________________________________________________________________________");

function loop(){
    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}