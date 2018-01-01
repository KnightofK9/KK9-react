import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import SessionManager from '../share/SessionManager'
import {NavigationActions} from 'react-navigation'

export default class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        let session = SessionManager.getSession();
        session.setUserProfile({
            username: this.state.username,
            accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QiLCJuYmYiOjE1MTIxNTMzNjQsImV4cCI6MTU0MzY4OTM2NCwiaWF0IjoxNTEyMTUzMzY0fQ.1Iya30pFQBMTaL65fbObUBNg0v9ZtnLia4IGX7W78ug'
        });
        this.goToMainScreen();
    };
    goToMainScreen = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <Container>
                <Header/>
                <Content contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(text) => {
                                this.setState({
                                    username: text
                                })
                            }}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}/>
                        </Item>
                    </Form>
                    <Button rounded style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 100,
                    }} onPress={this.login}>
                        <Text>Login</Text>
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
