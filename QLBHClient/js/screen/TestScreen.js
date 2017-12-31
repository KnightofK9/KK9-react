import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import {Container, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class TestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>
                        Test Screen
                    </Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.onFoodPress}>
                            <Image style={styles.image}
                                source={{uri: "http://quanlybanhangapi.azurewebsites.net/api/image/9"}}
                            />
                        </TouchableOpacity>
                    </View>
                    <Image style={{width:500,height:500}}
                           source={{uri: "http://quanlybanhangapi.azurewebsites.net/api/image/9"}}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 256,
        height: 256
    },
    image:{
        width:256,
        height:256,
    }
});