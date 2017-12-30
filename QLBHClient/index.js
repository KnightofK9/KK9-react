import { AppRegistry } from 'react-native';
import App from './App';
import LoginBox from './js/screen/login'
import Menu from './js/screen/Menu'
import DanhSachOrder from './js/screen/DanhSachOrder'
import XacNhanOrder from './js/screen/XacNhanOrder'

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

AppRegistry.registerComponent('QLBHClient', () => XacNhanOrder);
