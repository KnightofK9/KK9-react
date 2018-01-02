import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {
    Container,
    Icon,
    Body,
    Left,
    Right,
    Title,
    Label,
    Button,
    Header,
    Content,
    Form,
    Item,
    Input
} from 'native-base';
import FoodMenu from '../component/FoodMenu'
import DummyData from '../utilities/DummyData'
import CommonStyles from '../share/CommonStyles'
import CommonComponent from '../share/CommonComponent'
import PropertyDispatcher from '../share/PropertyDispatcher'
import PropertyDispatcherDict from '../share/PropertyDispatcherDict'
import EventDispatcher from '../share/EventDispatcher'
import BaseScreen from './BaseScreen'
import Network from '../share/Network'
import Helper from '../share/Helper'

export default class Menu extends BaseScreen {
    constructor(props) {
        super(props);
        let order = undefined;
        if(this.props.navigation.state.params !== undefined){
            let params = this.props.navigation.state.params;
            this.prevDispathcer = params.dispatcher;
            order = params.order;
        }
        this.state = {
            order,
            foodCategorizes:[]
        };
        // this.initDataForOrder();
        this.loadAndParseFoodCategorize();
        // this.dummy();
        this.dispatcher = this.createEventDispatcher();
    }
    initDataForOrder = (order) =>{
        if(order === undefined) return;
        Helper.setDefaultFoodWithOrder(order);
    };
    loadAndParseFoodCategorize = () =>{
        let foodCategorizes = null;
        Network.getAllCategoryWithFood((err,result,response)=>{
            this.setState({
                foodCategorizes:result
            })
        });
    };
    dummy = () => {
        this.state = {...DummyData.dummyFoodList()}
    };
    isCreateOrder = () => {
        return (this.state.order !== null && this.state.order !== undefined);
    };
    isUpdateOrder = () =>{
        return (this.isCreateOrder()&& this.state.order.OrderId !== null);
    };
    goBackToCreateOrder = () => {
        // if(this.isUpdateOrder()) Helper.removeEmptyFoodFromOrder(this.state.order);
        if(this.prevDispathcer !== undefined) this.prevDispathcer.dispatch("refresh");
        this.props.navigation.goBack();
    };
    createLeftBackButton = () => {
        return CommonComponent.createBackButton(this.goBackToCreateOrder,this.isCreateOrder);
    };

    cancelCreateMenu = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };
    createCancelButton = () => {
        return CommonComponent.createCancelButton(this.goBackToCreateOrder, !this.isUpdateOrder);
    };
    openConfirmOrder = () =>{
        let order = this.state.order;
        // Helper.removeEmptyFoodFromOrder(order);
        this.props.navigation.navigate('ConfirmCreateOrder',{
            order:order,
            dispatcher:this.dispatcher,
    });
    };
    createConfirmOrderButton = () =>{
        if(!(this.isCreateOrder() && !this.isUpdateOrder())) return null;
        return <Button style={styles.confirmBtn} rounded primary onPress={() => {
            this.openConfirmOrder();
        }}>
            <Icon name='ios-add-outline'/>
        </Button>
    };
    createEventDispatcher = ()=>{
        let handler = (value,callObject) =>{
            this.forceUpdate();
        };
        let eventDispatcher = new EventDispatcher();
        eventDispatcher.registerEvent("refresh",handler);
        return eventDispatcher;
    };
    render() {
        let backButton = this.createLeftBackButton();
        let cancelButton = this.createCancelButton();
        let confirmOrderButton = this.createConfirmOrderButton();
        let arg = this.state.foodCategorizes.map((e,i)=>{
            return <FoodMenu key={e.FoodCategorizeId} dispatcher={this.dispatcher} order={this.state.order} foodCategorize={e}/>
        });
        return (
            <Container>
                <Header>
                    <Left>{backButton}</Left>
                    <Body>
                    <Title>
                        Menu
                    </Title>
                    </Body>
                    <Right>{cancelButton}</Right>
                </Header>
                <ScrollView style={styles.foodScrView}>
                    {arg}
                </ScrollView>
                {confirmOrderButton}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    foodScrView: {
        flex: 1,
    },
    confirmBtn:{
        position:'absolute',
        right:10,
        bottom:70
    }
});