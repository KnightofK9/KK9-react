import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import SessionManager from '../share/SessionManager'
import Network from '../share/Network'
import {NavigationActions} from 'react-navigation'

export default class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin2'
        }
    }

    login = () => {
        Network.login(this.state.username,this.state.password,(err,data,result)=>{
            SessionManager.createSession(data);
            this.goToMainScreen();
        });
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
                            <Input value={this.state.username} onChangeText={(text) => {
                                this.setState({
                                    username: text
                                })
                            }}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} value={this.state.password} onChangeText={(text) => {
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
