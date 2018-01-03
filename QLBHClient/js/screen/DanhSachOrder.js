import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import BaseScreen from './BaseScreen'
import {Container, Body, Title, Label, Button, Icon, Header, Content, Form, Item, Input} from 'native-base';
import OrderRow from '../component/OrderRow'
import CommonStyles from '../share/CommonStyles'
import DummyData from '../utilities/DummyData'
import Network from '../share/Network'
import Helper from '../share/Helper'
import EventDispatcher from '../share/EventDispatcher'

class DanhSachOrder extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            orderRowList:[]
        };
        // this.getAndParseUnpayOrder();
        this.dispatcher = this.createEventDispatcher();
        // this.dummy();
    }
    createEventDispatcher = () =>{
        let reloadHandle = (value,callObject) =>{
            this.getAndParseUnpayOrder();
        };
        let refreshHandle = (value,callObject) =>{
            this.forceUpdate();
        };
        let removeHandle = (orderId,callObject) =>{
            this.setState({orderRowList:this.state.orderRowList.filter(k=> k.OrderId !== orderId)});
        };
        let dispatcher = new EventDispatcher();
        dispatcher.registerEvent("reload",reloadHandle);
        dispatcher.registerEvent("refresh",refreshHandle);
        dispatcher.registerEvent("remove",removeHandle);
        return dispatcher;
    };
    getAndParseUnpayOrder = () =>{
        Network.getAllUnpayOrder((err,data,result)=>{
            if(!err) this.setState({
                orderRowList: data,
            })

        });
    };
    dummy = () => {
        this.state = {
            orderRowList: DummyData.dummyOrderRowList()
        }
    };
    openMenuForCreateOrder = () =>{
        let navigation = this.props.navigation;
        let order = Helper.createEmptyOrder();
        navigation.navigate("MenuForCreateOrder",{
            order:order,
            navigation:navigation,
        })
    };
    render() {
        let orderArg = this.state.orderRowList.map((e, i) => {
            return <OrderRow dispatcher={this.dispatcher} navigation={this.props.navigation} key={e.OrderId} order={e}/>
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Danh sách Order
                    </Title>
                    </Body>
                </Header>
                <ScrollView style={styles.container}>
                    {orderArg}
                </ScrollView>
                <Button style={CommonStyles.fabOrderBtn}  rounded primary onPress={()=>{
                    this.openMenuForCreateOrder();
                }}>
                    <Icon name='ios-add-outline'/>
                </Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
});
export default DanhSachOrder;