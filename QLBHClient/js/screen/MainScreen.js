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
import {StackNavigator} from 'react-navigation';
import Menu from './Menu'
import DanhSachOrder from './DanhSachOrder'
import PrepareFood from './PrepareFood'
import XacNhanOrder from './XacNhanOrder'
import Login from './login'
import BaseScreen from './BaseScreen'
import BackgroundService from '../share/BackgroundService'
import TabNavigationScreen from './TabNavigationScreen'

class MainScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            prepareFoodCount: 0,
        };
        // this.setUpBackgroundServiceHandle();
    }

    setUpBackgroundServiceHandle = () => {
        let handle = (value) => {
            let prepareFoodCount = value.prepareFoods.length;
            // this.state.prepareFoodCount = prepareFoodCount;
            this.setState({prepareFoodCount});
        };
        BackgroundService.addHandle(handle);
    };
    switchScreen = (index) => {
        this.setState({index})
    };

    getComponentByIndex = (index) => {
        switch (index) {
            case 0:
                return DanhSachOrder;
            case 1:
                return Menu;
            case 2:
                return PrepareFood;
            case 3:
                return TaiKhoan;
        }
        return 0;
    };
    createPrepareFoodBadge = () => {
        let badge = null;
        if (this.state.prepareFoodCount !== 0) badge = <Badge><Text>{this.state.prepareFoodCount}</Text></Badge>;
        return badge;
    };
    createButton = (screen, iconName, buttonText, isActive = false, badge = null) => {
        return <Button onPress={() => {
            this.switchScreen(screen)
        }} active={isActive} badge={badge !== null} vertical>
            {badge}
            <Icon name={iconName}/>
            <Text>{buttonText}</Text>
        </Button>
    };

    render() {
        // let AppComponent = this.getComponentByIndex(this.state.index);
        // let prepareFoodBadge = this.createPrepareFoodBadge();
        // let orderListButton = this.createButton(0, "clipboard", "Đặt order");
        // let menuButton = this.createButton(1, "pizza", "Xem Menu");
        // let prepareFoodButton = this.createButton(2, "list-box", "Món chờ",false,prepareFoodBadge);
        // let accountButton = this.createButton(3, "build", "Tài khoản");
        return (
            <Container>
                {/*<AppComponent topEventDispatcher={this.props.topEventDispatcher}*/}
                              {/*navigation={this.props.navigation}/>*/}
                <TabNavigationScreen screenProps={{mainNavigation:this.props.navigation}} />
                {/*<Footer>*/}
                    {/*<FooterTab>*/}
                        {/*{orderListButton}*/}
                        {/*{menuButton}*/}
                        {/*{prepareFoodButton}*/}
                        {/*{accountButton}*/}
                    {/*</FooterTab>*/}
                {/*</Footer>*/}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});
const RootNavigator = StackNavigator({
        Main: {
            screen: MainScreen,
        },
        MenuForCreateOrder: {
            screen: Menu,
        },
        ConfirmCreateOrder: {
            screen: XacNhanOrder,
        },
        Login: {
            screen: Login,
        }
    }, {
        headerMode: 'none',
        // initialRouteName: 'Login',
        initialRouteName: 'Main',
    }
);

export default RootNavigator;