import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import {NavigationActions} from 'react-navigation'
import BaseScreen from './BaseScreen'
import SessionManager from '../share/SessionManager'

export default class Config extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {};
        this.navigation = props.screenProps !== undefined ? props.screenProps.mainNavigation : props.navigation;
    }
    onLogoutPress = () =>{
        SessionManager.logout(()=>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login'})
                ]
            });
            this.navigation.dispatch(resetAction);
        })
    };
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Cài đặt
                    </Title>
                    </Body>
                </Header>
                <Content>
                    <Button onPress={this.onLogoutPress}>
                        <Text>
                            Đăng xuất
                        </Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});