import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class ConfirmOrderRow extends Component {
    constructor(props) {
        super(props);
        let foodId = props.foodId;
        let foodName = props.foodName;
        let quantities = props.quantities;
        let index = props.index;
        this.state = {
            foodId,
            foodName,
            quantities,
            index,
        };
        this.dispatcher = props.dispatcher;
        this.dispatcherDict = props.dispatcherDict;
    }

    addValueToQuantities = (addValue) => {
        this.setState(prev => {
            let updatedQuantities = prev.quantities + addValue;
            if(updatedQuantities < 0) updatedQuantities = 0;
            this.dispatcher.dispatch({
                foodId:this.state.foodId,
                quantities:updatedQuantities,
            },"update");
            this.dispatcherDict.dispatch(this.state.foodId.toString(),updatedQuantities,"update");
            return { quantities:updatedQuantities}
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.indexTxt}>{this.state.index}</Text>
                <Text style={styles.foodNameTxt}>{this.state.foodName}</Text>
                <Button transparent onPress={()=>{
                    this.addValueToQuantities(-1);
                }}>
                    <Icon name='ios-arrow-dropdown'/>
                </Button>
                <Text>
                    {this.state.quantities}
                </Text>
                <Button transparent onPress={()=>{
                    this.addValueToQuantities(1);
                }}>
                    <Icon name='ios-arrow-dropup'/>
                </Button>
                <Button dange >
                    <Icon name='ios-trash'/>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    indexTxt: {
        width: 20
    },
    foodNameTxt: {
        flex: 1
    }
});