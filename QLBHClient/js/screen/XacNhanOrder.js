import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {
    Container,
    Body,
    Left,
    Title,
    Right,
    Label,
    Button,
    Icon,
    Header,
    Content,
    Form,
    Item,
    Input
} from 'native-base';
import DummyData from '../utilities/DummyData'
import ConfirmOrderRow from '../component/ConfirmOrderRow'
import CommonStyles from '../share/CommonStyles'
import CommonComponent from '../share/CommonComponent'

export default class XacNhanOrder extends Component {
    constructor(props) {
        super(props);
        let foodList = props.navigation.state.params.foodList;
        this.state = {
            confirmOrderList: foodList,
            totalMoney: 10000,
        };
        this.dispatcher = this.props.navigation.state.params.dispatcher;
        this.dispatcherDict = this.props.navigation.state.params.dispatcherDict;
        // this.dummy();
    }

    dummy = () => {
        this.state = {
            confirmOrderList: DummyData.dummyConfirmOrderList(),
            totalMoney: 10000
        }
    };

    goBackToMenuOrder = () => {
        this.props.navigation.goBack();
    };
    cancelCreateOrder = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
        // let mainScreenKey = this.props.navigation.state.params.mainNavigation.state.key;
        // this.props.navigation.goBack(mainScreenKey);
    };
    createLeftBackButton = () => {
        return CommonComponent.createBackButton(this.goBackToMenuOrder);
    };
    createCancelButton = () => {
        return CommonComponent.createCancelButton(this.cancelCreateOrder);
    };

    render() {
        let arg = this.state.confirmOrderList.map((e, i) => {

            if (e.quantities === 0) return null;
            return <ConfirmOrderRow key={e.foodId}
                                    index={i}
                                    foodId={e.foodId}
                                    foodName={e.foodName}
                                    dispatcher={this.dispatcher}
                                    dispatcherDict={this.dispatcherDict}
                                    quantities={e.quantities}/>
        });
        let backButton = this.createLeftBackButton();
        let cancelButton = this.createCancelButton();
        return (
            <Container>
                <Header>
                    <Left>
                        {backButton}
                    </Left>
                    <Body>
                    <Title>
                        Xác nhận
                    </Title>
                    </Body>
                    <Right>
                        {cancelButton}
                    </Right>
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
    container: {},
    confirmOrderListScrV: {
        flex: 1
    },
    totalMoneyView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    totalMoneyTxt: {},
    confirmBtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});