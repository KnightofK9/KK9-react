import Helper from './Helper'
import SessionManager from './SessionManager'
import * as Constant from './Constant'
import Popup from './Popup'
import Logger from '../share/Logger'

class Network {
    constructor() {
        this.DOMAIN = "http://quanlybanhangapi.azurewebsites.net/";
        this.BASE_PATH = this.DOMAIN + 'api/mobile/';
        this.topEventDispatcher = null;
    }

    setTopEventDispatcher = (topEventDispatcher) => {
        this.topEventDispatcher = topEventDispatcher;
    };
    getScheduleInfo = (callback, useLoadingAnimation = false) => {
        let request = this.createRequest("GetAllScheduleInfoV2", "GET", true, true, useLoadingAnimation);
        return request(null, callback);
    };

    getOrderById = (orderId, callback) => {
        let request = this.createRequest("GetOrderByIdV2", "POST");
        let body = {
            orderId
        };
        return request(body, (err,data,result)=>{
            if(err) callback(err,null,result);
            callback(err,JSON.parse(data),result);
        });
    };

    createOrder = (tableId, FoodWithOrderList,note, callback) => {
        let request = this.createRequest("CreateOrder", "POST");
        let body = {
            tableId,
            note,
            foodWithOrder: FoodWithOrderList
        };
        return request(body, callback);
    };

    updateOrder = (orderId, FoodWithOrderList,note, callback) => {
        let request = this.createRequest("UpdateOrder", "POST");
        let body = {
            orderId,
            note,
            foodWithOrder: FoodWithOrderList
        };
        return request(body, callback);
    };
    updateOrderByQuantities = (orderId, modifyQuantitiesInfos,note, callback) => {
        let request = this.createRequest("UpdateOrderByModifyQuantities", "POST");
        let body = {
            orderId,
            note,
            modifyQuantitiesInfos: modifyQuantitiesInfos
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



    setPrepareFoodStateTo = (prepareFoodId, prepareStateId, callback) => {

        let request = this.createRequest("SetPrepareFoodTo", "POST");
        let body = {
            prepareFoodId,
            prepareStateId,
        };
        return request(body, callback);
    };
    cancelPrepareFood = (prepareFoodId, reason, callback)=>{
        let request = this.createRequest("CancelPrepareFood","POST");
        let body = {
            prepareFoodId,
            reason,
        };
        return request(body, callback);
    };
    login = (username, password,isAutoTurnOffAnimation, callback) => {
        let request = this.createRequest("Login", "POST", false,true,true,isAutoTurnOffAnimation);
        let body = {
            username,
            password,
        };
        return request(body, callback)
    };
    handleError = (err, response, callback) => {
        Popup.showAlert("Lỗi", JSON.stringify(err), () => {
            callback(err, null, response);
        });
    };
    setSpinner = (isActive) => {
        if (this.topEventDispatcher !== null) this.topEventDispatcher.dispatch("spinner", isActive);
    };
    createRequest = (path = "", method = "GET", useAuthorization = true, isContentJson = true, isUseLoadingAnimation = true, isAutoTurnOffAnimation = true) => {
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

            this.handleStartRequest(isUseLoadingAnimation);
            Logger.log.trace("Requesting " + api, requestInfo);
            return fetch(api, requestInfo).then((response) => response.json())
                .then(responseJson => {
                    this.handleFinishRequest(isUseLoadingAnimation,isAutoTurnOffAnimation);
                    if (responseJson.Successful) {

                        Logger.log.trace("Success " + api, responseJson);
                        callback(null, responseJson.Data, responseJson);
                    } else {

                        Logger.log.error("Error " + api, responseJson);
                        this.handleError(responseJson, responseJson, callback);
                    }
                })
                .catch((error) => {

                    Logger.log.error("Error " + api, error);
                    this.handleFinishRequest(isUseLoadingAnimation,isAutoTurnOffAnimation);
                    this.handleError(error, null, callback);
                })
        }
    };
    handleStartRequest = (isUseLoadingAnimation) => {
        if (isUseLoadingAnimation) this.setSpinner(true);
    };
    handleFinishRequest = (isUseLoadingAnimation,isAutoTurnOffAnimation) => {
        if (isUseLoadingAnimation && isAutoTurnOffAnimation) this.setSpinner(false);
    };


}

export default (new Network)