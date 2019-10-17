/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { BottomPay, ShoeImageHeader } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { formatDate } from '../../utils/commonUtils';
import { showToast } from '../../utils/MutualUtil';

function mapStateToProps() {
  return (state, props) => ({
    payData: getSimpleData(state, props.navigation.getParam('api').type),
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
    const { type, params } = navigation.getParam('api');
    fetchSimpleData(type, params);
  }

  toPay = () => {
    const { navigation, payData: { data = {} } } = this.props;
    const { goodsImage, goodsName } = navigation.getParam('goodsInfo');
    navigation.navigate('pay', {
      title: '选择支付方式',
      type: navigation.getParam('type'),
      payData: data,
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
    <View style={styles.orderInfo}>
      {
        items.map((v, i) => (
          <View key={i} style={[styles.itemWrapper, { borderBottomColor: i === items.length - 1 ? '#fff' : '#F2F2F2' }]}>
            <Text style={{ fontSize: 12, marginVertical: 10 }}>{v.text}</Text>
            <Text style={{ fontSize: 12, color: i === 0 ? '#000' : 'red' }}>{`${i !== 0 ? '+' : ''}￥${(v.price / 100).toFixed(2)}`}</Text>
          </View>
        ))
      }
    </View>
  )

  render() {
    const { payData: { data = {} }, navigation } = this.props;
    const goodsInfo = navigation.getParam('goodsInfo');
    const items = [];
    // service 服务费 price 商品价格 management 仓库管理费
    data.price && items.push({ text: '商品价格 : ', price: data.service });
    data.management && items.push({ text: '仓库管理费 : ', price: data.service });
    data.service && items.push({ text: '平台服务费 : ', price: data.service });
    const total = ['service', 'management', 'price'].reduce((sum, v) => sum + (data[v] || 0), 0);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <ShoeImageHeader item={goodsInfo} showSize />
          { this.renderBlock(items) }
          <View style={styles.orderInfo}>
            <View style={[styles.itemWrapper0, { borderBottomColor: '#F2F2F2' }]}>
              <Text style={{ fontSize: 12, color: '#585858' }}>{`订单编号 : ${data.order_id}`}</Text>
            </View>
            <View style={[styles.itemWrapper0, { borderBottomColor: '#fff' }]}>
              <Text style={{ fontSize: 10, color: '#A2A2A2', marginTop: 3 }}>{`创建日期 : ${formatDate(data.add_time)}`}</Text>
            </View>
          </View>
        </ScrollView>
        <BottomPay price={total} onPress={this.toPay} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  orderInfo: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginTop: 9,
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 9,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PayDetail);
