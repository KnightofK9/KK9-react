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
    };
    static jsonToQueryString = (json) => {
        return '?' +
            Object.keys(json).map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    };
    static calTotalMoneyToOrder = (order) =>{
        let totalMoney = 0;
        for(let food of order.FoodWithOrders){
            let foodPrice = food.Food.Price;
            let quantities = food.Quantities;
            let modifyQuantities = food.ModifyQuantities;
            totalMoney += foodPrice * (quantities + modifyQuantities);
        }
        order.BillMoney = totalMoney;
    };
    static createEmptyOrder = ()=>{
        let order = {
            OrderId:null,
            TableId:null,
            Table:null,
            CreatedDate:null,
            FoodWithOrders:[],
            BillMoney:null,
            MoneyReceive:null,
            MoneyReturn:null,
            Note:null,
        };
        return order;
    };
    static orderSetDefaultFoodModifyQuantities = (order)=>{
        for(let food of order.FoodWithOrders){
            if(food.ModifyQuantities === undefined) food.ModifyQuantities = 0;
        }
    };
    static getModifyFoodList = (order) =>{
        let modifyFoodList = [];
        for(let food of order.FoodWithOrders){
            if(food.ModifyQuantities !== 0){
                modifyFoodList.push({
                    Name:food.Food.Name,
                    ModifyQuantities:food.ModifyQuantities
                })
            }
        }
        return modifyFoodList;
    };
    static createEmptyFoodWithOrder = (Food)=>{
        return {
            FoodWithOrderId:null,
            OrderId:null,
            FoodId:Food.FoodId,
            Food:Food,
            Quantities:0,
            ModifyQuantities:0,
            Note:null,
        }
    };
    static setDefaultFoodWithOrder = (order,foodCategorizes) =>{
        order.FoodWithOrders = [];
        for(let foodCategorize of foodCategorizes){
            for(let foodInfo of foodCategorize.Foods){
                order.FoodWithOrders.push(Helper.createEmptyFoodWithOrder(foodInfo));
            }
        }
    };
    static removeEmptyFoodFromOrder = (order) =>{
        order.FoodWithOrders = order.FoodWithOrders.filter( e => e.Quantities + e.ModifyQuantities !== 0);
    };
    static createUrlFromImageId = (imageId) =>{
        return "http://quanlybanhangapi.azurewebsites.net/api/image/"+imageId;
    }

}