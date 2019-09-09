import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RestPayItem from './RestPayItem';
import { fetchNotice } from '../../redux/actions/notice';
import { getActivity } from '../../redux/reselect/notice';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { PADDING_TAB } from '../../common/Constant';
import { wPx2P } from '../../utils/ScreenUtil';
import { formatDate } from '../../utils/commonUtils';
import { ModalNormal } from '../../components';
import { showModalbox, closeModalbox } from '../../redux/actions/component';

function mapStateToProps() {
  return state => ({
    activity: getActivity(state) || {},
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchNotice, showModalbox, closeModalbox,
  }, dispatch);
}

class RestPay extends Component {
  constructor(props) {
    super(props);
    const { fetchNotice } = this.props;
    fetchNotice('/notice/notice_list', 1);
  }

  changeChoosed = () => {

  }

  onPress = () => {
    const { showModalbox, closeModalbox } = this.props;
    if (true) {
      showModalbox({
        element: (<ModalNormal
          sure={() => {
            closeModalbox();
            this.toPay();
          }}
          closeModalbox={closeModalbox}
          customText={
            (
              <Text style={styles.hintModal}>
                {'只选中了'}
                <Text style={styles.num}>2</Text>
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
      this.toPay();
    }
  }

  toPay =() => {
    const { navigation } = this.props;
    const { order_price, order_id } = navigation.getParam('order');
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: 'pay_order',
      payData: {
        order_id,
        price: order_price / 100,
      },
    });
  }

  listFooterComponent = () => {
    const { navigation } = this.props;
    const { order_id, add_time } = navigation.getParam('order');
    return (
      <View>
        <Text style={styles.hint}>付款后的商品寄存在我的库房，如需发货，请到“我的”&gt;&gt;“我的库房”中选择发货地址</Text>
        <View style={styles.orderWrapper}>
          <Text style={styles.order}>{`订单编号：${order_id}`}</Text>
          <Text style={styles.order}>{`创建日期：${formatDate(add_time)}`}</Text>
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => <RestPayItem changeChoosed={this.changeChoosed} item={item} />

  render() {
    const { activity } = this.props;
    const list = [{
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '1',
      end_time: Date.now() / 1000 + 60 * 5 + 5,
      time: Date.now() / 1000 + 5,
      size: '42.5',
      name: '茶小音',
      price: '2341500',
      avatar: 'https://avatars3.githubusercontent.com/u/34742853?s=40&v=4',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '2',
      end_time: Date.now() / 1000 + 60 * 5 + 60,
      time: Date.now() / 1000 + 60,
      size: '42.5',
      price: '2341500',
      name: '茶小音',
      avatar: 'https://avatars3.githubusercontent.com/u/34742853?s=40&v=4',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '3',
      end_time: Date.now() / 1000 + 60 * 5,
      time: Date.now() / 1000,
      size: '42.5',
      price: '2341500',
      name: '茶小音',
      avatar: 'https://avatars3.githubusercontent.com/u/34742853?s=40&v=4',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '6',
      end_time: Date.now() / 1000 + 60 * 5,
      time: Date.now() / 1000,
      size: '42.5',
      name: '茶小音',
      price: '2341500',
      avatar: 'https://avatars3.githubusercontent.com/u/34742853?s=40&v=4',
    }];
    const payItems = [];
    return (
      <View style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}>
        <FlatList
          data={list}
          style={{ marginBottom: 69 }}
          renderItem={this.renderItem}
          ListFooterComponent={this.listFooterComponent}
        />
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>合计：</Text>
            <Text style={[styles.price, { color: Colors.OTHER_BACK }]}>{123}</Text>
            <Text style={styles.price}>￥</Text>
          </View>
          <TouchableOpacity
            disabled={payItems.length === 1}
            style={[styles.zhifu, { backgroundColor: payItems.length > 0 ? Colors.OTHER_BACK : '#e2e2e2' }]}
            onPress={this.onPress}
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

export default connect(mapStateToProps, mapDispatchToProps)(RestPay);
