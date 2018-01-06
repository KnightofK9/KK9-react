import randomcolor from 'randomcolor'
import * as Constant from '../share/Constant'

class DummyData {
    static dummyPrepareFoodList() {
        let prepareFoodRows = [];
        let dummyUrl = DummyData.dummyImage();
        prepareFoodRows.push(DummyData.createPrepareFoodRow(1, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.QUEUE));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(2, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.PROCESSING_CANCEL));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(3, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.COOKED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(4, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.COOKED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(5, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.COOKED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(6, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.SERVED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(7, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.SERVED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(8, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.SERVED));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(9, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.COOKING));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(10, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.COOKING));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(11, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.QUEUE));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(12, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.QUEUE));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(13, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.QUEUE));
        prepareFoodRows.push(DummyData.createPrepareFoodRow(14, dummyUrl, "Thịt bò", Constant.PREPARE_STATE.QUEUE));
        return prepareFoodRows;
    }

    static dummyImage = () => {
        let dummyUrl = "http://quanlybanhangapi.azurewebsites.net/api/image/9";
        return dummyUrl;
    };

    static createPrepareFoodRow(prepareFoodId, foodImage, foodName, prepareState) {
        return {
            prepareFoodId,
            tableId: prepareFoodId,
            foodImage,
            foodName,
            prepareState,
        }
    }

    static dummyFoodList() {
        let categorizeName = "Món tráng miệng";
        let foodList = [];
        let dummyUrl = DummyData.dummyImage();
        foodList.push(DummyData.createFood(1, "Thịt bò kho", 20000, dummyUrl));
        foodList.push(DummyData.createFood(2, "Thịt bò thăn", 25000, dummyUrl));
        foodList.push(DummyData.createFood(3, "Thịt bò mềm", 20000, dummyUrl));
        foodList.push(DummyData.createFood(4, "Thịt bò ướp", 15000, dummyUrl));
        foodList.push(DummyData.createFood(5, "Thịt bò xào", 12000, dummyUrl));
        foodList.push(DummyData.createFood(6, "Thịt bò xào", 12000, dummyUrl));
        foodList.push(DummyData.createFood(7, "Thịt bò xào", 13000, dummyUrl));
        foodList.push(DummyData.createFood(8, "Thịt bò xào", 14000, dummyUrl));
        foodList.push(DummyData.createFood(9, "Thịt bò xào", 15000, dummyUrl));
        foodList.push(DummyData.createFood(10, "Thịt bò xào", 16000, dummyUrl));
        foodList.push(DummyData.createFood(11, "Thịt bò xào", 17000, dummyUrl));
        foodList.push(DummyData.createFood(12, "Thịt bò xào", 18000, dummyUrl));
        foodList.push(DummyData.createFood(13, "Thịt bò xào", 19000, dummyUrl));
        foodList.push(DummyData.createFood(14, "Thịt bò xào", 20000, dummyUrl));
        foodList.push(DummyData.createFood(15, "Thịt bò xào", 21000, dummyUrl));
        return {
            categorizeName, foodList
        };
    }

    static createFood(foodId, foodName, foodPrice, foodImage) {
        return {
            foodId,
            foodName,
            foodImage,
            foodPrice,
            quantities: 0
        }
    }

    static dummyConfirmOrderList() {
        let confirmOrderList = [];
        confirmOrderList.push(DummyData.createConfirmOrderRow(1, "Thịt bò", 2));
        confirmOrderList.push(DummyData.createConfirmOrderRow(2, "Thịt heo", 3));
        confirmOrderList.push(DummyData.createConfirmOrderRow(3, "Thịt cừu", 1));
        confirmOrderList.push(DummyData.createConfirmOrderRow(4, "Thịt dê", 4));
        confirmOrderList.push(DummyData.createConfirmOrderRow(5, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(6, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(7, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(8, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(9, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(10, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(11, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(12, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(13, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(14, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(15, "Thịt lợn", 5));
        confirmOrderList.push(DummyData.createConfirmOrderRow(16, "Thịt lợn", 5));
        return confirmOrderList;
    }

    static createConfirmOrderRow(foodId, foodName, quantities) {
        return {
            foodId,
            foodName,
            quantities,
        }
    }

    static dummyOrderRowList() {
        let orderRowList = [];
        orderRowList.push(DummyData.createOrderRow(1));
        orderRowList.push(DummyData.createOrderRow(2));
        orderRowList.push(DummyData.createOrderRow(3));
        orderRowList.push(DummyData.createOrderRow(4));
        orderRowList.push(DummyData.createOrderRow(5));
        return orderRowList;
    }

    static createOrderRow(orderId) {
        return {
            orderId,
            tableId: orderId
        }
    }

    static randomColor() {
        return randomcolor.randomColor(Date.now());
    }
}

module.exports = DummyData;