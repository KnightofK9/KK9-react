import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Container, Body, Title, Label, Button, Icon, Header, Content, Form, Item, Input} from 'native-base';
import OrderRow from '../component/OrderRow'
import DummyData from '../utilities/DummyData'

class DanhSachOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dummy();
    }

    dummy = () => {
        this.state = {
            orderRowList: DummyData.dummyOrderRowList()
        }
    };
    openMenuForCreateOrder = () =>{
        let mainNavigation = this.props.mainNavigation;
        mainNavigation.navigate("MenuForCreateOrder",{
            isCreateOrder:true
        })
    };
    render() {
        let orderArg = this.state.orderRowList.map((e, i) => {
            return <OrderRow key={e.orderId} orderId={e.orderId} tableId={e.tableId}/>
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
                <View style={styles.container}>
                    {orderArg}
                </View>
                <Button style={styles.createOrderBtn}  rounded primary onPress={()=>{
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
        flexDirection: 'column'
    },
    createOrderBtn: {
        position: 'absolute',
        right: 10,
        bottom: 70
    }
});
export default DanhSachOrder;