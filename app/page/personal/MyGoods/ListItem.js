import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Clipboard,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { FadeImage, Price, CountdownCom } from '../../../components';
import Colors from '../../../res/Colors';
import { wPx2P } from '../../../utils/ScreenUtil';
import { showToast, showModalbox, closeModalbox } from '../../../utils/MutualUtil';
import Modal from './Modal';
import TitleWithTag from '../component/TitleWithTag';

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item, type } = this.props;
    // 2期货 1现货（已鉴定或从平台购买的）2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    this.btns = [];
    if (type === 'onSale') {
      this.btns = [
        { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
        { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
      ];
    } else if (type === 'warehouse') {
      if (item.is_stock === '2') {
        this.btns = [
          { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
        ];
      } else if (item.is_stock === '1') {
        this.btns = [
          // { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
          { title: '提货', backgroundColor: '#EF4444', key: 'pickUp' },
        ];
      } else if (item.type === 2) {
        this.btns = [
          { title: '填写物流信息', backgroundColor: '#FFA700', key: 'express' },
        ];
      } else if ([3, 4].includes(item.type)) {
        this.btns = [
          { title: '寄回', backgroundColor: '#EF4444', key: 'sendBack' },
        ];
      }
    } else if (type === 'uncomplete') {
      this.btns = [
        { title: '付款', backgroundColor: '#EF4444', key: 'pay' },
      ];
    }
    this.state = {
      text: item.end_time <= Date.now() / 1000 && type === 'uncomplete' ? '付款已超时' : null,
    };
  }

  onPress = (type) => {
    const { navigation, item } = this.props;
    if (['express', 'edit', 'cancel'].includes(type)) {
      showModalbox({
        element: (<Modal
          navigation={navigation}
          closeModalbox={closeModalbox}
          type={type}
          successCallback={this.successCallback}
          cancelCallback={this.cancelCallback}
        />),
        options: {
          style: {
            height: 287,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      });
    } else if (type === 'pickUp') {
      const { navigation } = this.props;
      navigation.navigate('PickUp', {
        title: '支付运费',
        item,
      });
    } else if (type === 'pay') {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: '1',
        payData: {
          order_id: item.order_id,
          price: item.order_price,
        },
      });
    }
  }

  successCallback = () => new Promise((resolve) => {
    resolve();
  })

  cancelCallback = () => new Promise((resolve) => {
    resolve();
  })

  finish = () => {
    this.setState({ text: '付款已超时' });
  }

  copy = () => {
    const { item } = this.props;
    Clipboard.setString(item.yundanhao);
    showToast('运单号已复制');
  }

  render() {
    const { item, type } = this.props;
    const { text } = this.state;
    const subTitle = type === 'uncomplete' ? '' : '已入库';
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
          <FadeImage source={{ uri: item.goods.image }} style={styles.shoe} />
          <Text style={styles.id}>{`编号: ${item.order_id}`}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTag text={item.goods.goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              {type === 'warehouse' ? <View /> : <Price price={item.order_price} />}
              {
                type === 'uncomplete' && !text ? (
                  <View style={styles.timeWrapper}>
                    <Text style={styles.time}>待付款</Text>
                    <CountdownCom
                      finish={this.finish}
                      style={{ ...styles.time, width: 55 }}
                      time={item.end_time}
                    />
                  </View>
                ) : <Text style={{ fontSize: 11 }}>{subTitle}</Text>
              }
            </View>
          </View>
          { type === 'uncomplete' && !text && <Text style={styles.cuoguo}>请在规定时间内完成支付，错过将失去购买资格</Text>}
          { text && <Text style={{ color: Colors.OTHER_BACK, textAlign: 'right', fontSize: 13 }}>{text}</Text>}
          { type === 'sendOut' && <Text onPress={this.copy} style={styles.yundanhao}>{`运单号：${item.express_id}`}</Text>}
          {
            this.btns.length > 0 && !text && (
            <View style={[styles.btnGroup, { marginTop: type === 'uncomplete' ? 3 : 9 }]}>
              {
              this.btns.map(v => (
                <TouchableOpacity key={v.key} onPress={() => this.onPress(v.key)} style={[styles.btn, { backgroundColor: v.backgroundColor }]}>
                  <Text style={styles.text}>{v.title}</Text>
                </TouchableOpacity>
              ))
            }
            </View>
            )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 9,
    marginTop: 7,
    flexDirection: 'row',
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  id: {
    fontSize: 8,
    marginTop: 15,
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  btnGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 115,
    height: 25,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 9,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  cuoguo: {
    color: Colors.OTHER_BACK,
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yundanhao: {
    color: '#0A8CCF',
    fontSize: 10,
    marginTop: 8,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default withNavigation(ListItem);
