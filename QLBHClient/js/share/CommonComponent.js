import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
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
import Helper from './Helper'

export default class CommonComponent {
    static createBackButton = (callback,conditionCheck = true) => {
        if(!Helper.isConditionAccepted(conditionCheck)) return null;
        return <Button transparent onPress={() => {
            callback();
        }}>
            <Icon name="arrow-back"/>
        </Button>
    };
    static createCancelButton = (callback,conditionCheck = true) => {
        if(!Helper.isConditionAccepted(conditionCheck)) return null;
        return <Button transparent onPress={() => {
            callback();
        }}>
            <Icon name="md-close"/>
        </Button>
    };
    static createFunctionIcon = (iconName) =>{
        return (arg) =>{
            let focused = arg.focused;
            let tintColor = arg.tintColor;
            return <Icon active={focused} style={{color:tintColor}} name={iconName}/>
        };

    }
}