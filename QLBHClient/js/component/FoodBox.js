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
import Helper from '../share/Helper'

export default class FoodBox extends Component {
    constructor(props) {
        super(props);
        let food = props.food;
        let foodInfo = props.foodInfo;
        let order = props.order;
        if (food === null || food === undefined) {
            food = Helper.createEmptyFoodWithOrder(foodInfo);
            if (order !== undefined) order.FoodWithOrders.push(food);
        }
        this.prevDispatcher = props.dispatcher;
        this.state = {
            food
        };
    }

    onFoodPress = () => {
        this.setFoodQuantities(1);
    };
    setFoodQuantities = (addValue) => {
        if (!this.isCreateOrder()) return;
        let previousQuantities = this.state.food.Quantities + this.state.food.ModifyQuantities;
        let updatedQuantities = previousQuantities + addValue;
        if (updatedQuantities < 0) updatedQuantities = 0;
        let different = updatedQuantities - previousQuantities;
        if (different !== 0) {
            // this.state.food.Quantities = updatedQuantities;
            this.state.food.ModifyQuantities += different;
            this.prevDispatcher.dispatch("refresh");
        }

    };
    onDropFoodPress = () => {
        this.setFoodQuantities(-1);
    };
    isCreateOrder = () => {
        return this.props.order !==  null && this.props.order !== undefined;
    };
    createFoodText = () => {
        let foodText = this.state.food.Food.Name;
        if (this.isCreateOrder()) foodText += ":" + (this.state.food.Quantities + this.state.food.ModifyQuantities);
        return foodText;
    };

    render() {
        let foodText = this.createFoodText();
        let imageId = this.state.food.Food.ImageId;
        let imageUrl = DummyData.dummyImage();
        if (imageId !== null) imageUrl = Helper.createUrlFromImageId(this.state.food.Food.ImageId);
        return (
            <View style={styles.container}>
                <View style={styles.contentShadow}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.imageContainer} onPress={this.onFoodPress}>
                            <CachedImage style={styles.imageButton} mutable
                                         source={{uri: imageUrl}}
                            />
                        </TouchableOpacity>
                        <Text onPress={this.onDropFoodPress} style={styles.foodNameTxt}>
                            {foodText}
                        </Text>
                    </View>
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
    contentShadow: {
        width: '90%',
        height: 190,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    content: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    imageButton: {
        flexDirection: 'column',
        height: '95%',
        width: '100%',
    },
    foodNameTxt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 0,
    },
    imageContainer: {
        flex: 1,
        // clip: '',
    },
});