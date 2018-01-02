
import Helper from './Helper'
import SessionManager from './SessionManager'
import * as Constant from './Constant'

class Network {
    constructor() {
        this.DOMAIN = "quanlybanhangapi.azurewebsites.net/";
        this.BASE_PATH = this.DOMAIN + 'api/mobile/';
    }

    getAllUnpayOrder = (callback) => {
        let request = this.createRequest("GetAllUnPayOrders");
        return request(null, callback);
    };

    getOrderById = (orderId, callback) => {
        let request = this.createRequest("GetOrderById", "POST");
        let body = {
            orderId
        };
        return request(body, callback);
    };

    createOrder = (tableId, foodList, callback) => {
        let request = this.createRequest("CreateOrder", "POST");
        let foodWithOrder = foodList.map((e, i) => {
            return {
                FoodId: e.foodId,
                Quantities: e.quantities,
            }
        });
        let body = {
            tableId,
            foodWithOrder
        };
        return request(body, callback);
    };

    updateOrder = (orderId, foodList, callback) => {
        let request = this.createRequest("UpdateOrder", "POST");
        let foodWithOrder = foodList.map((e, i) => {
            return {
                FoodId: e.foodId,
                Quantities: e.quantities,
            }
        });
        let body = {
            orderId,
            foodWithOrder
        };
        return request(body, callback);
    };

    cancelOrder = (orderId, callback) => {
        let request = this.createRequest("CancelOrder", "POST");
        let body = {
            orderId,
        };
        return request(body, callback);
    };

    getAllCategoryWithFood = (callback) => {
        let request = this.createRequest("GetAllCategorizesWithFood");
        return request(null, callback);
    };

    getAllCookedPrepareFood = (callback) => {
        let request = this.createRequest("GetAllPrepareFoodByState", "POST");
        let prepareState = [
            Constant.PREPARE_STATE.COOKED
        ];
        let body = {
            prepareState
        };
        return request(body, callback);
    };
    getAllPrepareFood = (callback) =>{
        let request = this.createRequest("GetAllPrepareFoodByState", "POST");
        let prepareState = [
            Constant.PREPARE_STATE.CANCEL,
            Constant.PREPARE_STATE.QUEUE,
            Constant.PREPARE_STATE.COOKING,
            Constant.PREPARE_STATE.COOKED,
            Constant.PREPARE_STATE.SERVED,
        ];
        let body = {
            prepareState
        };
        return request(body, callback);
    };

    getAllQueueAndCookingPrepareFood = (callback) => {

        let request = this.createRequest("GetAllPrepareFoodByState", "POST");
        let prepareState = [
            Constant.PREPARE_STATE.QUEUE,
            Constant.PREPARE_STATE.COOKING,
        ];
        let body = {
            prepareState
        };
        return request(body, callback);
    };

    setQueueFoodToCooking = (prepareFoodId, callback) => {
        let request = this.createRequest("SetPrepareFoodTo", "POST");
        let prepareState = Constant.PREPARE_STATE.COOKING;
        let body = {
            prepareFoodId,
            prepareState,
        };
        return request(body, callback);
    };
    setCookingFoodToCooked = (prepareFoodId, callback) => {
        let request = this.createRequest("SetPrepareFoodTo", "POST");
        let prepareState = Constant.PREPARE_STATE.COOKED;
        let body = {
            prepareFoodId,
            prepareState,
        };
        return request(body, callback);
    };
    setCookedFoodToServed = (prepareFoodId, callback) => {

        let request = this.createRequest("SetPrepareFoodTo", "POST");
        let prepareState = Constant.PREPARE_STATE.SERVED;
        let body = {
            prepareFoodId,
            prepareState,
        };
        return request(body, callback);
    };
    cancelPrepareFood = (prepareFoodId, reason, callback) => {

        let request = this.createRequest("SetPrepareFoodTo", "POST");
        let prepareState = Constant.PREPARE_STATE.CANCEL;
        let body = {
            prepareFoodId,
            prepareState,
        };
        return request(body, callback);
    };
    login = (username,password,callback) =>{
          let request = this.createRequest("Login","POST",false);
          let body = {
              username,
              password,
          };
          return request(body,callback)
    };

    createRequest = (path = "", method = "GET", useAuthorization = true, isContentJson = true) => {
        let headers = {
            Accept: 'application/json'
        };
        if (isContentJson) headers['Content-Type'] = 'application/json';
        let requestInfo = {
            method: method,
            headers: headers,
        };
        let api = this.BASE_PATH + path;
        return (body, callback, id = null, params = null) => {

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

            return fetch(api, requestInfo).then((response) => response.json())
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