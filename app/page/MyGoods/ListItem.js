import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Clipboard,
} from 'react-native';
import {
  FadeImage, Price, CountdownCom, Image,
} from '../../components';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import { showToast, showModalbox, closeModalbox } from '../../utils/MutualUtil';
import Modal from './Modal';
import TitleWithTagTwo from '../../components/TitleWithTagTwo';
import Images from '../../res/Images';
import { request } from '../../http/Axios';

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item, type } = this.props;
    // 商品状态 0尚未邮寄 1快递中 2鉴定中 3未通过鉴定 4鉴定通过 5已发布出售
    this.btns = [];
    if (type === 'onSale') {
      this.btns = [
        { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
        { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
      ];
    } else if (type === 'uncomplete') {
      this.btns = [
        { title: '付款', backgroundColor: '#EF4444', key: 'pay' },
      ];
    } else if (type === 'warehouse') {
      if (item.goods_status === '1') {
        this.btns = [];
      } if (item.goods_status === '5') {
        this.btns = [
          { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
          { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
        ];
      } else if (item.goods_status === '4') {
        this.btns = [
          { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
          { title: '提货', backgroundColor: '#EF4444', key: 'pickUp' },
        ];
      } else if (item.goods_status === '0') {
        this.btns = [
          { title: '填写物流信息', backgroundColor: '#FFA700', key: 'express' },
        ];
      } else if (['2', '3'].includes(item.goods_status)) {
        this.btns = [
          { title: '寄回', backgroundColor: '#EF4444', key: 'sendBack' },
        ];
      }
    }
    this.state = {
      text: item.end_time <= Date.now() / 1000 && type === 'uncomplete' ? '付款已超时' : null,
    };
  }

  onPress = (type) => {
    const { navigation, item, route } = this.props;
    if (['express', 'edit', 'cancel'].includes(type)) {
      showModalbox({
        element: (<Modal
          route={route}
          navigation={navigation}
          closeModalbox={closeModalbox}
          type={type}
          item={item}
          successCallback={this.successCallback}
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
    } else if (['pickUp', 'sendBack'].includes(type)) {
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
        shopInfo: {
          goods: item.goods,
          order_id: item.order_id,
        },
      });
    } else if (type === 'publish') {
      this.toPublish();
    }
  }

  toPublish = () => {
    const { navigation, item } = this.props;
    navigation.navigate('PutOnSale', {
      title: '发布商品',
      item,
    });
  }

  successCallback = (value, type) => new Promise((resolve) => {
    const { item, refresh, navigation } = this.props;
    if (type === 'express') {
      request('/order/do_add_express', { params: { to_express_id: value, order_id: item.order_id } }).then(() => {
        refresh();
        resolve();
      });
    } else if (type === 'edit') {
      request('/free/edit_price', { params: { price: value, id: item.free_id } }).then((res) => {
        const { order_id } = res.data;
        navigation.navigate('PublishCommission', {
          title: '支付保证金',
          TYPE: 'freeTradeToRelease',
          goodsInfo: {
            type: 'deposit',
            price: value,
            order_id,
            goodsImage: item.image,
            goodsName: item.goods_name,
          },
          needShareBtn: true,
        });
        resolve();
      });
    } else if (type === 'cancel') {
      request('/free/off_shelf', { params: { id: item.free_id } }).then(() => {
        refresh();
        resolve();
      });
    }
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
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    const showNumber = !!item.order_id;
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: showNumber ? 'space-between' : 'center', marginRight: 15 }}>
          <FadeImage source={{ uri: image }} style={styles.shoe} />
          {
            item.goods_status === '2'
              ? <Image source={Images.jiandingzhong} style={styles.tag} />
              : item.goods_status === '3'
                ? <Image source={Images.weitongguo} style={styles.tag} />
                : item.goods_status === '1'
                  ? <Text style={styles.zhaungtai}>运输中</Text>
                  : item.goods_status === '5'
                    ? <Text style={styles.zhaungtai}>销售中</Text> : null
          }
          { showNumber && <Text style={styles.id}>{`编号: ${item.order_id}`}</Text> }
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTagTwo text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              {type === 'warehouse' ? <View /> : <Price price={item.order_price || item.price} />}
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
  zhaungtai: {
    fontSize: 20,
    fontFamily: YaHei,
    position: 'absolute',
    left: wPx2P(15),
    color: Colors.OTHER_BACK,
  },
  tag: {
    width: wPx2P(74),
    height: wPx2P(74),
    position: 'absolute',
    left: wPx2P(15),
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  id: {
    fontSize: 8,
    marginTop: 15,
    letterSpacing: -0.1,
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
    letterSpacing: -0.2,
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
