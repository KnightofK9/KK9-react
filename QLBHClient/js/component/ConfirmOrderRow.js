import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import Helper from '../share/Helper'

export default class ConfirmOrderRow extends Component {
    constructor(props) {
        super(props);
        let foodId = props.foodId;
        let foodName = props.foodName;
        let quantities = props.quantities;
        let foodPrice = props.foodPrice;
        let index = props.index;
        this.state = {
            foodId,
            foodName,
            quantities,
            foodPrice,
            index,
        };
        this.dispatcher = props.dispatcher;
        this.dispatcherDict = props.dispatcherDict;
        // this.totalMoneyDispatcher = props.totalMoneyDispatcher;
        this.eventDispatcher = props.eventDispatcher;
    }

    addValueToQuantities = (addValue) => {
        let oldQuantities = this.state.quantities;
        let updatedQuantities = oldQuantities + addValue;
        if (updatedQuantities < 0) updatedQuantities = 0;
        let different = updatedQuantities - oldQuantities;
        if (different !== 0) {

            // this.setState(prev => {
            //     return {quantities: updatedQuantities}
            // });
            this.state.quantities = updatedQuantities;
            // let updatedFoodPrice = this.state.foodPrice * different;
            // this.totalMoneyDispatcher.dispatch(0, "add");
            this.eventDispatcher.dispatch("refresh");
            this.dispatcher.dispatch({
                foodId: this.state.foodId,
                quantities: updatedQuantities,
            }, "update");
            this.dispatcherDict.dispatch(this.state.foodId.toString(), updatedQuantities, "update");


        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.indexTxt}>{this.state.index}</Text>
                <Text style={styles.foodNameTxt}>{this.state.foodName}</Text>
                <Text>{this.state.foodPrice.format()} đ</Text>
                <Button transparent onPress={() => {
                    this.addValueToQuantities(-1);
                }}>
                    <Icon name='ios-arrow-dropdown'/>
                </Button>
                <Text>
                    {this.state.quantities}
                </Text>
                <Button transparent onPress={() => {
                    this.addValueToQuantities(1);
                }}>
                    <Icon name='ios-arrow-dropup'/>
                </Button>
                {/*<Button dange>*/}
                    {/*<Icon name='ios-trash'/>*/}
                {/*</Button>*/}
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