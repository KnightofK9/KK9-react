import {
    AlertIOS
} from 'react-native';
export default class Popup{
    static showConfirm = (title,message,okCallback,cancelCallback = ()=>{}) =>{
        AlertIOS.alert(title,message,[
            {
                text: 'Hủy',
                onPress: cancelCallback,
                style: 'cancel',
            },
            {
                text: 'Đồng ý',
                onPress: okCallback,
            },
        ])
    };
    static showAlert = (title,message,okCallback) =>{
        AlertIOS.alert(title,message,[
            {
                text: 'Đồng ý',
                onPress: okCallback,
            },
        ])
    };
    static showSuccess = (callback)=>{

        AlertIOS.alert("Thành công",null,[
            {
                text: 'Đồng ý',
                onPress: callback,
            }]);
    }
}