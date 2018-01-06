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
import PrepareFoodWithOrder from './PrepareFoodWithOrder'
import Config from './Config'
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
        PrepareFoodWithOrder: {
            screen: PrepareFoodWithOrder,
            navigationOptions: {
                title: "Món chờ",
                tabBarIcon: CommonComponent.createFunctionIcon("list-box"),
            }
        },
    Config: {
            screen: Config,
            navigationOptions: {
                title: "Cài đặt",
                tabBarIcon: CommonComponent.createFunctionIcon("build"),
            }
        }
    }, {
        tabBarComponent: TabBarBottom,
        initialRouteName: 'OrderList',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: "#f9b045",
            labelStyle: {
                fontWeight: 'bold',
            },
            style: {
                backgroundColor: 'rgba(255,255,255,1)',
            },
        }
    }
);

export default TabNavigationScreen;