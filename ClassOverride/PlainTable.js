/**
 * Класс "плоской" таблицы объектов, в которой представлены они все
 */
class PlainTable{
    constructor(){
        this.objects = {};
    }

    get count(){
        return Object.keys(this.objects).length;
    }

    AddObject(obj){
        if(obj.haskey) this.objects[obj.key] = obj;
    }

    DeleteObject(obj){
        if(obj.haskey) delete this.objects[obj.key];
    }
}

//Автоматически создаваемая таблица, доступная всем как константа
const plainTable = new PlainTable();

export {PlainTable};