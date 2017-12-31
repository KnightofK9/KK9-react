export default class PropertyDispatcherDict {
    constructor(){
        this.pdDict = {};
    }
    registerDispatcher = (id,dispatcher) =>{
        this.pdDict[id] = dispatcher;
    };
    dispatch = (id, value, type) => {
        if(this.pdDict.hasOwnProperty(id)){
            this.pdDict[id].dispatch(value,type);
        }
    };
}