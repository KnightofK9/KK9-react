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

class DanhSachOrder extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            orderRowList:[]
        };
        this.getAndParseUnpayOrder();
        // this.dummy();
    }
    getAndParseUnpayOrder = () =>{
        Network.getAllUnpayOrder((err,data,result)=>{
            if(err) {
                console.log(err);
                return;
            }
            this.setState({
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
            return <OrderRow navigation={this.props.navigation} key={e.OrderId} order={e}/>
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