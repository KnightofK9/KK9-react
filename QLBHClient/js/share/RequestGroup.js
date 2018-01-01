import {fetch} from "react-native";
import SessionManager from './SessionManager'
import Helper from './Helper'
export default class RequestGroup {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    createRequest = (methodName, method, path = "", useAuthorization = true, isContentJson = true) => {
        let headers = {
            Accept: 'application/json'
        };
        if (isContentJson) headers['Content-Type'] = 'application/json';
        let requestInfo = {
            method: method,
            headers: headers,
        };
        let url = this.baseUrl + path;
        this[methodName] = (id, params,body, callback) => {
            let api = url + id;
            if (useAuthorization) {
                headers['Authorization'] = SessionManager.getSession().getUserProfile().getAccessToken();
            }
            if(method === "GET"){
                if(params !== null){
                    api += Helper.jsonToQueryString(params);
                }
            }else{
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