import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    PickerIOS,
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
    Picker,
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
import SessionManager from '../share/SessionManager'

import BaseScreen from './BaseScreen'
export default class XacNhanOrder extends BaseScreen {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        let order = this.navigation.state.params.order;
        Helper.orderSetDefaultFoodModifyQuantities(order);
        this.state = {
            order,
        };
        if(this.navigation.state.params !== undefined){
            this.prevDispathcer = this.navigation.state.params.dispatcher;
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
        this.navigation.goBack();
    };
    goBackToMain = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.navigation.dispatch(resetAction);
    };
    isFromUpdateOrder = () =>{
        return this.state.order.OrderId !== null;
    };
    isFromCreateOrder = () =>{
        return !this.isFromUpdateOrder();
    };
    createLeftBackButton = () => {
        let f = this.goBackToMenuOrder;
        return CommonComponent.createBackButton(f);
    };
    createCancelButton = () => {

        let f = this.goBackToMain;
        if(this.isFromUpdateOrder()) f= this.goBackToMenuOrder;
        return CommonComponent.createCancelButton(f);
    };
    updateOrder = () =>{
        let informText = null;
        let onConfirm = null;
        if(this.isFromUpdateOrder()) {
            informText = Helper.getTextForUpdateOrder(this.state.order);
            onConfirm = this.doUpdateOrder;
        }
        else {
            informText = Helper.getTextForCreateOrder(this.state.order);
            onConfirm = this.doCreateOrder;
        }
        Popup.showConfirm(informText.title,informText.body,
            onConfirm);
    };
    doCreateOrder = () =>{
        let foodWithOrderList = Helper.getFoodWithOrderList(this.state.order);
        let tableId = this.state.order.TableId;
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
        let navigation = this.navigation;
        navigation.navigate("MenuForCreateOrder",{
            dispatcher:this.dispatcher,
            order:this.state.order,
        })
    };
    createMenuOrderButton = () =>{
        if(!this.isFromUpdateOrder()) return null;
        return <Button style={styles.confirmBtn} rounded primary onPress={() => {
            this.openOrderMenu();
        }}>
            <Icon name='ios-add-outline'/>
        </Button>
    };
    createTableText = () =>{
        let tableId = this.state.order.TableId;
        if(!this.isFromUpdateOrder()) return null;
        return <View style={{flexDirection:"row",alignSelf:"center"}}>
            <Text style={styles.totalMoneyTitle}>Bàn số </Text>
            <Text >{tableId}</Text>
        </View>
    };
    createTablePicker = () =>{
        let tableList = SessionManager.getSession().getTables();
        let tableArg = tableList.map((e,i)=>{
           return <Picker.Item key={e.TableId} label={"Bàn số: "+ e.TableId.toString()} value={e.TableId} />
        });
        let defaultTableId = this.state.order.TableId !== null ? this.state.order.TableId : tableList[0].TableId;
        return <Picker
            placeholder="Chọn số bàn"
            iosHeader="Chọn số bàn"
            mode="dropdown"
            headerBackButtonText={"Quay lại"}
            selectedValue={this.state.order.TableId}
            style={styles.tablePicker}
            textStyle={styles.tablePickerItem}
            onValueChange={(tableId)=>{
            let order = Object.assign({},this.state.order,{TableId:tableId});
            this.setState({
                order
            })}
        }>
            {tableArg}
        </Picker>
    };
    selectTableIdBox = () =>{
        if(!this.isFromUpdateOrder()) return this.createTablePicker();
        return this.createTableText();
    };
    isConfirmAbleToClick = () =>{
        let modifyFoods = Helper.getModifyFoodList(this.state.order);
        return modifyFoods.length !== 0;
    };
    createConfirmBtn = ()=>{
        let isAbleToClick = this.isConfirmAbleToClick();
        return <View style={styles.confirmBtnRow}>
            <Button style={[CommonStyles.txtBtn]} onPress={this.updateOrder}
                    primary={isAbleToClick}
                    light={!isAbleToClick}
                    disabled={!isAbleToClick}
            >
                <Text style={{fontWeight: 'bold', color:'white'}}>
                    CẬP NHẬT
                </Text>
            </Button>
        </View>
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
        let tableBox = this.selectTableIdBox();
        let confirmBtn = this.createConfirmBtn();
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
                {tableBox}
                <View style={styles.totalMoneyView}>
                    <Text style={styles.totalMoneyTitle}>Tổng tiền: </Text>
                    <Text style={styles.totalMoneyTxt}>{this.state.order.BillMoney.format()} đ </Text>
                </View>
                {confirmBtn}
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
        marginBottom: 10,
    },
    totalMoneyTitle: {
        fontWeight: 'bold',
    },
    totalMoneyTxt: {
        fontWeight: 'bold',
        color: 'rgb(255,160,0)',
    },
    confirmBtnRow: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmBtn:{
        position:'absolute',
        right:10,
        bottom:70,
    },
    tablePicker:{
        // width:50
        alignSelf:"center"
    },
    tableText:{
        alignSelf:"center"
    },
    tablePickerItem:{
        fontSize:14
    }


});