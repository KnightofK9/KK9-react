import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import {Container, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import FoodBox from './FoodBox'

export default class FoodMenu extends Component {
    constructor(props) {
        super(props);
        let foodCategorize = props.foodCategorize;
        let order = props.order;
        this.state = {
            foodCategorize,
            order,
        }
    }
    isCreateOrder = () =>{
        return this.state.order !== undefined && this.state.order !== null;
    };
    render() {
        let foodListArr = this.state.foodCategorize.Foods.map((e, i) => {
            let orderFood = null;
            if(this.isCreateOrder()) orderFood = this.state.order.FoodWithOrders.find(k => k.FoodId === e.FoodId);
            return <FoodBox dispatcher={this.props.dispatcher}
                            key={e.FoodId}
                            foodInfo = {e}
                            order = {this.state.order}
                            food = {orderFood}/>
        });
        return (
            <View style={styles.container}>
                <View style={styles.foodCategoryHeaderView}>
                    <Text style={styles.foodCategoryHeaderTitle}>{this.state.foodCategorize.Name}</Text>
                </View>
                <View style={styles.foodListContainer}>
                    {foodListArr}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    foodCategoryHeaderView: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    foodCategoryHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft : 10,
    },
    foodListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});