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

    var test2 = new ObjectOverride(testControl.HTable[0]);
}

module.exports = {
    loop,
}