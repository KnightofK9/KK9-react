import randomcolor from 'randomcolor'
class DummyData{
    static dummyPrepareFoodList(){
        let prepareFoodRows = [];
        let dummyUrl = "http://quanlybanhangapi.azurewebsites.net/api/image/9";
        prepareFoodRows.push(DummyData.createPrepareFoodRow(1,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(2,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(3,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(4,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(5,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(6,dummyUrl,"Thịt bò",1));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(7,dummyUrl,"Thịt bò",1));
        return prepareFoodRows;
    }
    static createPrepareFoodRow(prepareFoodId,foodImage,foodName,prepareState){
        return{
            prepareFoodId,
            tableId : prepareFoodId,
            foodImage,
            foodName,
            prepareState,
        }
    }
    static dummyFoodList(){
        let categorizeName = "Món tráng miệng";
        let foodList = [];
        let dummyUrl = "http://quanlybanhangapi.azurewebsites.net/api/image/9";
        foodList.push(DummyData.createFood(1,"Thịt bò kho",dummyUrl));
        foodList.push(DummyData.createFood(2,"Thịt bò thăn",dummyUrl));
        foodList.push(DummyData.createFood(3,"Thịt bò mềm",dummyUrl));
        foodList.push(DummyData.createFood(4,"Thịt bò ướp",dummyUrl));
        foodList.push(DummyData.createFood(5,"Thịt bò xào",dummyUrl));
        return {
            categorizeName,foodList
        };
    }
    static createFood(foodId, foodName,foodImage){
        return{
            foodId,
            foodName,
            foodImage,
            quantities:0
        }
    }
    static dummyConfirmOrderList(){
        let confirmOrderList = [];
        confirmOrderList.push(DummyData.createConfirmOrderRow(1,"Thịt bò",2));
        confirmOrderList.push(DummyData.createConfirmOrderRow(2,"Thịt heo",3));
        confirmOrderList.push(DummyData.createConfirmOrderRow(3,"Thịt cừu",1));
        confirmOrderList.push(DummyData.createConfirmOrderRow(4,"Thịt dê",4));
        confirmOrderList.push(DummyData.createConfirmOrderRow(5,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(6,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(7,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(8,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(9,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(10,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(11,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(12,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(13,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(14,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(15,"Thịt lợn",5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(16,"Thịt lợn",5));
        return confirmOrderList;
    }
    static createConfirmOrderRow(foodId,foodName,quantities){
        return{
            foodId,
            foodName,
            quantities,
        }
    }
    static dummyOrderRowList(){
        let orderRowList = [];
        orderRowList.push(DummyData.createOrderRow(1));
        orderRowList.push(DummyData.createOrderRow(2));
        orderRowList.push(DummyData.createOrderRow(3));
        orderRowList.push(DummyData.createOrderRow(4));
        orderRowList.push(DummyData.createOrderRow(5));
        return orderRowList;
    }
    static createOrderRow(orderId){
        return {
            orderId,
            tableId : orderId
        }
    }
    static randomColor(){
        return randomcolor.randomColor(Date.now());
    }
}
module.exports = DummyData;