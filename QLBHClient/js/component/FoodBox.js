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
import {Container,Thumbnail, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import DummyData from '../utilities/DummyData'
export default class FoodBox extends Component {
    constructor(props){
        super(props);
        let foodId = props.foodId;
        let foodName = props.foodName;
        let foodImage = props.foodImage;
        this.state= {
            foodId,
            foodName,
            foodImage
        }
    }
    onFoodPress = ()=>{

    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onFoodPress}>
                    <CachedImage style={styles.imageButton} mutable
                        source={{uri:this.state.foodImage}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'33.3%',
        height:128
    },
    imageButton:{
        width:'100%',
        height:'100%',
    },
});