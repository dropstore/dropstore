import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FadeImage, Price, Image, Tag, BtnGroup,
} from '../../components';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import { MyGoodsItemOnPress } from '../../utils/MutualUtil';
import Images from '../../res/Images';
import { formatDate } from '../../utils/commonUtils';
import Id from './component/Id';
import TitleWithTag from './component/TitleWithTag';

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
    let btns = [];
    // 0尚未邮寄 1快递中 2鉴定中 3未通过鉴定 4鉴定通过 5正在出售
    if (item.goods_status === '1') {
      btns = [];
    } if (item.goods_status === '5') {
      btns = [
        { text: '改价', color: '#000', onPress: () => this.onPress('edit') },
        { text: '下架', onPress: () => this.onPress('cancel') },
      ];
    } else if (item.goods_status === '4') {
      btns = [{ text: '上架', color: '#000', onPress: () => this.onPress('publish') }];
      if (item.is_stock === '1') {
        btns.push({ text: '提货', onPress: () => this.onPress('pickUp') });
      }
    } else if (item.goods_status === '0') {
      btns = [
        { text: '填写物流信息', color: '#000', onPress: () => this.onPress('express') },
      ];
    } else if (['3'].includes(item.goods_status)) {
      btns = [
        { text: '寄回', onPress: () => this.onPress('sendBack') },
      ];
    }

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
          <View style={{ flex: 1 }}>
            <FadeImage source={{ uri: image }} style={styles.shoe} />
            {
              item.goods_status === '2'
                ? <Image source={Images.jiandingzhong} style={styles.tag} />
                : item.goods_status === '3'
                  ? <Image source={Images.weitongguo} style={styles.tag} />
                  : item.goods_status === '1'
                    ? <Image source={Images.onExpress} style={styles.tag} />
                    : item.goods_status === '5'
                      ? <Image source={Images.onSale} style={styles.tag} />
                      : item.goods_status === '0'
                        ? <Image source={Images.daifahuo} style={styles.tag} /> : null
            }
          </View>
          <Id id={item.order_id} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TitleWithTag text={goods_name} type={item.is_stock} />
            <View style={styles.middle}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                {item.buy_price && <Price price={item.buy_price} /> }
                {item.buy_price && <Tag style={{ marginLeft: 3, marginBottom: 1 }} text="买入价" />}
              </View>
              {
                ['4', '5'].includes(item.goods_status) && (
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Text style={{ fontSize: 11, color: '#858585' }}>
                      {`${item.is_stock === '1' ? '入库时间' : '预计入库'}`}
                    </Text>
                    <Text style={{ fontSize: 11, fontFamily: YaHei, marginLeft: 2 }}>
                      {formatDate(item.add_time, 'yyyy-MM-dd')}
                    </Text>
                  </View>
                )
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, color: '#333' }}>{`SIZE：${item.size}`}</Text>
            { btns.length > 0 && <BtnGroup btns={btns} /> }
          </View>
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
    marginBottom: 7,
    flexDirection: 'row',
  },
  zhaungtai: {
    fontSize: 20,
    fontFamily: YaHei,
    position: 'absolute',
    left: wPx2P(15),
    color: Colors.YELLOW,
  },
  tag: {
    width: wPx2P(52),
    height: wPx2P(52),
    position: 'absolute',
    left: wPx2P(17),
    top: wPx2P(12),
  },
  shoe: {
    width: wPx2P(129 * 0.87),
    height: wPx2P(80 * 0.87),
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
    minHeight: 35,
  },
  btnGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 9,
  },
  btn: {
    height: 25,
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
