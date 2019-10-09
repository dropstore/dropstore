import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  FadeImage, Price, Image, TitleWithTagTwo, Tag,
} from '../../components';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import Images from '../../res/Images';
import { formatDate } from '../../utils/commonUtils';

export default class ListItem extends PureComponent {
  onPress = (type) => {
    const {
      navigation, item, route, refresh,
    } = this.props;
    MyGoodsItemOnPress(type, route, navigation, item, refresh);
  }

  render() {
    const { item } = this.props;
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    const showNumber = !!item.order_id;
    let btns = [];
    if (item.goods_status === '1') {
      btns = [];
    } if (item.goods_status === '5') {
      btns = [
        { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
        { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
      ];
    } else if (item.goods_status === '4') {
      btns = [
        { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
        { title: '提货', backgroundColor: '#EF4444', key: 'pickUp' },
      ];
    } else if (item.goods_status === '0') {
      btns = [
        { title: '填写物流信息', backgroundColor: '#FFA700', key: 'express' },
      ];
    } else if (['2', '3'].includes(item.goods_status)) {
      btns = [
        { title: '寄回', backgroundColor: '#EF4444', key: 'sendBack' },
      ];
    }

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
                  ? <Image source={Images.onExpress} style={styles.tag} />
                  : item.goods_status === '5'
                    ? <Image source={Images.onSale} style={styles.tag} /> : null
          }
          { showNumber && <Text style={styles.id}>{`编号: ${item.order_id}`}</Text> }
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTagTwo text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                {item.buy_price && <Price price={item.buy_price} /> }
                {item.buy_price && <Tag style={{ marginLeft: 3, marginBottom: 1 }} text="买入价" />}
              </View>
              <Text style={{ fontSize: 12 }}>{`SIZE：${item.size}`}</Text>
            </View>
          </View>
          { ['4', '5'].includes(item.goods_status) && <Text style={{ fontSize: 11 }}>{`入库时间：${formatDate(item.add_time, 'MM/dd')}`}</Text> }
          {
            btns.length > 0 && (
              <View style={styles.btnGroup}>
                {
                  btns.map(v => (
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
    paddingTop: 5,
  },
  btnGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 115,
    height: 25,
    marginTop: 9,
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
});
