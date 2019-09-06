import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';
import { Image, Price, CountdownCom } from '../../../components';
import Images from '../../../res/Images';
import { updateUser } from '../../../redux/actions/userInfo';
import { getUserInfo } from '../../../redux/reselect/userInfo';
import { wPx2P } from '../../../utils/ScreenUtil';
import { PADDING_TAB } from '../../../common/Constant';
import TitleWithTag from '../component/TitleWithTag';
import { formatDate } from '../../../utils/commonUtils';
import { request } from '../../../http/Axios';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class PickUp extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.item = navigation.getParam('item');
  }

  componentDidMount() {
    request('');
  }

  finish = () => {

  }

  changeAddress = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseAddress', {
      title: '选择收货地址',
    });
  }

  toPay =() => {
    const { navigation } = this.props;
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: 'pay_order',
      payData: {
        order_id: this.item.id,
        price: 50,
      },
    });
  }

  render() {
    const item = this.item;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Images.shoe} style={styles.shoe} />
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <TitleWithTag item={item} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {/* <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.time}>待付款</Text>
                  <CountdownCom
                    finish={this.finish}
                    style={{ ...styles.time, width: 50 }}
                    time={Date.now() / 1000 + 15 * 60}
                  />
                </View> */}
                <Text style={{ color: '#212121', fontSize: 11, fontFamily: YaHei }}>{`SIZE:${item.size}`}</Text>
              </View>
            </View>
            {/* <Text style={styles.cuoguo}>请在规定时间内完成支付，错过将失去购买资格</Text> */}
          </View>
        </View>
        <View style={styles.shouhuorenWrapper}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={styles.shouhuoren}>{`收货人：${123}`}</Text>
            <Text style={styles.shouhuoren}>17554265585</Text>
          </View>
          <Text style={styles.address}>北京市朝阳区佳汇国际中心A座509</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.yuandian}>
              <View style={styles.yuandian1} />
            </View>
            <Text style={{ fontSize: 13, fontFamily: YaHei, color: '#333' }}>已选</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.changeAddress} style={styles.change}>
          <Text style={styles.changeText}>更改物流信息</Text>
        </TouchableOpacity>
        <View style={styles.shouhuorenWrapper}>
          <Text style={styles.dingdan}>{`订单编号：${item.id}`}</Text>
          <Text style={styles.dingdan}>{`创建日期：${formatDate(item.add_time)}`}</Text>
        </View>
        <Text style={styles.hint}>友情提示：</Text>
        <Text style={styles.hint1}>本站默认顺丰物流发货，若需其他物流方式请直接联系客服 :</Text>
        <Text style={styles.hint1}>QQ：123456789</Text>
        <Text style={styles.hint1}>微信：drop</Text>
        <Text style={styles.hint2}>物流价格由第三方物流公司提供</Text>
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>合计：</Text>
            <Text style={[styles.price, { color: Colors.OTHER_BACK }]}>{50}</Text>
            <Text style={styles.price}>￥</Text>
          </View>
          <TouchableOpacity style={[styles.zhifu, { backgroundColor: true ? Colors.OTHER_BACK : '#e2e2e2' }]} onPress={this.toPay}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: YaHei }}>确认支付</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    marginRight: 15,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  cuoguo: {
    color: Colors.OTHER_BACK,
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  shouhuorenWrapper: {
    marginHorizontal: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
  },
  shouhuoren: {
    fontFamily: YaHei,
  },
  address: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 15,
  },
  yuandian: {
    height: 13,
    width: 13,
    backgroundColor: '#fff',
    borderRadius: 6.5,
    overflow: 'hidden',
    borderColor: Colors.OTHER_BACK,
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yuandian1: {
    backgroundColor: Colors.OTHER_BACK,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: 4,
  },
  change: {
    backgroundColor: '#FFA700',
    height: 25,
    width: 115,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
    alignSelf: 'flex-end',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    color: '#fff',
    fontSize: 10,
  },
  dingdan: {
    fontSize: 12,
  },
  hint: {
    fontSize: 16,
    fontFamily: YaHei,
    marginHorizontal: 22,
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  hint1: {
    fontSize: 13,
    fontFamily: YaHei,
    marginHorizontal: 22,
    color: '#333',
    marginBottom: 5,
  },
  hint2: {
    fontSize: 13,
    fontFamily: YaHei,
    marginHorizontal: 22,
    color: '#333',
    textAlign: 'right',
    marginTop: 15,
  },
  zhifu: {
    width: wPx2P(198),
    height: 44,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: 66 + PADDING_TAB,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#fff',
    paddingBottom: PADDING_TAB,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  priceWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    fontSize: 16,
    fontFamily: YaHei,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PickUp);
