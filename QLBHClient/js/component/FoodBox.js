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
import LinearGradient from 'react-native-linear-gradient';

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
        if (this.isCreateOrder()) foodText += ": " + (this.state.food.Quantities + this.state.food.ModifyQuantities);
        return foodText;
    };
    createFoodPrice = () => {
        let foodText = this.state.food.Food.Price + " đ";
        return foodText;
    };

    render() {
        if(this.props.food !== undefined && this.props.food !== null) this.state.food = this.props.food;
        let foodText = this.createFoodText();
        let foodPrice = this.createFoodPrice();
        let imageId = this.state.food.Food.ImageId;
        let imageUrl = Helper.createUrlFromImageId(this.state.food.Food.ImageId);
        return (
            <TouchableOpacity style={styles.container} onPress={this.onFoodPress}>
                <View style={styles.contentShadow}>
                    <View style={styles.content}>

                        <View style={styles.imageContainer} >
                            <CachedImage style={styles.imageButton} mutable
                                         source={{uri: imageUrl}}
                            />
                        </View>
                        <Text style={styles.foodNameTxt}>
                            {foodText}
                        </Text>
                        <View style={styles.foodInfoView}>
                            <View style={styles.foodPriceView}>
                                <Text style={styles.foodPrice}>
                                    {foodPrice}
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.foodInfo, {marginTop: 8, fontWeight: 'bold'}]}>
                                    15
                                </Text>
                                <Text style={[styles.foodInfo, {marginTop: 8, marginLeft: 0}]}>
                                    {" phút"}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.foodInfo, {marginTop: 8, fontWeight: 'bold'}]}>
                                    200
                                </Text>
                                <Text style={[styles.foodInfo, {marginTop: 8, marginLeft: 0}]}>
                                    {" kcal"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
        borderRadius: 16,
        backgroundColor: 'white',
    },
    content: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        flexDirection: 'column',
        backgroundColor: 'white',
        // overflow: 'hidden',
    },
    imageButton: {
        flexDirection: 'column',
        top: '37.5%',
        height: '57.5%',
        width: '100%',
        marginLeft:'30%',
        resizeMode: 'contain',
    },
    foodNameTxt: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        // marginBottom: 10,
        // marginTop: 0,
        position: 'absolute',
        top: 8,
        marginLeft: 8,
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 17,
        color: 'black',
        // textShadowColor: 'black',
        // textShadowOffset: {width: 1, height: 1},
        // textShadowRadius: 2,
    },
    foodInfo: {
        fontWeight: '100',
        marginTop: 5,
        marginLeft: 5,
        fontSize: 12,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
    },
    foodPrice: {
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontWeight: 'bold',
        // marginLeft: 5,
        // marginTop: 10,
    },
    linearGradient: {
        opacity: 0.5,
        width: '100%',
        height: '70%',
        position: 'absolute',
    },
    foodInfoView: {
        flexDirection: 'column',
        width: '100%',
        top: '15%',
        height: '75%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        // alignItems:'flex-end',
    },
    foodPriceView: {
        flexDirection: 'row',
        width: '55%',
        left: -5,
        marginTop:5,
        height: 30,
        backgroundColor: '#f9b045',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // foodPriceView: {
    //     flexDirection: 'row',
    //     width: '55%',
    //     left: -7,
    //     top: '15%',
    //     height: 30,
    //     position: 'absolute',
    //     backgroundColor: '#f9b045',
    //     borderRadius: 4,
    //     shadowColor: '#000',
    //     shadowOffset: {width: 1, height: 2},
    //     shadowOpacity: 0.4,
    //     shadowRadius: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
    },
});