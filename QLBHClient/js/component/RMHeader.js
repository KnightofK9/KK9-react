import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Body,Title, Label, Button, Header, Content, Form, Item, Input} from 'native-base';

export default class RMHeader extends Component {
    constructor(props){
        super(props);
        let headerTitle = props.headerTitle;
        this.state= {
            headerTitle
        }
    }

    render() {
        return (
            <View style={styles.headerView}>
                <View style={styles.contentView}>
                    <Text style={styles.headerTitle}>{this.state.headerTitle}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    headerView:{
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    contentView:{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    headerTitle:{
        alignContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
});