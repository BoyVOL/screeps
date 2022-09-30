const { SpawnOverride,SpawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable, CreepTable} = require('./CreepOverride');

console.log("______________________________________________________________________________");

var spawnTable = new SpawnTable();
var creepTable = new CreepTable();

function loop(){
    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}