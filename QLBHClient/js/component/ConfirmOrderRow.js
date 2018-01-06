import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Container, Icon, Label, Button, Header, Content, Form, Item, Input} from 'native-base';
import Helper from '../share/Helper'

export default class ConfirmOrderRow extends Component {
    constructor(props) {
        super(props);
        let food = props.food;
        let index = props.index;
        this.state = {
            food,
            index,
        };
        this.prevDispatcher = props.dispatcher;
    }

    addValueToQuantities = (addValue) => {
        let oldQuantities = this.state.food.Quantities + this.state.food.ModifyQuantities;
        let updatedQuantities = oldQuantities + addValue;
        if (updatedQuantities < 0) updatedQuantities = 0;
        let different = updatedQuantities - oldQuantities;
        if (different !== 0) {
            // this.state.food.Quantities = updatedQuantities;
            this.state.food.ModifyQuantities += different;
            this.prevDispatcher.dispatch("refresh");
        }
    };

    render() {
        let leftButton = null;
        if (this.state.food.ModifyQuantities > 0) leftButton =
            <Button  transparent onPress={() => {
                this.addValueToQuantities(-1);
            }}>
                <Icon name='ios-arrow-dropdown'/>
            </Button>;
        return (
            <View style={styles.container}>
                <Text style={styles.indexTxt}>{this.state.index}</Text>
                <Text style={styles.foodNameTxt}>{this.state.food.Food.Name}</Text>
                <Text style={{color: 'rgb(255,160,0)', fontWeight: 'bold'}}>{this.state.food.Food.Price.format()}
                    đ</Text>
                <View style={{marginLeft: 10,width:100,flexDirection:"row",alignItems: 'center', justifyContent:"flex-end"}}>

                    {leftButton}
                    <Text>
                        {this.state.food.Quantities + this.state.food.ModifyQuantities}
                    </Text>
                    <Button style={{marginRight: -10}} transparent onPress={() => {
                        this.addValueToQuantities(1);
                    }}>
                        <Icon name='ios-arrow-dropup'/>
                    </Button>
                </View>

                {/*<Button dange>*/}
                {/*<Icon name='ios-trash'/>*/}
                {/*</Button>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indexTxt: {
        width: 20,
    },
    foodNameTxt: {
        flex: 1,
        fontWeight: 'bold',
    },
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12,
        height: 70,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    orderTxtBox: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableTxtBox: {
        flex: 2,
        marginTop: 10,
    },
    button: {
        height: 70,
        width: 50,
        opacity: 0.5,
    }
});