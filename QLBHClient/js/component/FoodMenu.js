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
        let categorizeName = props.categorizeName;
        let foodList = props.foodList;
        let isCreateOrder = props.isCreateOrder;
        this.state = {
            categorizeName,
            foodList,
            isCreateOrder,
        }
    }

    render() {
        let foodListArr = this.state.foodList.map((e, i) => {
            return <FoodBox dispatcher={this.props.dispatcher}
                            key={e.foodId}
                            isCreateOrder={this.state.isCreateOrder}
                            food = {e}/>
        });
        return (
            <View style={styles.container}>
                <Text>{this.state.categorizeName}</Text>
                <View style={styles.foodListContainer}>
                    {foodListArr}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    foodListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});