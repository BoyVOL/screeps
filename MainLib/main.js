const { ObjectOverride,HtableOverride,MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");


class test extends Creep{
}

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MemoryItem("bla");
    test.value = test.value + "bla";
    console.log(test.value);

    var testControl = new HtableOverride(Game.spawns);
    console.log(testControl.count);
    testControl.forEach(function(value){
        console.log(value);
    })

    var test2 = new ObjectOverride(testControl.orig["Spawn1"]);

    console.log(test2.orig.hits,testControl.orig["Spawn1"].hits);
}

module.exports = {
    loop,
}