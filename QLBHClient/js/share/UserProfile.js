export default class UserProfile{
    constructor(apiUserProfile){
        this.username = apiUserProfile.username;
        this.accessToken = apiUserProfile.accessToken;
    }
    getAccessToken = () =>{
        return this.accessToken;
    }
}