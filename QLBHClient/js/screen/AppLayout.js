import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Spinner, Body, Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import RootNavigator from "./MainScreen"
import EventDispatcher from "../share/EventDispatcher"
import Network from '../share/Network'

export default class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderSpinner: false
        };
        this.topEventDispatcher = this.createEventDispatcher();
        Network.setTopEventDispatcher(this.topEventDispatcher);
    }

    createEventDispatcher = () =>{
        let handle = (value, callObject) => {
            this.setState({
                renderSpinner:value
            })
        };
        let eventDispatcher = new EventDispatcher();
        eventDispatcher.registerEvent("spinner",handle);
        return eventDispatcher;

    };

    createSpinner = () => {
        if (this.state.renderSpinner) return ( <View style={styles.onTop}>
            <Spinner color='white'/>
        </View>);
        return null;
    };

    render() {
        let spinner = this.createSpinner();

        return (
            <Container>
                <RootNavigator topEventDispatcher={this.topEventDispatcher}/>
                {spinner}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    onTop: {
        position: "absolute",
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    }
});