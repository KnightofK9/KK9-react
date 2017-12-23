import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class LoginBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: '',
            password: ''
        }
    }
    helloWorld = () => {
        console.log(this.state);
    };

    render() {
        return (
            <Container>
                <Header />
                <Content  contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(text)=>{this.setState({
                                username:text
                            })}} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input  onChangeText={(text)=>{this.setState({
                                password:text
                            })}}/>
                        </Item>
                    </Form>
                    <Button rounded style={{
                        alignSelf:'center',
                        justifyContent: 'center',
                        width:100,
                    }} onPress={this.helloWorld}>
                        <Text>Click Me! </Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    bgRed: {
        backgroundColor: 'red'
    },
    bgBlue: {
        backgroundColor: 'blue'
    }
});
