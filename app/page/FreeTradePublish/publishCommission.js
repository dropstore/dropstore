import React,{PureComponent} from 'react'
import {connect} from 'react-redux'
import { Text,ScrollView,View,StyleSheet,TouchableOpacity } from 'react-native';
import { withNavigation} from 'react-navigation'
import Colors from '../../res/Colors'
import { PADDING_TAB } from '../../common/Constant';
import { BottomPay } from '../../components'
import { bindActionCreators } from 'redux';
import styles from 'react-native-webview/lib/WebView.styles';


function mapStateToProps() {
  return state => ({

  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

class PublishCommission extends  PureComponent{
  constructor(props){
    super(props)
    const { navigation } = this.props
    // const { price,goods_name,image} = navigation.getParam('goods')
    this.state = {
      currentItem: {
        // image,
        // goods_name,
        // price,
      },
    };
  }
  toPay = ()=>{

  }
  render (){
       const { currentItem } = this.state
      return(
        <View style={{flex:1}}>
          <ScrollView
          style={{flex:1,backgroundColor:'#efefef',paddingTop:9,paddingLeft:9,paddingRight:9,marginBottom:66 + PADDING_TAB}}
          >
          <View  style={Styles.moneyCount}>
            <View style={Styles.moneyCountInfo}>
              <Text >{`鞋款共计：${50000000}`}￥</Text>
              <Text >需支付保证金：40%</Text>
            </View>
            <View style={styles.totalMoney}>
                <Text  style={styles.totalMoneyText}>{`支付金额：${500000}`}</Text>
            </View>
          </View>
            <View style={Styles.orderInfo}>
              <View >
                <Text>订单编号 : D53763998767894564</Text>
              </View>
              <View style={styles.creatTime}>
                <Text style={{flex:1}}>创建日期 : 2019-03-06</Text>
                <Text style={{flex:1}}>代付款：10:56:27</Text>
              </View>
            </View>
          </ScrollView>
          <BottomPay
          price = {currentItem.price}
          onPress = {this.toPay}
          ></BottomPay>
        </View>

      )
  }


}
const Styles = StyleSheet.create({
  moneyCount:{
    padding:14,
    backgroundColor:'#fff',
  },
  moneyCountInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#F2F2F2',
    paddingBottom:12
  },
  totalMoney:{
    paddingTop:12,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  totalMoneyText:{
      fontSize:18,
  },
  orderInfo:{
    padding:14,
    backgroundColor:'#fff',
    marginTop:9,
  },
  creatTime:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(PublishCommission);
