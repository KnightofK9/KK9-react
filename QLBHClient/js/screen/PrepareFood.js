import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import {Container, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import PrepareFoodRow from '../component/PrepareFoodRow';
import DummyData from '../utilities/DummyData'
import * as Constant from '../share/Constant'
import BaseScreen from './BaseScreen'
import SessionManager from '../share/SessionManager'
import BackgroundService from "../share/BackgroundService";
export default class PrepareFood extends BaseScreen {
    constructor(props) {
        super(props);
        let prepareFoodList = SessionManager.getSession().getPrepareFoods();
        this.state = {
            prepareFoodList:prepareFoodList
        };
        // this.dummy();
    }
    reloadPrepareFoodManually = () =>{
        BackgroundService.runServiceManually();
        this.refreshPrepareFood();
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

    render() {
        let arg = this.state.prepareFoodList.map((e,i)=>{
           return <PrepareFoodRow key={e.PrepareFoodId}
                                  prepareFood = {e}
           />
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Chuẩn bị món ăn
                    </Title>
                    </Body>
                </Header>
                <Content>
                    <ScrollView style={styles.scrView}>
                        {arg}
                    </ScrollView>
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