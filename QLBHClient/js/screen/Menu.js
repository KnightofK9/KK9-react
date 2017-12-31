import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Container,Icon, Body,Left,Right, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import FoodMenu from '../component/FoodMenu'
import DummyData from '../utilities/DummyData'

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dummy();
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
        if(!this.isCreateOrder()) return null;
        return <Button transparent onPress={() => {
            this.goBackToCreateOrder();
        }}>
            <Icon name="arrow-back"/>
        </Button>
    };
    render() {
        let backButton = this.createLeftBackButton();
        return (
            <Container>
                <Header>
                    <Left>{backButton}</Left>
                    <Body>
                    <Title>
                        Menu
                    </Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <FoodMenu categorizeName={this.state.categorizeName} foodList={this.state.foodList}/>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});