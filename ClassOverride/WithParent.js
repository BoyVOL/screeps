import { Updatable } from "./Updatable";

class WithParent extends Updatable{
    constructor(parent){
        super();
        this.parent = parent;
    }
}

export {WithParent};