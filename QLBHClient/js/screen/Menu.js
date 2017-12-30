import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Container, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
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

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Menu
                    </Title>
                    </Body>
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