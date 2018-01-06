import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import {Container, Thumbnail, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import CommonStyles from '../share/CommonStyles';
import * as Constant from '../share/Constant'
import {CachedImage} from "react-native-img-cache";
import Helper from '../share/Helper'
import Network from '../share/Network'

export default class PrepareFoodRow extends Component {
    constructor(props) {
        super(props);
        let prepareFood = props.prepareFood;
        this.state = {
            prepareFood
        };
        this.prevDispatcher = props.dispatcher;
    }

    getPrepText = (prepareState) => {
        switch (prepareState) {
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
    getNextPrepareState = (prepareState) => {
        switch (prepareState) {
            case Constant.PREPARE_STATE.QUEUE:
                return Constant.PREPARE_STATE.COOKING;
            case Constant.PREPARE_STATE.COOKING:
                return Constant.PREPARE_STATE.COOKED;
            case Constant.PREPARE_STATE.COOKED:
                return Constant.PREPARE_STATE.SERVED;
            case Constant.PREPARE_STATE.SERVED:
            case Constant.PREPARE_STATE.CANCEL:
                return null;
        }
    };
    processButtonProperty = (prepareState) =>{
        let btn ={
            success:true,
            light:false,
            disabled:false,
        };
        switch (prepareState) {
            case Constant.PREPARE_STATE.QUEUE:
            case Constant.PREPARE_STATE.COOKING:
            case Constant.PREPARE_STATE.COOKED:
                break;
            case Constant.PREPARE_STATE.SERVED:
            case Constant.PREPARE_STATE.CANCEL:
                btn.disabled = true;
                btn.light = true;
                btn.success = false;
                break;
        }
        return btn;
    };
    cancelButtonProperty = (prepareState) =>{
        let btn ={
            danger:true,
            light:false,
            disabled:false,
        };
        switch (prepareState) {
            case Constant.PREPARE_STATE.QUEUE:
            case Constant.PREPARE_STATE.COOKING:
            case Constant.PREPARE_STATE.COOKED:
            case Constant.PREPARE_STATE.SERVED:
                break;
            case Constant.PREPARE_STATE.CANCEL:
                btn.danger = false;
                btn.light = true;
                btn.disabled = true;
                break;
        }
        return btn;
    };
    onCancelClick = () => {
        let nextPrepareState = Constant.PREPARE_STATE.CANCEL;
        Network.setPrepareFoodStateTo(this.state.prepareFood.PrepareFoodId,nextPrepareState,(err,data,result)=>{
            if(err) return;
            this.state.prepareFood.PrepareStateId = nextPrepareState;
            this.refreshUi();
        })
    };
    onProcessClick = () => {
        let nextPrepareState = this.getNextPrepareState(this.state.prepareFood.PrepareStateId);
        Network.setPrepareFoodStateTo(this.state.prepareFood.PrepareFoodId,nextPrepareState,(err,data,result)=>{
            if(err) return;
            this.state.prepareFood.PrepareStateId = nextPrepareState;
            this.refreshUi();
        })
    };
    refreshUi = () =>{
        this.prevDispatcher.dispatch("refresh");
    };
    render() {
        this.state.prepareFood = this.props.prepareFood;
        let foodUrl = Helper.createUrlFromImageId(this.state.prepareFood.Food.ImageId);
        let processBtnProperty = this.processButtonProperty(this.state.prepareFood.PrepareStateId);
        let cancelBtnProperty = this.cancelButtonProperty(this.state.prepareFood.PrepareStateId);
        let createdTime = (new Date(this.state.prepareFood.CreateDateTime)).toLocaleTimeString();
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
                        <View style={styles.extraInfoGrid}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Icon name='restaurant' style={{fontSize: 25, color: '#f9b045'}} active={true}/>
                                <Text style={styles.foodInfo}>
                                     {this.state.prepareFood.TableId}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Icon name='stopwatch' style={{fontSize: 25, color: '#f9b045'}} active={true}/>
                                <Text style={[styles.foodInfo]}>
                                    {createdTime}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.btnGrid}>
                            <View style={styles.flexRow}>
                                <Button onPress={this.onProcessClick}
                                        {...processBtnProperty}
                                        style={styles.button}>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.buttonLabel}>
                                            {this.getPrepText(this.state.prepareFood.PrepareStateId)}
                                        </Text>
                                    </View>
                                </Button>
                                <Button {...cancelBtnProperty} onPress={this.onCancelClick} danger style={styles.cancelButton}>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
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
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 120,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    foodImage: {
        width: 80,
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    content: {
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        flex:1,
    },
    infoGrid: {
        margin: 10,
        flex:1,
        flexDirection: 'column',
    },
    extraInfoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    foodNameTxt: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 17,
    },
    foodInfo: {
        marginLeft: 10,
        fontWeight: '100',
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
    },
    btnGrid: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    button: {
        marginRight: 10,
        width: 90,
        height: 35,
    },
    cancelButton: {
        marginRight: 0,
        width: 60,
        height: 35,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});