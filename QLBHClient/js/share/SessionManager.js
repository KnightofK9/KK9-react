import Session from './Session'
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
            "            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNTE0ODYzNjYyLCJleHAiOjE1NDYzOTk2NjIsImlhdCI6MTUxNDg2MzY2Mn0.og5Iv6bplxKYbg1C8EjS4zeUum8TxR0wU93fwPEdY6Q\",\n" +
            "            \"type\": \"Bearer\",\n" +
            "            \"expiredTime\": 525600\n" +
            "        }\n" +
            "    }");
        this.createSession(userData);
    };
    createSession = (userData) =>{
        this.session = new Session();
        this.session.setUserProfile(userData);
    };
    getSession = ()=>{
        return this.session;
    };

}
export default (new SessionManager)