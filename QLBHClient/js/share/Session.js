import UserProfile from './UserProfile'
export default class Session{
    constructor(){
        this.userProfile = null;
    }
    setUserProfile = (apiUserProfile) =>{
        this.userProfile = new UserProfile(apiUserProfile);
    };
    getUserProfile = () =>{
        return this.userProfile;
    }
}