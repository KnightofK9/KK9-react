import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import {
    Container,
    Icon,
    Body,
    Left,
    Right,
    Title,
    Label,
    Button,
    Header,
    Content,
    Form,
    Item,
    Input
} from 'native-base';
import FoodMenu from '../component/FoodMenu'
import DummyData from '../utilities/DummyData'
import CommonStyles from '../share/CommonStyles'
import CommonComponent from '../share/CommonComponent'
import PropertyDispatcher from '../share/PropertyDispatcher'
import PropertyDispatcherDict from '../share/PropertyDispatcherDict'

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dummy();
        this.dispatcher = this.createDispatcher();
        this.dispatcherDict = this.createDispatcherDict();
    }

    dummy = () => {
        this.state = {...DummyData.dummyFoodList()}
    };
    isCreateOrder = () => {
        return (this.props.navigation && this.props.navigation.state.params.isCreateOrder);
    };
    goBackToCreateOrder = () => {
        this.props.navigation.goBack();
    };
    createLeftBackButton = () => {
        return CommonComponent.createBackButton(this.goBackToCreateOrder,this.isCreateOrder);
    };
    createCancelButton = () => {
        return CommonComponent.createCancelButton(this.goBackToCreateOrder, this.isCreateOrder);
    };
    openConfirmOrder = () =>{
        this.props.navigation.navigate('ConfirmCreateOrder',{
            foodList:this.state.foodList,
            dispatcher:this.dispatcher,
            dispatcherDict:this.dispatcherDict,
    });
    };
    createConfirmOrderButton = () =>{
        if(!this.isCreateOrder()) return null;
        return <Button style={styles.confirmBtn} rounded primary onPress={() => {
            this.openConfirmOrder();
        }}>
            <Icon name='ios-add-outline'/>
        </Button>
    };
    createDispatcher = ()=>{
        let handler = (oldFoodList, updatedProperty, type) =>{
            let foodId = updatedProperty.foodId;
            let quantities = updatedProperty.quantities;
            switch (type){
                case "update":
                    for(let value of oldFoodList){
                        if(value.foodId === foodId){
                            value.quantities = quantities;
                            break;
                        }
                    }
            }
            return oldFoodList;
        };
        let propertyDispatcher = new PropertyDispatcher(this.state);
        propertyDispatcher.connect(handler,"foodList");
        return propertyDispatcher;
    };
    createDispatcherDict = () =>{
        return new PropertyDispatcherDict();
    };
    render() {
        let backButton = this.createLeftBackButton();
        let cancelButton = this.createCancelButton();
        let confirmOrderButton = this.createConfirmOrderButton();
        return (
            <Container>
                <Header>
                    <Left>{backButton}</Left>
                    <Body>
                    <Title>
                        Menu
                    </Title>
                    </Body>
                    <Right>{cancelButton}</Right>
                </Header>
                <ScrollView style={styles.foodScrView}>
                    <FoodMenu dispatcherDict={this.dispatcherDict} dispatcher={this.dispatcher} categorizeName={this.state.categorizeName} isCreateOrder={this.isCreateOrder()}
                              foodList={this.state.foodList}/>
                </ScrollView>
                {confirmOrderButton}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    foodScrView: {
        flex: 1
    },
    confirmBtn:{
        position:'absolute',
        right:10,
        bottom:70
    }
});