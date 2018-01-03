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
import Helper from '../share/Helper'
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
                return "ĐÃ HUỶ";
            case Constant.PREPARE_STATE.QUEUE:
                return "NẤU";
            case Constant.PREPARE_STATE.COOKING:
                return "NẤU XONG";
            case Constant.PREPARE_STATE.COOKED:
                return "PHỤC VỤ";
            case Constant.PREPARE_STATE.SERVED:
                return "ĐÃ PHỤC VỤ";
        }
        return "Lỗi";
    };

    render() {
        let foodUrl = Helper.createUrlFromImageId(this.state.prepareFood.FoodId);
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <CachedImage style={styles.foodImage} mutable
                                 source={{uri: foodUrl}}
                    />
                    <View style={styles.infoGrid}>
                        <Text style={styles.foodNameTxt}>
                            {this.state.prepareFood.Food.Name}
                        </Text>
                        <Text>
                            Bàn số:{this.state.prepareFood.TableId}
                        </Text>
                        <View style={styles.btnGrid}>
                            <View style={styles.flexRow}>

                                <Button success style={styles.button}>
                                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.buttonLabel}>
                                            {this.getPrepText(this.state.prepareFood.PrepareStateId)}
                                        </Text>
                                    </View>
                                </Button>
                                <Button danger style={styles.cancelButton}>
                                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.buttonLabel}>
                                            HUỶ
                                        </Text>
                                    </View>
                                </Button>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    foodImage:{
        width:128,
        height:128,
    },
    content: {
        borderRadius: 10,
        flexDirection:'row',
        overflow: 'hidden',
    },
    infoGrid: {
        margin: 10,
        flexDirection: 'column',
    },
    foodNameTxt: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btnGrid: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        flex: 1,
    },
    flexRow:{
        flexDirection:'row',
        alignSelf: 'flex-end',
    },
    button:{
        marginRight: 10,
        width: 90,
        height: 35,
    },
    cancelButton:{
        marginRight: 10,
        width: 60,
        height: 35,
    },
    buttonLabel:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});