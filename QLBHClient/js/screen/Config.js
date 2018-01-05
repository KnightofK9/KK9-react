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
import RMHeader from "../component/RMHeader";

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
                <RMHeader headerTitle={"Cài đặt"}/>
                <View style={styles.content}>
                    <Button style={styles.logOutBtn} onPress={this.onLogoutPress}>
                        <Text style={styles.logoOutBtnText}>
                            Đăng xuất
                        </Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    logOutBtn:{
        width:120,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        alignSelf:"center",
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    logoOutBtnText:{
        color:"white"
    }
});