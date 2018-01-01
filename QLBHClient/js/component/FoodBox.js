import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {CachedImage} from "react-native-img-cache";
import {Container, Thumbnail, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import DummyData from '../utilities/DummyData'
import PropertyDispatcher from '../share/PropertyDispatcher'

export default class FoodBox extends Component {
    constructor(props) {
        super(props);
        let food = props.food;
        this.dispatcher = props.dispatcher;
        this.state = {
            food
        };
    }

    onFoodPress = () => {
        this.setFoodQuantities(1);
    };
    setFoodQuantities = (addValue) => {
        let updatedQuantities = this.state.food.quantities + addValue;
        if (updatedQuantities < 0) updatedQuantities = 0;
        this.state.food.quantities = updatedQuantities;
        this.dispatcher.dispatch("refresh");
    };
    onDropFoodPress = () => {
        this.setFoodQuantities(-1);
    };
    isCreateOrder = () => {
        return this.props.isCreateOrder;
    };
    createFoodText = () => {
        let foodText = this.state.food.foodName;
        if (this.isCreateOrder()) foodText += ":" + this.state.food.quantities;
        return foodText;
    };

    render() {
        let foodText = this.createFoodText();
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this.onFoodPress}>
                        <CachedImage style={styles.imageButton} mutable
                                     source={{uri: this.state.food.foodImage}}
                        />
                    </TouchableOpacity>
                    <Text onPress={this.onDropFoodPress} style={styles.foodNameTxt}>
                        {foodText}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: 200,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        width: '90%',
        height: 190,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageButton: {
        flexDirection: 'column',
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    foodNameTxt: {
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
});