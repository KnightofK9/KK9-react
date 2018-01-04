import Session from './Session'
import Logger from '../share/Logger'
import Network from "./Network";
class SessionManager{
    constructor(){
        this.session = null;
    }
    loadDebugSessionIfNotExists = () =>{
        if(this.session !== null) return;
        let userData = JSON.parse("{\n" +
            "        \"user\": {\n" +
            "            \"Username\": \"admin\",\n" +
            "            \"password\": null,\n" +
            "            \"RoleId\": 1,\n" +
            "            \"Role\": null\n" +
            "        },\n" +
            "        \"token\": {\n" +
            "            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNTE0OTU1Mjc2LCJleHAiOjE1NDY0OTEyNzYsImlhdCI6MTUxNDk1NTI3Nn0.MMFcy3HD4SSfY3vnE_GDZBfHL8gLv8_sZoQ3ojylk7U\",\n" +
            "            \"type\": \"Bearer\",\n" +
            "            \"expiredTime\": 525600\n" +
            "        }\n" +
            "    }");
        this.createSession(userData);
    };
    createSession = (userData) =>{
        if(this.session !== null){
            this.clearSession();
        }

        this.session = new Session();
        this.session.setUserProfile(userData);
        this.session.onBeginSession();
        Logger.log.debug("New session init!",this.session);

    };
    getSession = ()=>{
        return this.session;
    };
    clearSession  = () =>{
        if(this.session !== null){
            this.session.onClearSession();
            Logger.log.debug("Clearing session!",this.session);
            this.session = null;
        }

    };
    logout = (callback) =>{
        this.clearSession();
        callback();
    }

}
export default (new SessionManager)