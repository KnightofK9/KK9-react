import {fetch} from "react-native";
import Helper from './Helper'

class Network {
    constructor() {
        this.DOMAIN = "quanlybanhangapi.azurewebsites.net/";
        this.BASE_PATH = this.DOMAIN + 'api/';
    }

    getAllUnpayOrder = (callback) => {
        //TODO Làm thêm hàm get all unpay order
        let request = this.createRequest("GET", "order/");
        request(null, null, null, callback);
    };

    getOrderById = (orderId, callback) => {
        let request = this.createRequest("GET", "order/");
        request(orderId, null, null, callback);
    };

    createOrder = (tableId, foodList, callback) => {
        let request = this.createRequest("POST", "order/new");
        let FoodWithOrder = foodList.map((e, i) => {
            return {
                FoodId: e.foodId,
                Quantities: e.quantities
            }
        });
        let queryParams = {
            tableid: tableId
        };
        let body = {
            FoodWithOrder
        };
        request(null, queryParams, body, callback);
    };

    updateOrder = (orderId, foodList, callback) => {
        let request = this.createRequest("PUT", "order/updatefood/");
        let FoodWithOrder = foodList.map((e, i) => {
            return {
                FoodId: e.foodId,
                Quantities: e.quantities
            }
        });
        let body = {
            FoodWithOrder
        };
        request(orderId, null, body, callback);
    };

    cancelOrder = (orderId, callback) => {
        let request = this.createRequest("POST", "order/cancel/");
        request(orderId, null, null, callback);
    };

    getAllCategoryWithFood = (callback) => {
        //TODO Làm thêm hàm get category with food, food phải kèm foodPrice
        let request = this.createRequest("POST", "order/cancel/");

    };

    getAllCookedPrepareFood = (callback) => {
        //TODO làm thêm hàm lấy prepare food cho staff
    };

    getAllQueueAndCookingPrepareFood = (callback) => {
        //TODO làm thêm hàm lấy các prepare food cho đầu bếp
    };

    setQueueFoodToCooking = (prepareFoodId, callback) => {
        let request = this.createRequest("POST", "preparefood/cooking/");
        request(prepareFoodId, null, null, callback);
    };
    setCookingFoodToCooked = (prepareFoodId, callback) => {
        let request = this.createRequest("POST", "preparefood/cooked/");
        request(prepareFoodId, null, null, callback);
    };
    setCookedFoodToServed = (prepareFoodId, callback) => {
        let request = this.createRequest("POST", "preparefood/served/");
        request(prepareFoodId, null, null, callback);
    };
    cancelPrepareFood = (prepareFoodId, reason, callback) => {
        //TODO Xóa prepare food
    };


    createRequest = (method, path = "", useAuthorization = true, isContentJson = true) => {
        let headers = {
            Accept: 'application/json'
        };
        if (isContentJson) headers['Content-Type'] = 'application/json';
        let requestInfo = {
            method: method,
            headers: headers,
        };
        let api = this.BASE_PATH + path;
        return (id, params, body, callback) => {

            if (id !== null) api += id.toString() + "/";
            if (useAuthorization) {
                headers['Authorization'] = SessionManager.getSession().getUserProfile().getAccessToken();
            }
            if (method === "GET") {
                if (params !== null) {
                    api += Helper.jsonToQueryString(params);
                }
            } else {
                if (body !== null) {
                    requestInfo.body = JSON.stringify(body);
                }
            }

            fetch(api, requestInfo).then((response) => response.json())
                .then(responseJson => {
                    if (responseJson.Successful) {
                        callback(null, responseJson.Data, responseJson);
                    } else {
                        callback(true, null, responseJson);
                    }
                })
                .catch((error) => {
                    callback(error, null, null);
                })
        }
    }


}

export default (new Network)