export default class EventDispatcher{
    constructor(){
        this.eventDict = {};
    }
    registerEvent = (id,handle) => {
        if(!this.eventDict.hasOwnProperty(id)) this.eventDict[id] = [];
        this.eventDict[id].push(handle);
    };
    dispatch = (id,value,callObject)=>{
        if(this.eventDict.hasOwnProperty(id)){
            for(let handle of this.eventDict[id]){
                handle(value,callObject);
            }
        }
    };
}