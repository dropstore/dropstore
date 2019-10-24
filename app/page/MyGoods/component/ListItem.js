import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, Clipboard,
} from 'react-native';
import {
  Image, ImageBackground, FadeImage, BtnGroup, Price, Tag,
} from '../../../components';
import Images from '../../../res/Images';
import { wPx2P } from '../../../utils/ScreenUtil';
import TitleWithTag from './TitleWithTag';
import { formatDate } from '../../../utils/commonUtils';
import { YaHei } from '../../../res/FontFamily';
import { showToast } from '../../../utils/MutualUtil';

type Props = {
  item: Object,
  showSeal?: Boolean,
  btns?: Array<Object>,
  RightBottom: any,
  timePrefix: String,
  timeText: String,
  priceTag: String,
  price: Number,
  CountdownCom: any,
  Hint: any,
};

export default class ListItem extends PureComponent<Props> {
  static defaultProps = {
    showSeal: false,
    btns: [],
  }

  copy = () => {
    const { item } = this.props;
    Clipboard.setString(item.order_id);
    showToast('订单号已复制');
  }

  render() {
    const {
      item, showSeal, RightBottom, timePrefix, timeText, btns, price, priceTag, CountdownCom, Hint,
    } = this.props;
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    return (
      <View style={styles.container}>
        <View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {
              showSeal ? (
                <ImageBackground useFadeImage source={{ uri: image }} style={styles.shoe}>
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
                              ? <Image source={Images.daifahuo} style={styles.tag} />
                              : item.goods_status === '6'
                                ? <Image source={Images.daifukuan} style={styles.tag} /> : null
                  }
                </ImageBackground>
              ) : <FadeImage source={{ uri: image }} style={styles.shoe} />
            }
          </View>
          {item.order_id && <Text onPress={this.copy} style={styles.id}>{`编号: ${item.order_id}`}</Text>}
        </View>
        <View style={styles.right}>
          <TitleWithTag text={goods_name} type={item.is_stock} />
          <View style={[styles.middle, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1 }}>
              {price && <Price price={price} offsetBottom={2} /> }
              {price && priceTag && <Tag style={{ marginLeft: 3, marginBottom: 2 }} text={priceTag} />}
            </View>
            {
              timeText ? (
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 11, color: '#858585' }}>{timePrefix}</Text>
                  <Text style={{ fontSize: 11, fontFamily: YaHei, marginLeft: 2 }}>
                    {formatDate(timeText, 'yyyy-MM-dd')}
                  </Text>
                </View>
              ) : CountdownCom || null
            }
          </View>
          {Hint}
          <View style={styles.middle}>
            <Text style={{ fontSize: 11, color: '#333' }}>{`SIZE：${item.size}`}</Text>
            { btns.length > 0 && <BtnGroup btns={btns} /> }
            { RightBottom }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 9,
    marginBottom: 7,
    flexDirection: 'row',
    borderRadius: 2,
    overflow: 'hidden',
  },
  right: {
    flex: 1,
    marginLeft: 10,
    marginTop: 2,
  },
  shoe: {
    width: wPx2P(129 * 0.87),
    height: wPx2P(80 * 0.87),
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
  id: {
    fontSize: 8,
    letterSpacing: -0.1,
    marginTop: 5,
  },
  tag: {
    width: wPx2P(52),
    height: wPx2P(52),
    top: wPx2P(12),
    left: wPx2P(20),
  },
});
