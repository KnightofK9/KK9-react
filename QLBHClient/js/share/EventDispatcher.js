export default class EventDispatcher{
    constructor(){
        this.eventDict = {};
    }
    registerEvent = (id,handle) => {
        this.eventDict[id] = handle;
    };
    dispatch = (id,value,callObject)=>{
        if(this.eventDict.hasOwnProperty(id)){
            this.eventDict[id](value,callObject);
        }
    };
}