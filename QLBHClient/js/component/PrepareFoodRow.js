import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Thumbnail, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import CommonStyles from '../share/CommonStyles';

export default class PrepareFoodRow extends Component {
    constructor(props) {
        super(props);
        let prepareFoodId = props.prepareFoodId;
        let foodName = props.foodName;
        let foodImage = props.foodImage;
        let tableId = props.tableId;
        let prepareState = props.prepareState;
        this.state = {
            prepareFoodId,
            foodName,
            foodImage,
            tableId,
            prepareState,
        }
    }

    getPrepText = ()=>{
        return "Upgrade";
    };

    render() {
        return (
            <View style={styles.container}>
                <Thumbnail/>
                <View>
                    <Text>
                        {this.state.foodName}
                    </Text>
                    <View style={CommonStyles.flexRow}>
                        <Button danger>
                            <Text>
                                Hủy
                            </Text>
                        </Button>
                        <Button success>
                            <Text>
                                {this.getPrepText()}
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
});