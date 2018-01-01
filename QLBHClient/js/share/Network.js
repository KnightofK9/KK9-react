import RequestGroup from './RequestGroup'
class Network{
    constructor(){
        this.DOMAIN =  "quanlybanhangapi.azurewebsites.net/";
        this.BASE_PATH = this.DOMAIN + 'api/';
        this.createUnitRequest();
        this.createIngredientRequest();
        this.createFoodRequest();
        this.createFoodCategorizeRequest();
        this.createTableRequest();
        this.createUserRequest();
        this.createOrderRequest();
        this.createPrepareFoodRequest();
        this.createImportIngredientRequest();
        this.createImageRequest();
        this.createBaseRequest();
    }
    createUnitRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'unit/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("updateById","PUT");
        requestGroup.createRequest("deleteById","DELETE");
        this.Unit = requestGroup;
    };
    createIngredientRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'ingredient/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("getById","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("updateById","PUT");
        requestGroup.createRequest("deleteById","DELETE");
        this.Ingredient = requestGroup;
    };
    createFoodRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'food/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("getById","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("updateById","PUT");
        requestGroup.createRequest("updateFoodIngById","PUT","ingredient/");
        requestGroup.createRequest("deleteById","DELETE");
        this.Food = requestGroup;
    };
    createFoodCategorizeRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'foodcategory/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("updateById","PUT");
        requestGroup.createRequest("deleteById","DELETE");
        this.FoodCategorize = requestGroup;
    };
    createTableRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'table/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("updateById","PUT");
        requestGroup.createRequest("deleteById","DELETE");
        this.Table = requestGroup;
    };
    createUserRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'user/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("getByUsername","GET");
        requestGroup.createRequest("changePassword","POST","changepassword/");
        this.User = requestGroup;
    };
    createOrderRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'order/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("createOrderWithTableId","POST");
        requestGroup.createRequest("updateOrderFoodByFoodId","PUT","updatefood/");
        requestGroup.createRequest("getById","GET");
        requestGroup.createRequest("payById","POST","pay/");
        requestGroup.createRequest("cancelById","POST","cancel/");
        this.Order = requestGroup;
    };

    createPrepareFoodRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'preparefood/');
        requestGroup.createRequest("getAllPrepare","GET","prepare/");
        requestGroup.createRequest("getAllUndone","GET","undone/");
        requestGroup.createRequest("setCookingById","POST","cooking/");
        requestGroup.createRequest("setServedById","POST","served/");
        requestGroup.createRequest("setCookedById","POST","cooked/");
        requestGroup.createRequest("deleteAll","DEL");
        this.PrepareFood = requestGroup;
    };

    createImportIngredientRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'importingredient/');
        requestGroup.createRequest("getAll","GET");
        requestGroup.createRequest("getById","GET");
        requestGroup.createRequest("create","POST");
        requestGroup.createRequest("deleteById","DEL");
        this.ImportIngredient = requestGroup;
    };
    createImageRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH + 'image/');
        requestGroup.createRequest("getById","GET");
        this.Image = requestGroup;
    };
    createBaseRequest = ()=>{
        let requestGroup = new RequestGroup(this.BASE_PATH);
        requestGroup.createRequest("getAccessToken","POST");
        this.Base = requestGroup;
    };

}

export default (new Network)