import UserProfile from './UserProfile'
import BackgroundService from './BackgroundService'
export default class Session{
    constructor(){
        this.userProfile = null;
        this.scheduleData = null;
        this.setUpEventHandle();
    }
    setUpEventHandle = () =>{
        let scheduleDataHandle =  (data)=>{
            this.scheduleData = data;
        };
        BackgroundService.addHandle(scheduleDataHandle);
    };
    setUserProfile = (apiUserProfile) =>{
        this.userProfile = new UserProfile(apiUserProfile);
    };
    getUserProfile = () =>{
        return this.userProfile;
    };
    getTables = () =>{
        if(this.scheduleData === null) return [];
        return this.scheduleData.tables;
    };
    getPrepareFoods = () =>{
        if(this.scheduleData === null) return [];
        return this.scheduleData.prepareFoods;
    };
    onClearSession = () =>{
        BackgroundService.stop();
    };
    onBeginSession = () =>{
        BackgroundService.start();
    };
}