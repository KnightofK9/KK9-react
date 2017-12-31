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
import Helper from '../share/Helper'
import PropertyDispatcher from '../share/PropertyDispatcher'
import EventDispatcher from '../share/EventDispatcher'

export default class XacNhanOrder extends Component {
    constructor(props) {
        super(props);
        let foodList = props.navigation.state.params.foodList;
        this.state = {
            confirmOrderList: foodList.filter(f => f.quantities !== 0),
            totalMoney: Helper.calTotalMoney(foodList),
        };
        this.dispatcher = this.props.navigation.state.params.dispatcher;
        this.dispatcherDict = this.props.navigation.state.params.dispatcherDict;
        // this.totalMoneyDispatcher = this.createTotalMoneyDispatcher();
        // this.dummy();
        this.eventDispatcher = this.createEventDispatcher();
    }

    dummy = () => {
        this.state = {
            confirmOrderList: DummyData.dummyConfirmOrderList(),
            totalMoney: 10000
        }
    };
    createTotalMoneyDispatcher = () => {
        let handle = (oldTotalMoney, money, type) => {
            switch (type) {
                case "add":
                    return oldTotalMoney + money;
                case "update":
                    return money;
            }
            return oldTotalMoney;
        };
        let totalMoneyDispatcher = new PropertyDispatcher(this.state,this);
        totalMoneyDispatcher.connect(handle,"totalMoney");
        return totalMoneyDispatcher;
    };
    createEventDispatcher = () =>{
        let handle = (value,callObject) =>{
            this.forceUpdate();
        };
        let eventDispatcher = new EventDispatcher();
        eventDispatcher.registerEvent("refresh",handle);
        return eventDispatcher;

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
        let count = 1;
        let arg = this.state.confirmOrderList.map((e, i) => {

            // if (e.quantities === 0) return null;
            return <ConfirmOrderRow key={i}
                                    index={count++}
                                    foodId={e.foodId}
                                    foodName={e.foodName}
                                    foodPrice={e.foodPrice}
                                    dispatcher={this.dispatcher}
                                    dispatcherDict={this.dispatcherDict}
                                    eventDispatcher={this.eventDispatcher}
                                    quantities={e.quantities}/>
        });
        let backButton = this.createLeftBackButton();
        let cancelButton = this.createCancelButton();
        this.state.totalMoney = Helper.calTotalMoney(this.state.confirmOrderList);
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