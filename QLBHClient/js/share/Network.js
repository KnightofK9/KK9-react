
import Helper from './Helper'
import SessionManager from './SessionManager'
import * as Constant from './Constant'
import Popup from './Popup'

class Network {
    constructor() {
        this.DOMAIN = "http://quanlybanhangapi.azurewebsites.net/";
        this.BASE_PATH = this.DOMAIN + 'api/mobile/';
        this.topEventDispatcher = null;
    }
    setTopEventDispatcher = (topEventDispatcher) =>{
        this.topEventDispatcher = topEventDispatcher;
    };
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

    createOrder = (tableId, FoodWithOrderList, callback) => {
        let request = this.createRequest("CreateOrder", "POST");
        let body = {
            tableId,
            foodWithOrder:FoodWithOrderList
        };
        return request(body, callback);
    };

    updateOrder = (orderId, FoodWithOrderList, callback) => {
        let request = this.createRequest("UpdateOrder", "POST");
        let body = {
            orderId,
            foodWithOrder:FoodWithOrderList
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
    handleError = (err,response,callback) =>{
        Popup.showAlert("Lỗi",JSON.stringify(err),()=>{
            callback(err,null,response);
        });
    };
    setSpinner = (isActive) =>{
        if(this.topEventDispatcher !== null) this.topEventDispatcher.dispatch("spinner",isActive);
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

            this.handleStartRequest();

            return fetch(api, requestInfo).then((response) => response.json())
                .then(responseJson => {
                    this.handleFinishRequest();
                    if (responseJson.Successful) {
                        callback(null, responseJson.Data, responseJson);
                    } else {
                       this.handleError(responseJson,responseJson,callback);
                    }
                })
                .catch((error) => {
                    this.handleFinishRequest();
                    this.handleError(error,null,callback);
                })
        }
    };
    handleStartRequest = () =>{
        this.setSpinner(true);
    };
    handleFinishRequest = () =>{
        this.setSpinner(false);
    };


}

export default (new Network)