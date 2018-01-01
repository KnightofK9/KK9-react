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
import { StackNavigator } from 'react-navigation';
import Menu from './Menu'
import DanhSachOrder from './DanhSachOrder'
import PrepareFood from './PrepareFood'
import TaiKhoan from './TaiKhoan'
import XacNhanOrder from './XacNhanOrder'

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    switchScreen = (index) => {
        this.setState({index})
    };

    getComponentByIndex = (index) =>{
        switch (index){
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

    render() {
        let AppComponent = this.getComponentByIndex(this.state.index);
        return (
            <Container>
                <AppComponent mainNavigation={this.props.navigation}/>
                <Footer>
                    <FooterTab>
                        <Button onPress={() =>{this.switchScreen(0)}} vertical>
                            <Icon name="clipboard"/>
                            <Text>Đặt order</Text>
                        </Button>
                        <Button onPress={() =>{this.switchScreen(1)}} vertical>
                            <Icon name="pizza"/>
                            <Text>Xem Menu</Text>
                        </Button>
                        <Button onPress={() =>{this.switchScreen(2)}} badge vertical>
                            <Badge><Text>20</Text></Badge>
                            <Icon name="list-box"/>
                            <Text>Món chờ</Text>
                        </Button>
                        <Button onPress={() =>{this.switchScreen(3)}} vertical>
                            <Icon name="build"/>
                            <Text>Tài khoản</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});
const RootNavigator = StackNavigator({
    Main:{
        screen:MainScreen,
    },
    MenuForCreateOrder:{
        screen:Menu,
    },
    ConfirmCreateOrder:{
        screen:XacNhanOrder,
    }
},{
    headerMode:'none'
});

export default RootNavigator;