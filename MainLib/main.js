const { SpawnOverride,SpawnTable} = require('./SpawnOverride');

console.log("______________________________________________________________________________");

function loop(){
    var spawnTable = new SpawnTable();
    console.log(spawnTable.objArray.length);
    spawnTable.Update();
}

module.exports = {
    loop,
}