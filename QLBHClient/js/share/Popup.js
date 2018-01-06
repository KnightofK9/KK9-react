import {
    AlertIOS
} from 'react-native';
export default class Popup{
    static isShow = false;
    static showConfirm = (title,message,okCallback,cancelCallback = ()=>{}) =>{
        if(Popup.isShow) return;
        Popup.isShow = true;
        AlertIOS.alert(title,message,[
            {
                text: 'Hủy',
                onPress: ()=>{
                    Popup.isShow = false;
                    cancelCallback();
                },
                style: 'cancel',
            },
            {
                text: 'Đồng ý',
                onPress: ()=>{
                    Popup.isShow = false;
                    okCallback();
                },
            },
        ])
    };
    static showInput = (title,message,okCallback, cancelCallback = () => {}) =>{
        if(Popup.isShow) return;
        Popup.isShow = true;
        AlertIOS.prompt(title,message,[
            {
                text: 'Hủy',
                onPress: ()=>{
                    Popup.isShow = false;
                    cancelCallback();
                },
                style: 'cancel',
            },
            {
                text: 'Đồng ý',
                onPress: ()=>{
                    Popup.isShow = false;
                    okCallback();
                },
            },
        ])
    };
    static showAlert = (title,message,okCallback) =>{
        if(Popup.isShow) return;
        Popup.isShow = true;
        AlertIOS.alert(title,message,[
            {
                text: 'Đồng ý',
                onPress: ()=>{

                    Popup.isShow = false;
                    okCallback();
                },
            },
        ])
    };
    static showSuccess = (callback)=>{
        if(Popup.isShow) return;
        Popup.isShow = true;
        AlertIOS.alert("Thành công",null,[
            {
                text: 'Đồng ý',
                onPress: ()=>{

                    Popup.isShow = false;
                    callback();
                },
            }]);
    };
}