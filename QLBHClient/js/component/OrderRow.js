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
import Popup from '../share/Popup'

export default class OrderRow extends Component {
    constructor(props) {
        super(props);
        let order = props.order;
        this.state = {
            order
        };
        this.prevDispatcher = props.dispatcher;
    }

    goToOrder = () => {
        Network.getOrderById(this.state.order.OrderId,(err,data,resonse)=>{
            if(err) return;
            this.props.navigation.navigate("ConfirmCreateOrder",{
                order: data,
            })
        });
    };
    onCancelOrderClick = () =>{
        let orderId = this.state.order.OrderId;
        Popup.showConfirm("Xác nhận","Bạn có muốn xóa order "+orderId,()=>{
            Network.cancelOrder(orderId,(err,data,response) =>{
                if(!err) Popup.showSuccess(()=>{
                    this.prevDispatcher.dispatch("remove",orderId);
                })
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
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-start', marginTop:5}}>
                        <Icon name='restaurant' style={{fontSize: 30, color: '#f9b045'}} active={true}/>
                        <Text style={[styles.tableTxtBox, {alignSelf:'center'}]}>
                            {this.state.order.TableId}
                        </Text>
                    </View>
                </View>
                {/*<Button onPress={this.onCancelOrderClick} style={styles.button} transparent dark>*/}
                    {/*<Icon name='ios-trash'/>*/}
                {/*</Button>*/}
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
        marginTop: 12,
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
        fontWeight: 'bold',
    },
    tableTxtBox: {
        marginLeft: 10,
    },
    button: {
        height: 70,
        width: 50,
        opacity: 0.5,
    }
});