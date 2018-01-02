import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Network from "../share/Network"
import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class OrderRow extends Component {
    constructor(props) {
        super(props);
        let order = props.order;
        this.state = {
            order
        }
    }

    goToOrder = () => {
        Network.getOrderById(this.state.order.OrderId,(err,data,resonse)=>{
            if(err) return;
            this.props.navigation.navigate("ConfirmCreateOrder",{
                order: data,
            })
        });
    };

    render() {
        return (
            <TouchableOpacity onPress={this.goToOrder} style={[styles.container]}>
                <View style={styles.content}>
                    <Text style={styles.orderTxtBox}>
                        Order {this.state.order.OrderId}
                    </Text>
                    <Text style={styles.tableTxtBox}>
                        Table {this.state.order.TableId}
                    </Text>
                </View>
                <Button style={styles.button} transparent dark>
                    <Icon name='ios-trash'/>
                </Button>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        height: 70,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        backgroundColor: 'white',
    },
    content: {
        flexDirection: 'column',
        marginLeft: 20,
        marginTop: 10,
        flex: 1,
    },
    orderTxtBox: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableTxtBox: {
        flex: 2,
        marginTop: 10,
    },
    button: {
        height: 70,
        width: 50,
        opacity: 0.5,
    }
});