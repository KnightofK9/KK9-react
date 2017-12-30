import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

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

    render() {
        return (
            <View style={[styles.container, {backgroundColor:DummyData.randomColor()}]}>
                {/*<Thumbnail square source={{uri: this.state.foodImage}} />*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'33.3%',
        height:128
    },
});