export default class UserProfile{
    constructor(apiUserProfile){
        this.userProfile = apiUserProfile.user;
        this.token = apiUserProfile.token;
    }
    getAccessToken = () =>{
        return this.token.type + " " + this.token.accessToken;
    }
}