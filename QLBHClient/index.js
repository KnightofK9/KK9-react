import { AppRegistry } from 'react-native';
import App from './App';
import LoginBox from './js/screen/login'
import MainScreen from './js/screen/MainScreen'
import TestScreen from './js/screen/TestScreen'
import AppLayout from './js/screen/AppLayout'
import {ImageCache} from 'react-native-img-cache'


/**
 * Number.prototype.format(n, x)
 *
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function(n, x) {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
console.ignoredYellowBox = ['Warning: setState(...)','Remote debugger'];
ImageCache.get().clear();
AppRegistry.registerComponent('QLBHClient', () => AppLayout);

