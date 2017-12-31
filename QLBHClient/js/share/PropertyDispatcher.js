export default class PropertyDispatcher {
    constructor(property) {
        this.property = property;
    }
    connect = (handler,propertyKey) => {
        this.handler = handler;
        this.propertyKey = propertyKey;
    };
    dispatch = (value, type) => {
        let key = this.propertyKey;
        this.property[key] = this.handler(this.property[key],value, type);
    }
}