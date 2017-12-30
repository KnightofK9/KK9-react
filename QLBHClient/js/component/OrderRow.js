import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class OrderRow extends Component {
    constructor(props) {
        super(props);
        let orderId = props.orderId;
        let tableId = props.tableId;
        let orderName = "Order " + orderId;
        this.state = {
            orderName, orderId, tableId
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textBox}>
                    {this.state.orderName}
                </Text>
                <Button transparent dark>
                    <Icon name='ios-cog' />
                </Button>
                <Button transparent dark>
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
    textBox:{
        flex:1
    }
});