import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container,Thumbnail, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import CommonStyles from '../share/CommonStyles';
import * as Constant from '../share/Constant'
import {CachedImage} from "react-native-img-cache";
export default class PrepareFoodRow extends Component {
    constructor(props) {
        super(props);
        let prepareFood = props.prepareFood;
        this.state = {
            prepareFood
        }
    }

    getPrepText = (prepareState)=>{
        switch(prepareState){
            case Constant.PREPARE_STATE.CANCEL:
                return "Đã hủy";
            case Constant.PREPARE_STATE.QUEUE:
                return "Nấu";
            case Constant.PREPARE_STATE.COOKING:
                return "Nấu xong";
            case Constant.PREPARE_STATE.COOKED:
                return "Phục vụ";
            case Constant.PREPARE_STATE.SERVED:
                return "Đã phục vụ";
        }
        return "Lỗi";
    };

    render() {
        return (
            <View style={styles.container}>
                <CachedImage style={styles.foodImage} mutable
                             source={{uri: this.state.prepareFood.foodImage}}
                />
                <View>
                    <Text>
                        {this.state.prepareFood.foodName}
                    </Text>
                    <Text>
                        Bàn số:{this.state.prepareFood.tableId}
                    </Text>
                    <View style={CommonStyles.flexRow}>
                        <Button danger>
                            <Text>
                                Hủy
                            </Text>
                        </Button>
                        <Button success>
                            <Text>
                                {this.getPrepText(this.state.prepareFood.prepareState)}
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
    foodImage:{
        width:128,
        height:128,
    }
});