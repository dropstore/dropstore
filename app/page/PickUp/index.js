import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { FadeImage } from '../../components';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { wPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB } from '../../common/Constant';
import TitleWithTagTwo from '../../components/TitleWithTagTwo';
import { formatDate } from '../../utils/commonUtils';
import { request } from '../../http/Axios';

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
    this.state = {
      isChoose: false,
      link_name: null,
      mobile: null,
      address: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.didBlurSubscription = navigation.addListener(
      'willFocus',
      (payload) => {
        const { address } = payload.state.params;
        if (address) {
          this.setState({
            link_name: address.link_name,
            mobile: address.mobile,
            address: address.address,
            isChoose: true,
          });
        }
      },
    );
    request('/order/pay_postage', { params: { id: this.item.id } }).then((res) => {
      const { postage, user_address } = res.data;
      const { link_name, mobile, address } = user_address;
      this.setState({
        postage,
        link_name,
        mobile,
        address,
      });
    });
  }

  componentWillUnmount() {
    this.didBlurSubscription && this.didBlurSubscription.remove();
  }

  changeAddress = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseAddress', {
      title: '选择收货地址',
    });
  }

  toPay =() => {
    const { postage } = this.state;
    const { navigation } = this.props;
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: '3',
      payData: {
        order_id: this.item.id,
        price: postage,
      },
    });
  }

  toAdd = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', {
      title: '添加收货地址',
      needReturn: true,
      address: {
        is_default: true,
      },
    });
  }

  render() {
    const item = this.item;
    const {
      postage, link_name, mobile, address, isChoose,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <FadeImage source={{ uri: item.goods.image }} style={styles.shoe} />
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <TitleWithTagTwo text={item.goods.goods_name} type={item.is_stock} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#212121', fontSize: 11, fontFamily: YaHei }}>{`SIZE：${item.size}`}</Text>
              </View>
            </View>
          </View>
        </View>
        {
          link_name ? (
            <View style={styles.shouhuorenWrapper}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.shouhuoren}>{`收货人：${link_name}`}</Text>
                <Text style={styles.shouhuoren}>{mobile}</Text>
              </View>
              <Text style={styles.address}>{address}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.yuandian}>
                  <View style={styles.yuandian1} />
                </View>
                <Text style={{ fontSize: 13, fontFamily: YaHei, color: '#333' }}>{`${isChoose ? '已选' : '默认地址'}`}</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addWrapper} onPress={this.toAdd}>
              <View style={styles.addIcon}>
                <Text style={styles.plus}>+</Text>
              </View>
              <Text style={styles.add}>添加收货地址</Text>
            </TouchableOpacity>
          )
        }

        <TouchableOpacity onPress={this.changeAddress} style={styles.change}>
          <Text style={styles.changeText}>更改物流信息</Text>
        </TouchableOpacity>
        <View style={styles.shouhuorenWrapper}>
          <Text style={styles.dingdan}>{`订单编号：${item.order_id}`}</Text>
          <Text style={styles.dingdan}>{`创建日期：${formatDate(item.add_time)}`}</Text>
        </View>
        <Text style={styles.hint}>友情提示：</Text>
        <Text style={styles.hint1}>本站默认顺丰物流发货，若需其他物流方式请直接联系客服 :</Text>
        {/* <Text style={styles.hint1}>QQ：123456789</Text> */}
        <Text style={styles.hint1}>微信：dropservice</Text>
        {/* <Text style={styles.hint1}>电话：123456789</Text> */}
        <Text style={styles.hint2}>物流价格由第三方物流公司提供</Text>
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>合计：</Text>
            <Text style={[styles.price, { color: Colors.OTHER_BACK }]}>{postage / 100}</Text>
            <Text style={styles.price}>￥</Text>
          </View>
          <TouchableOpacity disabled={!link_name} style={[styles.zhifu, { backgroundColor: link_name ? Colors.OTHER_BACK : '#e2e2e2' }]} onPress={this.toPay}>
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
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 7,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  add: {
    color: '#8E8D8D',
  },
  addIcon: {
    backgroundColor: '#BCBCBC',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 5,
  },
  plus: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 13.5,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PickUp);
