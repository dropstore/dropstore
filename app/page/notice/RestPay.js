import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RestPayItem from './RestPayItem';
import { fetchNotice } from '../../redux/actions/notice';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { PADDING_TAB } from '../../common/Constant';
import { wPx2P } from '../../utils/ScreenUtil';
import { formatDate } from '../../utils/commonUtils';
import { showToast, showModalbox, closeModalbox } from '../../utils/MutualUtil';
import { ModalNormal, CountdownCom } from '../../components';
import { request } from '../../http/Axios';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchNotice,
  }, dispatch);
}

class RestPay extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { end_time } = navigation.getParam('order');
    this.state = {
      list: [],
      end_time,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.getParam('order');
    request('/notice/notice_info', { params: { id } }).then((res) => {
      this.setState({ list: res.data.info.map(v => ({ ...v, choosed: true })) });
    });
  }

  changeChoosed = (item) => {
    const { list } = this.state;
    this.setState({
      list: list.map((v) => {
        if (v.order_id === item.order_id) {
          return ({ ...v, choosed: !v.choosed });
        }
        return v;
      }),
    });
  }

  onPress = (payItems, totalPrice) => {
    const { list } = this.state;
    if (payItems.length !== list.length) {
      showModalbox({
        element: (<ModalNormal
          sure={() => {
            closeModalbox();
            this.toPay(payItems, totalPrice);
          }}
          closeModalbox={closeModalbox}
          customText={
            (
              <Text style={styles.hintModal}>
                {'只选中了'}
                <Text style={styles.num}>{payItems.length}</Text>
                {'双鞋，其他未选中的鞋将视为放弃购买，放弃购买的鞋，佣金也会直接发放给抢鞋者。'}
              </Text>
            )
          }
        />),
        options: {
          style: {
            height: 197,
            width: 265,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      });
    } else {
      this.toPay(payItems, totalPrice);
    }
  }

  toPay = (payItems, totalPrice) => {
    const { navigation } = this.props;
    const order_id = payItems.map(v => v.order_id).join(',');
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: '1',
      payData: {
        order_id,
        price: totalPrice,
      },
    });
  }

  listFooterComponent = () => {
    const { navigation } = this.props;
    const { add_time } = navigation.getParam('order');
    return (
      <View>
        <Text style={styles.hint}>付款后的商品寄存在我的库房，如需发货，请到“我的”&gt;&gt;“我的库房”中选择发货地址</Text>
        <View style={styles.orderWrapper}>
          <Text style={styles.order}>{`创建日期：${formatDate(add_time)}`}</Text>
        </View>
      </View>
    );
  }

  finish = () => {
    showToast('订单支付已超时，自动退出');
    const { navigation } = this.props;
    navigation.pop();
  }

  renderItem = ({ item }) => <RestPayItem changeChoosed={this.changeChoosed} item={item} />

  render() {
    const { list, end_time } = this.state;
    const payItems = list.filter(v => v.choosed && v.pay_status != 1);
    const totalPrice = payItems.reduce((sum, v) => sum + v.order_price * 1, 0);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}>
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>待付款</Text>
          <CountdownCom
            finish={this.finish}
            style={{ ...styles.time, width: 55 }}
            time={end_time}
          />
        </View>
        <Text style={[styles.time, { marginRight: 9, marginBottom: 5 }]}>请在规定时间内完成支付，错过将失去购买资格</Text>
        <FlatList
          data={list}
          style={{ marginBottom: 69 }}
          renderItem={this.renderItem}
          ListFooterComponent={this.listFooterComponent}
        />
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>合计：</Text>
            <Text style={[styles.price, { color: Colors.OTHER_BACK }]}>{`${totalPrice / 100}`}</Text>
            <Text style={styles.price}>￥</Text>
          </View>
          <TouchableOpacity
            disabled={payItems.length === 0}
            style={[styles.zhifu, { backgroundColor: payItems.length > 0 ? Colors.OTHER_BACK : '#e2e2e2' }]}
            onPress={() => this.onPress(payItems, totalPrice)}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: YaHei }}>确认支付</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  order: {
    color: '#585858',
    fontSize: 9,
  },
  num: {
    color: '#37B6EB',
    fontFamily: YaHei,
  },
  timeWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    alignSelf: 'flex-end',
    marginRight: 9,
    alignItems: 'center',
  },
  hintModal: {
    fontFamily: YaHei,
    textAlign: 'center',
  },
  orderWrapper: {
    marginHorizontal: 9,
    paddingHorizontal: 9,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
    textAlign: 'right',
  },
  hint: {
    color: '#B6B6B6',
    fontSize: 9,
    marginHorizontal: 9,
    textAlign: 'justify',
    marginTop: 3,
    marginBottom: 10,
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

export default connect(null, mapDispatchToProps)(RestPay);
