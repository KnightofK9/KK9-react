export default class Helper {
    static isConditionAccepted = (conditionCheck) => {
        if(typeof(conditionCheck) === 'function'){
            if(!conditionCheck()) return false;
        }else if(!conditionCheck) return false;
        return true;
    };
}