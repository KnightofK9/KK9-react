import Session from './Session'
class SessionManager{
    constructor(){
        this.loadSessionOrCreateIfNotExists();
    }
    loadSessionOrCreateIfNotExists = ()=>{
        this.session = new Session();
    };
    getSession = ()=>{
        return this.session;
    }
}
export default (new SessionManager)