import Session from './Session'
class SessionManager{
    constructor(){

    }
    createSession = (userData) =>{
        this.session = new Session();
        this.session.setUserProfile(userData);
    };
    getSession = ()=>{
        return this.session;
    };

}
export default (new SessionManager)