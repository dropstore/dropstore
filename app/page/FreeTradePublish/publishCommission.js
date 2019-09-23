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
import { formatDate } from '../../utils/commonUtils';
import ShopConstant from '../../common/ShopConstant';
import { showToast } from '../../utils/MutualUtil';

const TYPE = 'getMissionPrice';
function mapStateToProps() {
  return state => ({
    missionPrice: getSimpleData(state, TYPE),
    appOptions: getSimpleData(state, 'appOptions'),
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
    const { navigation, fetchSimpleData } = this.props;
    const { shoeSize, goodsId } = navigation.getParam('goodsInfo');
    fetchSimpleData(TYPE, { goods_id: goodsId, size_id: shoeSize });
  }

  toPay = () => {
    const { navigation, missionPrice, appOptions } = this.props;
    const { goodsImage, goodsName, type } = navigation.getParam('goodsInfo');
    if (type === 'storeMoney') {
      navigation.navigate('pay', {
        title: '选择支付方式',
        type: ShopConstant.PAY_ORDER,
        payData: {
          ...missionPrice.data,
          price: appOptions?.data?.management,
        },
        shopInfo: {
          goods: {
            image: goodsImage,
            goods_name: goodsName,
            start_time: 0,
          },
        },
        noTimer: true,
        noShareBtn: true,
      });
    }
  }

  exit = () => {
    const { navigation } = this.props;
    showToast('订单支付超时，自动退出');
    navigation.goback();
  }

  render() {
    const { missionPrice: { data = {} }, navigation, appOptions } = this.props;
    const { type, shoePrice } = navigation.getParam('goodsInfo');
    return (
      <View style={{ flex: 1 }}>
        <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {
            type === 'storeMoney' ? <Text style={styles.cangchuPrice}>{`仓储费用：${appOptions?.data?.management / 100}￥`}</Text> : (
              <View style={styles.moneyCount}>
                <View style={styles.moneyCountInfo}>
                  <Text style={{ fontFamily: YaHei, fontSize: 15 }}>{`鞋款共计：${shoePrice}￥`}</Text>
                  <Text style={{ fontFamily: YaHei, fontSize: 12 }}>{`需支付保证金：${appOptions?.data?.fee}%`}</Text>
                </View>
                <Text style={styles.totalMoneyText}>{`支付金额：${shoePrice * appOptions?.data?.fee / 100}￥`}</Text>
              </View>
            )
          }
          <View style={styles.orderInfo}>
            <Text style={{ fontSize: 13 }}>{`订单编号 : ${data.order_id}`}</Text>
            <View style={styles.creatTime}>
              <Text style={{ fontSize: 13 }}>{`创建日期 : ${formatDate(data.add_time)}`}</Text>
              <CountdownCom
                prefix="待付款 "
                finish={this.exit}
                time={data.pay_time}
                style={{ fontSize: 11, color: Colors.OTHER_BACK, width: 50 }}
              />
            </View>
          </View>
        </ScrollView>
        <BottomPay price={data.price} onPress={this.toPay} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  moneyCount: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    height: 86,
    paddingHorizontal: 12,
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
    alignItems: 'center',
    borderBottomColor: '#ddd',
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    textAlign: 'right',
    flex: 1,
    lineHeight: 43,
  },
  cangchuPrice: {
    fontSize: 18,
    fontFamily: YaHei,
    borderRadius: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingLeft: 12,
    paddingVertical: 13,
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
  storeMoneyTotalMoney: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 44,
    marginHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PublishCommission);
