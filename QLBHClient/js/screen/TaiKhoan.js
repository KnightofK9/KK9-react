import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Body,Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class TaiKhoan extends Component {
    constructor(props){
        super(props);
        this.state= {
        }
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