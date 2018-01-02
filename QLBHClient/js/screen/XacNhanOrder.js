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
import Network from '../share/Network'

import BaseScreen from './BaseScreen'
export default class XacNhanOrder extends BaseScreen {
    constructor(props) {
        super(props);
        let order = props.navigation.state.params.order;
        Helper.orderSetDefaultFoodModifyQuantities(order);
        this.state = {
            order,
        };
        if(this.props.navigation.state.params !== undefined){
            this.prevDispathcer = this.props.navigation.state.params.dispatcher;
        }
        this.dispatcher = this.createEventDispatcher();
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
        if(this.prevDispathcer !== undefined) this.prevDispathcer.dispatch("refresh");
        this.props.navigation.goBack();
    };
    goBackToMain = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };
    isFromCreatedOrder = () =>{
        return this.state.order.OrderId === null;
    };
    createLeftBackButton = () => {
        let f = this.goBackToMenuOrder;
        return CommonComponent.createBackButton(f);
    };
    createCancelButton = () => {

        let f = this.goBackToMain;
        if(!this.isFromCreatedOrder()) f= this.goBackToMenuOrder;
        return CommonComponent.createCancelButton(f);
    };
    updateOrder = () =>{
        let modifyFoodList = Helper.getModifyFoodList(this.state.order);
        Popup.showConfirm("Xác nhận","Bạn sẽ cập nhật lại các món sau vào order:" + JSON.stringify(modifyFoodList),
            ()=>{
                if(this.isFromCreatedOrder()) {
                    this.doCreateOrder();
                }else{
                    this.doUpdateOrder();
                }
            });
    };
    doCreateOrder = () =>{
        let foodWithOrderList = Helper.getFoodWithOrderList(this.state.order);
        let tableId = 1;
        //TODO dummy table Id
        Network.createOrder(tableId,foodWithOrderList,(err,data,response)=>{
            if(!err) Popup.showSuccess(()=>{
                this.goBackToMain();
            });
        });
    };
    doUpdateOrder = () =>{
        let foodWithOrderList = Helper.getFoodWithOrderList(this.state.order);
        let orderId = this.state.order.OrderId;
        Network.updateOrder(orderId,foodWithOrderList,(err,data,response)=>{
            if(!err) Popup.showSuccess(()=>{
                this.goBackToMain();
            });
        });
    };
    openOrderMenu = () =>{
        let navigation = this.props.navigation;
        navigation.navigate("MenuForCreateOrder",{
            dispatcher:this.dispatcher,
            order:this.state.order,
        })
    };
    createMenuOrderButton = () =>{
        if(this.isFromCreatedOrder()) return null;
        return <Button style={styles.confirmBtn} rounded primary onPress={() => {
            this.openOrderMenu();
        }}>
            <Icon name='ios-add-outline'/>
        </Button>
    };

    render() {
        let count = 1;
        let arg = this.state.order.FoodWithOrders.map((e, i) => {

            if (e.Quantities + e.ModifyQuantities === 0 && e.ModifyQuantities === 0) return null;
            return <ConfirmOrderRow key={i}
                                    index={count++}
                                    food={e}
                                    dispatcher={this.dispatcher}
            />
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