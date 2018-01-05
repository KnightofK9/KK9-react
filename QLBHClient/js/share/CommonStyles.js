import {
    StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
   txtBtn:{
       width:100,
       height:35,
       justifyContent:'center'
   },
    flexRow:{
       flexDirection:'row'
    },
    fabOrderBtn:{
       position:'absolute',
        right:10,
        bottom:10,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    }

});