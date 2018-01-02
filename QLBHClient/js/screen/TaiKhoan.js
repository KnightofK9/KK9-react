import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Body,Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

import BaseScreen from './BaseScreen'
export default class TaiKhoan extends BaseScreen {
    constructor(props){
        super(props);
        this.state= {
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Tài khoản
                    </Title>
                    </Body>
                </Header>
                <Content>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});