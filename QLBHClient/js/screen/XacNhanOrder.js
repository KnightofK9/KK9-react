import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import {Container, Body, Title, Label, Button, Icon, Header, Content, Form, Item, Input} from 'native-base';
import DummyData from '../utilities/DummyData'
import ConfirmOrderRow from '../component/ConfirmOrderRow'
import CommonStyles from '../share/CommonStyles'

export default class XacNhanOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dummy();
    }

    dummy = () => {
        this.state = {
            confirmOrderList: DummyData.dummyConfirmOrderList(),
            totalMoney:10000
        }
    };

    render() {
        let arg = this.state.confirmOrderList.map((e,i)=>{
            return <ConfirmOrderRow key={e.foodId}
                                    index = {i}
                                    foodId={e.foodId}
                                    foodName={e.foodName}
                                    quantities={e.quantities}/>
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Xác nhận Order
                    </Title>
                    </Body>
                </Header>
                <ScrollView style={styles.confirmOrderListScrV}>
                    {arg}
                </ScrollView>
                <View style={styles.totalMoneyView}>
                    <Text style={styles.totalMoneyTxt}>Tổng tiền:{this.state.totalMoney.format()} VNĐ </Text>
                </View>
                <View style={styles.confirmBtnRow}>
                    <Button style={CommonStyles.txtBtn} danger>
                        <Text>
                            Xóa
                        </Text>
                    </Button>
                    <Button style={CommonStyles.txtBtn} primary>
                        <Text>
                            Thay đổi
                        </Text>
                    </Button>
                    <Button style={CommonStyles.txtBtn} success>
                        <Text>
                            Đặt món
                        </Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    confirmOrderListScrV:{
        flex:1
    },
    totalMoneyView:{
        flexDirection:'row',
        justifyContent:'center',
    },
    totalMoneyTxt:{

    },
    confirmBtnRow:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
});