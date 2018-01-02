import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {
    Container,
    Body,
    Left,
    Title,
    Right,
    Label,
    Button,
    Icon,
    Header,
    Content,
    Form,
    Item,
    Input
} from 'native-base';
import DummyData from '../utilities/DummyData'
import ConfirmOrderRow from '../component/ConfirmOrderRow'
import CommonStyles from '../share/CommonStyles'
import CommonComponent from '../share/CommonComponent'
import Helper from '../share/Helper'
import PropertyDispatcher from '../share/PropertyDispatcher'
import EventDispatcher from '../share/EventDispatcher'
import Popup from '../share/Popup'

import BaseScreen from './BaseScreen'
export default class XacNhanOrder extends BaseScreen {
    constructor(props) {
        super(props);
        let order = props.navigation.state.params.order;
        Helper.orderSetDefaultFoodModifyQuantities(order);
        this.state = {
            order,
        };
        this.dispatcher = this.props.navigation.state.params.dispatcher;
        this.eventDispatcher = this.createEventDispatcher();
    }

    dummy = () => {
        this.state = {
            confirmOrderList: DummyData.dummyConfirmOrderList(),
            totalMoney: 10000
        }
    };
    createEventDispatcher = () =>{
        let handle = (value,callObject) =>{
            this.forceUpdate();
        };
        let eventDispatcher = new EventDispatcher();
        eventDispatcher.registerEvent("refresh",handle);
        return eventDispatcher;

    };

    goBackToMenuOrder = () => {
        if(this.dispatcher !== undefined) this.dispatcher.dispatch("refresh");
        this.props.navigation.goBack();
    };
    cancelCreateOrder = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
        // let mainScreenKey = this.props.navigation.state.params.mainNavigation.state.key;
        // this.props.navigation.goBack(mainScreenKey);
    };
    createLeftBackButton = () => {
        return CommonComponent.createBackButton(this.goBackToMenuOrder);
    };
    createCancelButton = () => {
        return CommonComponent.createCancelButton(this.cancelCreateOrder);
    };
    updateOrder = () =>{
        let modifyFoodList = Helper.getModifyFoodList(this.state.order);
        Popup.showConfirm("Xác nhận","Bạn sẽ cập nhật lại các món sau vào order:" + JSON.stringify(modifyFoodList),
            ()=>{

            });
    };
    openOrderMenu = () =>{
        let navigation = this.props.navigation;
        navigation.navigate("MenuForCreateOrder",{
            isCreateOrder:true,
            order:this.state.order,
        })
    };
    createMenuOrderButton = () =>{
        return <Button style={styles.confirmBtn} rounded primary onPress={() => {
            this.openOrderMenu();
        }}>
            <Icon name='ios-add-outline'/>
        </Button>
    };

    render() {
        let count = 1;
        let arg = this.state.order.FoodWithOrders.map((e, i) => {

            // if (e.quantities === 0) return null;
            return <ConfirmOrderRow key={i}
                                    index={count++}
                                    food={e}
                                    dispatcher={this.dispatcher}
                                    eventDispatcher={this.eventDispatcher}/>
        });
        let backButton = this.createLeftBackButton();
        let cancelButton = this.createCancelButton();
        let addFoodOrderMenuBtn = this.createMenuOrderButton();
        this.state.totalMoney = Helper.calTotalMoneyToOrder(this.state.order);
        return (
            <Container>
                <Header>
                    <Left>
                        {backButton}
                    </Left>
                    <Body>
                    <Title>
                        Xác nhận
                    </Title>
                    </Body>
                    <Right>
                        {cancelButton}
                    </Right>
                </Header>
                <ScrollView style={styles.confirmOrderListScrV}>
                    {arg}
                </ScrollView>
                <View style={styles.totalMoneyView}>
                    <Text style={styles.totalMoneyTxt}>Tổng tiền:{this.state.order.BillMoney.format()} VNĐ </Text>
                </View>
                <View style={styles.confirmBtnRow}>
                    <Button style={CommonStyles.txtBtn} onPress={this.updateOrder} success>
                        <Text>
                            Cập nhật order
                        </Text>
                    </Button>
                </View>
                {addFoodOrderMenuBtn}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    confirmOrderListScrV: {
        flex: 1
    },
    totalMoneyView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    totalMoneyTxt: {},
    confirmBtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmBtn:{
        position:'absolute',
        right:10,
        bottom:70
    }
});