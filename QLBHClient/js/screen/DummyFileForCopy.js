import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Body,Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class DummyFileForCopy extends Component {
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
                        Menu
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