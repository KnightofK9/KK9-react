export default class Helper {
    static isConditionAccepted = (conditionCheck) => {
        if(typeof(conditionCheck) === 'function'){
            if(!conditionCheck()) return false;
        }else if(!conditionCheck) return false;
        return true;
    };
    static calTotalMoney = (foodList) =>{
        let totalMoney = 0;
        for(let food of foodList){
            totalMoney += Helper.calTotalMoneyOnFood(food);
        }
        return totalMoney;
    };
    static calTotalMoneyOnFood = (food)=>{
        return food.quantities * food.foodPrice;
    }
}