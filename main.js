console.log("______________________________________________________________________________");

const {RoomTable} = require('./RoomOverride');
const {plainTable} = require('./PlainClassTable');

var RTable = new RoomTable;

function loop(){
    RTable.Update();

    console.log(RTable.AsArray());
    console.log(RTable.objects['sim'].key);
    console.log(RTable.objects['sim'].orig.memory);
    console.log(plainTable.objects['sim'].key);
    RTable.objects['sim'].orig.memory = {bla: 1};
}
module.exports = {
    loop,
}