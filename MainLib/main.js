const { MemoryItem } = require('./MemoryManagement');
const { ObjectOverride,HtableOverride,ObjTableOverride } = require('./ClassOverride');

console.log("______________________________________________________________________________");


class test extends Creep{
}

function loop(){

    var test = new MemoryItem("test");
    var htable = new ObjTableOverride(Game.spawns);
    test.value = htable.orig;
}

module.exports = {
    loop,
}