/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { BottomPay, CountdownCom } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { formatDate } from '../../utils/commonUtils';
import { showToast } from '../../utils/MutualUtil';

function mapStateToProps() {
  return (state, props) => ({
    missionPrice: getSimpleData(state, props.navigation.getParam('TYPE')),
    appOptions: getSimpleData(state, 'appOptions'),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class PayDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation, fetchSimpleData } = this.props;
    const {
      shoeSize, goodsId, order_id, price,
    } = navigation.getParam('goodsInfo');
    const TYPE = navigation.getParam('TYPE');
    if (TYPE === 'getMissionPrice') {
      fetchSimpleData(navigation.getParam('TYPE'), { goods_id: goodsId, size_id: shoeSize });
    } else if (TYPE === 'freeTradeToRelease') {
      fetchSimpleData(navigation.getParam('TYPE'), { order_id, price });
    }
  }

  toPay = () => {
    const { navigation, missionPrice } = this.props;
    const {
      goodsImage, goodsName, order_id, price,
    } = navigation.getParam('goodsInfo');
    navigation.navigate('pay', {
      title: '选择支付方式',
      type: navigation.getParam('payType'),
      payData: missionPrice.data || { order_id, price },
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

  exit = () => {
    const { navigation } = this.props;
    showToast('订单支付超时，自动退出');
    navigation.goback();
  }

  renderBlock = items => (
    <View style={styles.block}>
      {
        items.map((v, i) => (
          <View key={i} style={[styles.itemWrapper, { borderBottomColor: i === items.length - 1 ? '#fff' : '#F2F2F2' }]}>
            <Text style={{ fontFamily: YaHei, fontSize: 15, marginVertical: 10 }}>
              {v.text}
              <Text style={styles.price}>{v.price}</Text>
              {'￥'}
            </Text>
            <Text style={{ fontSize: 12, color: '#A2A2A2' }}>{v.right}</Text>
          </View>
        ))
      }
    </View>
  )

  render() {
    const { missionPrice: { data = {} }, navigation, appOptions } = this.props;
    const { type, price } = navigation.getParam('goodsInfo');
    const items = type === 'storeMoney' ? [{ text: '库管费 : ', price: appOptions?.data?.management / 100 }] : [
      { text: '鞋款共计 : ', price, right: `需支付平台服务费：${appOptions?.data?.fee}%` },
      { text: '支付金额 : ', price: Math.ceil(price * appOptions?.data?.fee) / 100 },
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={styles.scrollView}>
          { this.renderBlock(items) }
          {
            type === 'storeMoney' && (
              <View style={styles.orderInfo}>
                <View style={[styles.itemWrapper0, { borderBottomColor: '#F2F2F2' }]}>
                  <Text style={{ fontSize: 12, color: '#585858' }}>{`订单编号 : ${data.order_id}`}</Text>
                </View>
                <View style={[styles.itemWrapper0, { borderBottomColor: '#fff' }]}>
                  <Text style={{ fontSize: 10, color: '#A2A2A2', marginTop: 3 }}>{`创建日期 : ${formatDate(data.add_time)}`}</Text>
                  <CountdownCom
                    prefix="待付款 "
                    prefixStyle={{ fontSize: 11, color: Colors.RED, fontFamily: YaHei }}
                    finish={this.exit}
                    time={data.pay_time}
                    style={{ fontSize: 11, fontFamily: YaHei }}
                  />
                </View>

              </View>
            )
          }
        </ScrollView>
        <BottomPay price={data.price || price} onPress={this.toPay} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  price: {
    fontFamily: YaHei,
    fontSize: 15,
    color: Colors.YELLOW,
  },
  itemWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemWrapper0: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingTop: 9,
    paddingLeft: 9,
    paddingRight: 9,
  },
  orderInfo: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginTop: 9,
    borderRadius: 2,
    overflow: 'hidden',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PayDetail);
