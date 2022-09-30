var MM = require('MemoryManagement');

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

    var testControl = new MM.HtableOverride(Game.flags);
    console.log(testControl.length);
    testControl.forEach(function(value){
        console.log(value);
    })
}

module.exports = {
    loop,
}