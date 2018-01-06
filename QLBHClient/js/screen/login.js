import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import {Container,Title,Body, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import SessionManager from '../share/SessionManager'
import Network from '../share/Network'
import {NavigationActions} from 'react-navigation'

export default class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin'
        }
    }

    login = () => {
        Network.login(this.state.username,this.state.password,false,(err,data,result)=>{
            if(err) {
                Network.setSpinner(false);
                return;
            }
            SessionManager.createSession(data);
            Network.getScheduleInfo((err,data,result)=>{
                if(err) return;
                SessionManager.getSession().setScheduleData(data);
                this.goToMainScreen();
            },true)
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
                <Header>
                    <Body>
                    <Title>
                        Đăng nhập
                    </Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Image style={styles.image} source={require("../../assets/logo.png")}/>
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
                        marginTop:50
                    }} onPress={this.login}>
                        <Text style={{color:"white"}} >Login</Text>
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
    },image:{
        width:128,
        height:128,
        alignSelf:"center",
        marginBottom:60
    }
});
