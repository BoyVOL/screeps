var MM = require('MemoryManagement');
const { ObjectOverride } = require('./MemoryManagement');

console.log("______________________________________________________________________________");


class test extends Creep{
}

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MM.MemoryItem("bla");
    test.native = test.native + "bla";
    console.log(test.native);

    var testControl = new MM.HtableOverride(Game.spawns);
    console.log(testControl.length);
    testControl.forEach(function(value){
        console.log(value);
    })

    var test2 = new ObjectOverride(testControl.native["Spawn1"]);

    console.log(test2.native.hits,testControl.native["Spawn1"].hits);
}

module.exports = {
    loop,
}