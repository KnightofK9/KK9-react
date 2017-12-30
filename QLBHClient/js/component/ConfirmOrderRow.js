import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class ConfirmOrderRow extends Component {
    constructor(props) {
        super(props);
        let foodId = props.foodId;
        let foodName = props.foodName;
        let quantities = props.quantities;
        let index = props.index;
        this.state = {
            foodId,
            foodName,
            quantities,
            index,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.indexTxt} >{this.state.index}</Text>
                <Text style={styles.foodNameTxt} >{this.state.foodName}</Text>
                <Button transparent>
                    <Icon name='ios-arrow-dropdown' />
                </Button>
                <Text>
                    {this.state.quantities}
                </Text>
                <Button transparent>
                    <Icon name='ios-arrow-dropup' />
                </Button>
                <Button danger>
                    <Icon name='ios-trash' />
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
    indexTxt:{
      width:20
    },
    foodNameTxt:{
        flex:1
    }
});