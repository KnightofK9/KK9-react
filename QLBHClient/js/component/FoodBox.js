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

export default class FoodBox extends Component {
    constructor(props) {
        super(props);
        let foodId = props.foodId;
        let foodName = props.foodName;
        let foodImage = props.foodImage;
        let quantities = props.quantities;
        this.dispatcher = props.dispatcher;
        this.state = {
            foodId,
            foodName,
            foodImage,
            quantities,
        }
    }

    onFoodPress = () => {
        this.setFoodQuantities(1);
    };
    setFoodQuantities = (addValue) =>{
        this.setState(prev => {
            let updatedQuantities = prev.quantities + addValue;
            if(updatedQuantities < 0) updatedQuantities = 0;
            this.dispatcher.dispatch({
                foodId:this.state.foodId,
                quantities:updatedQuantities,
            },"update");
            return { quantities:updatedQuantities}
        })
    };
    onDropFoodPress = () =>{
        this.setFoodQuantities(-1);
    };
    isCreateOrder = () => {
        return this.props.isCreateOrder;
    };
    createFoodText = () => {
        let foodText = this.state.foodName;
        if (this.isCreateOrder()) foodText += ":" + this.state.quantities;
        return foodText;
    };

    render() {
        let foodText = this.createFoodText();
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onFoodPress}>
                    <CachedImage style={styles.imageButton} mutable
                                 source={{uri: this.state.foodImage}}
                    />
                </TouchableOpacity>
                <Text onPress={this.onDropFoodPress} style={styles.foodNameTxt}>
                    {foodText}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '33.3%',
    },
    imageButton: {
        width: 128,
        height: 128,
    },
    foodNameTxt: {},
});