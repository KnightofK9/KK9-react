import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
} from 'react-native';
import {Container, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import PrepareFoodWithOrderRow from '../component/PrepareFoodWithOrderRow';
import DummyData from '../utilities/DummyData'
import * as Constant from '../share/Constant'
import BaseScreen from './BaseScreen'
import SessionManager from '../share/SessionManager'
import BackgroundService from "../share/BackgroundService";
import EventDispatcher from "../share/EventDispatcher";
import RMHeader from '../component/RMHeader'

export default class PrepareFoodWithOrder extends BaseScreen {
    constructor(props) {
        super(props);
        let orderWithPrepareFoods = SessionManager.getSession().getOrderWithPrepareFoods();
        this.state = {
            orderWithPrepareFoods:orderWithPrepareFoods,
            showAll:false
        };
        this.navigation = props.screenProps !== undefined ? props.screenProps.mainNavigation : props.navigation;
        this.loadScheduleHandle();
        this.createEventDispatcher();
    }
    createEventDispatcher = () =>{
        let handle = (value)=>{
            this.forceUpdate();
        };
        this.dispatcher =  new EventDispatcher();
        this.dispatcher.registerEvent("refresh",handle);
    };
    loadScheduleHandle = () => {
        let handle = (data) =>{
            let setData = null;
            if(this.state.showAll) {
                setData = data.orderWithPrepareFoods;
            }else{
                setData = SessionManager.getSession().filterOrderWithPrepareFoods(data.orderWithPrepareFoods);
            }
            this.setState({
                orderWithPrepareFoods:setData
            });
        };

        BackgroundService.addHandle(handle);

    };
    renderItem = ({item})=>{
        return <PrepareFoodWithOrderRow
            orderWithPrepareFood = {item}
                                dispatcher={this.dispatcher}
        />
    };
    render() {
        return (
            <Container>
                <RMHeader headerTitle={"Chuẩn bị món ăn"}/>
                <Content>

                    <FlatList
                        style={styles.scrView}
                        data={this.state.orderWithPrepareFoods}
                        keyExtractor={(item) =>{return item.orderId}}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        // refreshing = {this.state.refreshing}
                        // onRefresh={this.handleUpdate}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    scrView:{
        flex:1
    }
});