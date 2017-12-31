export default class PropertyDispatcher {
    constructor(property,self) {
        this.property = property;
        this.self = self;
    }
    connect = (handler,propertyKey) => {
        this.handler = handler;
        this.propertyKey = propertyKey;
    };
    dispatch = (value, type) => {
        let key = this.propertyKey;
        let updatedProperty = this.handler(this.property[key],value, type);
        if(this.self !== undefined){
            this.self.setState((prevState)=>{
                prevState[key] = updatedProperty;
                return prevState;
            });
        }
        else this.property[key] = updatedProperty;
    }
}