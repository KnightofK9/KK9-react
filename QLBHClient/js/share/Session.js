import UserProfile from './UserProfile'
import BackgroundService from './BackgroundService'
import * as Constant from '../share/Constant'
export default class Session {
    constructor() {
        this.userProfile = null;
        this.scheduleData = null;
        this.setUpEventHandle();
    }

    setUpEventHandle = () => {
        let scheduleDataHandle = (data) => {
            this.setScheduleData(data);
        };
        BackgroundService.addHandle(scheduleDataHandle);
    };
    setScheduleData = (data) => {
        this.scheduleData = data;
    };
    setUserProfile = (apiUserProfile) => {
        this.userProfile = new UserProfile(apiUserProfile);
    };
    getUserProfile = () => {
        return this.userProfile;
    };
    getTables = () => {
        if (this.scheduleData === null) return [];
        return this.scheduleData.tables;
    };
    getPrepareFoods = () => {
        if (this.scheduleData === null) return [];
        return this.scheduleData.prepareFoods;
    };
    getOrderWithPrepareFoods = () => {
        if (this.scheduleData === null) return [];
        return this.scheduleData.orderWithPrepareFoods;
    };
    getFoodCategorizes = () => {
        if (this.scheduleData === null) return [];
        return this.scheduleData.foodCategorizes;
    };
    getUnpayOrders = () => {
        if (this.scheduleData === null) return [];
        return this.scheduleData.orders;
    };
    onClearSession = () => {
        BackgroundService.detachAllHandler();
        BackgroundService.stop();
    };
    onBeginSession = () => {
        BackgroundService.start();
    };
    getFilterPrepareStateIdList = () =>{
        if (this.userProfile === null) return [];
        let prepareStateIds = [];
        switch (this.userProfile.userProfile.RoleId){
            case Constant.ROLE_ID.ACCOUNTANT_ROLE:
            case Constant.ROLE_ID.ADMIN_ROLE:
            case Constant.ROLE_ID.CASHIER_ROLE:
                prepareStateIds.push(Constant.PREPARE_STATE.PROCESSING_CANCEL);
                prepareStateIds.push(Constant.PREPARE_STATE.QUEUE_CANCEL);
                prepareStateIds.push(Constant.PREPARE_STATE.QUEUE);
                prepareStateIds.push(Constant.PREPARE_STATE.COOKING);
                prepareStateIds.push(Constant.PREPARE_STATE.COOKED);
                prepareStateIds.push(Constant.PREPARE_STATE.SERVED);
                break;
            case Constant.ROLE_ID.CHEFT_ROLE:
                prepareStateIds.push(Constant.PREPARE_STATE.QUEUE);
                prepareStateIds.push(Constant.PREPARE_STATE.COOKING);
                break;
            case Constant.ROLE_ID.STAFF_ROLE:
                prepareStateIds.push(Constant.PREPARE_STATE.COOKED);
                break;
        }
        return prepareStateIds;
    };
    filterOrderWithPrepareFoods = (prepareFoodWithOrders) =>{
        if(prepareFoodWithOrders === null || prepareFoodWithOrders === undefined || prepareFoodWithOrders.length === 0) return [];
        let prepareStateIds = this.getFilterPrepareStateIdList();
        prepareFoodWithOrders.forEach((prepareFoodWithOrder,i)=>{
            prepareFoodWithOrder.prepareFoods = prepareFoodWithOrder.prepareFoods
                .filter((k)=>{return prepareStateIds.includes(k.PrepareStateId)});
        });
        return prepareFoodWithOrders;
    }
}