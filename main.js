console.log("______________________________________________________________________________");

const {RoomTable} = require('./RoomOverride');
const {plainTable} = require('./PlainClassTable');

var RTable = new RoomTable;

function loop(){
    RTable.Update();

    console.log(RTable.AsArray());
    console.log(RTable.objects['sim'].key);
    console.log(plainTable.objects['sim'].key);
}
module.exports = {
    loop,
}