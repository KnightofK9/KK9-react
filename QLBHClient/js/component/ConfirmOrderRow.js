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
        let food = props.food;
        let index = props.index;
        this.state = {
            food,
            index,
        };
        this.dispatcher = props.dispatcher;
        this.eventDispatcher = props.eventDispatcher;
    }

    addValueToQuantities = (addValue) => {
        let oldQuantities = this.state.food.quantities;
        let updatedQuantities = oldQuantities + addValue;
        if (updatedQuantities < 0) updatedQuantities = 0;
        let different = updatedQuantities - oldQuantities;
        if (different !== 0) {
            this.state.food.quantities = updatedQuantities;
            this.eventDispatcher.dispatch("refresh");
            // this.dispatcher.dispatch("refresh");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.indexTxt}>{this.state.index}</Text>
                <Text style={styles.foodNameTxt}>{this.state.food.foodName}</Text>
                <Text>{this.state.food.foodPrice.format()} đ</Text>
                <Button transparent onPress={() => {
                    this.addValueToQuantities(-1);
                }}>
                    <Icon name='ios-arrow-dropdown'/>
                </Button>
                <Text>
                    {this.state.food.quantities}
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