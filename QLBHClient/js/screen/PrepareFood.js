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
import PrepareFoodRow from '../component/PrepareFoodRow';
import DummyData from '../utilities/DummyData'
import * as Constant from '../share/Constant'
import BaseScreen from './BaseScreen'
import SessionManager from '../share/SessionManager'
import BackgroundService from "../share/BackgroundService";
import EventDispatcher from "../share/EventDispatcher";
import RMHeader from '../component/RMHeader'

export default class PrepareFood extends BaseScreen {
    constructor(props) {
        super(props);
        let prepareFoodList = SessionManager.getSession().getPrepareFoods();
        this.state = {
            prepareFoodList:prepareFoodList,
            refreshing:false
        };
        this.navigation = props.screenProps !== undefined ? props.screenProps.mainNavigation : props.navigation;
        this.loadScheduleHandle();
        this.createEventDispatcher();
        // this.dummy();
    }
    createEventDispatcher = () =>{
        let handle = (value)=>{
            // let prepareFoodList = SessionManager.getSession().getPrepareFoods();
            // this.setState({prepareFoodList});
            this.forceUpdate();
        };
        this.dispatcher =  new EventDispatcher();
        this.dispatcher.registerEvent("refresh",handle);
    };
    reloadPrepareFoodManually = () =>{
        BackgroundService.runServiceManually();
        this.refreshPrepareFood();
    };
    loadScheduleHandle = () => {
        let handle = (data) =>{
            this.setState({
                prepareFoodList:data.prepareFoods
            });
        };

        BackgroundService.addHandle(handle);

    };
    refreshPrepareFood = () =>{
        this.setState({
            prepareFoodList:SessionManager.getSession().getPrepareFoods()
        });
    };
    dummy = () => {
        this.state = {
            prepareFoodList:DummyData.dummyPrepareFoodList()
        }
    };
    renderItem = ({item})=>{
        return <PrepareFoodRow
            // key={item.PrepareFoodId}
                                prepareFood = {item}
                                dispatcher={this.dispatcher}
        />
    };
    handleUpdate = ()=>{

    };
    render() {
        return (
            <Container>
                <RMHeader headerTitle={"Chuẩn bị món ăn"}/>
                <Content>

                    <FlatList
                        style={styles.scrView}
                        data={this.state.prepareFoodList}
                        keyExtractor={(item) =>{return item.PrepareFoodId}}
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