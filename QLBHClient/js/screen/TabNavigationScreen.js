import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    Container,
    Body,
    Title,
    Footer,
    FooterTab,
    Label,
    Button,
    Header,
    Content,
    Form,
    Item,
    Input,
    Icon,
    Badge,
} from 'native-base';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Menu from './Menu'
import DanhSachOrder from './DanhSachOrder'
import PrepareFood from './PrepareFood'
import TaiKhoan from './TaiKhoan'
import CommonComponent from '../share/CommonComponent'

const TabNavigationScreen = TabNavigator({
        OrderList: {
            screen: DanhSachOrder,
            navigationOptions: {
                title: "Đặt order",
                tabBarIcon: CommonComponent.createFunctionIcon("clipboard"),
            }
        },
        Menu: {
            screen: Menu,
            navigationOptions: {
                title: "Xem Menu",
                tabBarIcon: CommonComponent.createFunctionIcon("pizza"),
            }
        },
        PrepareFood: {
            screen: PrepareFood,
            navigationOptions: {
                title: "Món chờ",
                tabBarIcon: CommonComponent.createFunctionIcon("list-box"),
            }
        },
        Account: {
            screen: TaiKhoan,
            navigationOptions: {
                title: "Tài khoản",
                tabBarIcon: CommonComponent.createFunctionIcon("build"),
            }
        }
    }, {
        tabBarComponent: TabBarBottom,
        initialRouteName: 'OrderList',
        swipeEnabled: true,
        animationEnabled: true,
    }
);

export default TabNavigationScreen;