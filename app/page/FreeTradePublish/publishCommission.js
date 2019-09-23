import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { PADDING_TAB } from '../../common/Constant';
import { BottomPay, CountdownCom } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';

const TYPE = 'getMissionPrice'
function mapStateToProps() {
  return state => ({
    MissionPrice:getSimpleData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class PublishCommission extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const {shoeSize,goodsId,type} = navigation.getParam('goodsInfo')
    this.state = {
    };
    this.props.fetchSimpleData(TYPE,{goods_id:goodsId,size_id:shoeSize})
  }

  toPay = () => {

  }

  exit = () => {

  }

  render() {
    const { data } = this.props.MissionPrice;
    const {type} = navigation.getParam('goodsInfo')
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          {
            type==='storeMoney'? (<View>
              <View style={styles.moneyCount}>
                <View style={styles.moneyCountInfo}>
                  <Text style={{ fontFamily: YaHei, fontSize: 15 }}>{`鞋款共计：${50000000}￥`}</Text>
                  <Text style={{ fontFamily: YaHei, fontSize: 12 }}>需支付保证金：40%</Text>
                </View>
                <View style={styles.totalMoney}>
                  <Text style={styles.totalMoneyText}>{`支付金额：${500000}￥`}</Text>
                </View>
              </View>
              <View style={styles.orderInfo}>
                <Text style={{ fontSize: 13 }}>订单编号 : D53763998767894564</Text>
                <View style={styles.creatTime}>
                  <Text style={{ fontSize: 13 }}>创建日期 : 2019-03-06</Text>
                  <CountdownCom
                    prefix="待付款 "
                    finish={this.exit}
                    time={Date.now() / 1000 + 5000}
                    style={{ fontSize: 11, color: Colors.OTHER_BACK, width: 50 }}
                  />
                </View>
              </View>
            </View>):(<View>
              <View style={styles.moneyCount}>
                <View style={styles.moneyCountInfo}>
                  <Text style={{ fontFamily: YaHei, fontSize: 15 }}>{`鞋款共计：${50000000}￥`}</Text>
                  <Text style={{ fontFamily: YaHei, fontSize: 12 }}>需支付保证金：40%</Text>
                </View>
                <View style={styles.totalMoney}>
                  <Text style={styles.totalMoneyText}>{`支付金额：${500000}￥`}</Text>
                </View>
              </View>
              <View style={styles.orderInfo}>
                <Text style={{ fontSize: 13 }}>订单编号 : D53763998767894564</Text>
                <View style={styles.creatTime}>
                  <Text style={{ fontSize: 13 }}>创建日期 : 2019-03-06</Text>
                  <CountdownCom
                    prefix="待付款 "
                    finish={this.exit}
                    time={Date.now() / 1000 + 5000}
                    style={{ fontSize: 11, color: Colors.OTHER_BACK, width: 50 }}
                  />
                </View>
              </View>
            </View>)
          }
        </ScrollView>
        <BottomPay
          price={currentItem.price}
          onPress={this.toPay}
        />
      </View>

    );
  }
}
const styles = StyleSheet.create({
  moneyCount: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingTop: 9,
    paddingLeft: 9,
    paddingRight: 9,
    marginBottom: 66 + PADDING_TAB,
  },
  moneyCountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 42,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  totalMoney: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 44,
    marginHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  totalMoneyText: {
    fontSize: 18,
    fontFamily: YaHei,
  },
  orderInfo: {
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 9,
    borderRadius: 2,
    overflow: 'hidden',
  },
  creatTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4.5,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PublishCommission);
