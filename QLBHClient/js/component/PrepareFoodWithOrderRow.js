import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Body,Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import PrepareFoodRow from '../component/PrepareFoodRow'

export default class PrepareFoodWithOrderRow extends Component {
    constructor(props){
        super(props);
        let orderWithPrepareFood = props.orderWithPrepareFood;
        this.prevDispatcher = props.dispatcher;
        this.state= {
            orderWithPrepareFood
        }
    }
    renderItem = (item) =>{
        return   <PrepareFoodRow
            prepareFood = {item}
            key={item.PrepareFoodId}
            dispatcher={this.prevDispatcher}
        />
    };

    render() {
        this.state.orderWithPrepareFood = this.props.orderWithPrepareFood;
        let arg = this.state.orderWithPrepareFood.prepareFoods.map((e,i)=>{
            return this.renderItem(e);
        });
        return (
            <View>
                <Text>Order {this.state.orderWithPrepareFood.orderId}</Text>
                <Text>Note: {this.state.orderWithPrepareFood.note}</Text>
                {arg}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});