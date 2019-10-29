import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ScaleView, FadeImage, Price, Image,
} from '../../../components';
import { wPx2P } from '../../../utils/ScreenUtil';
import { showToast } from '../../../utils/MutualUtil';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';
import { getScreenWidth } from '../../../common/Constant';

export default class ShopListItemCom extends PureComponent {
  toShopDetailPage = () => {
    const { navigation, item, onPress } = this.props;
    if (Date.now() / 1000 - item.end_time > -1) {
      showToast('活动已结束');
      return;
    } if (onPress) {
      onPress();
      return;
    }
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
  };

  render() {
    const { item, index } = this.props;
    const now = Date.now() / 1000;
    const isEnd = item.end_time - now < 1;
    const isStart = item.start_time - now < 1;

    return (
      <ScaleView style={{ ...styles.scaleView, marginLeft: index % 2 === 0 ? 8 : 9 }} onPress={this.toShopDetailPage}>
        <Price price={item.price} />
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Image
            style={styles.qian}
            source={item.b_type === '2' ? require('../../../res/image/tag-qiang.png') : require('../../../res/image/tag-qian.png')}
          />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <FadeImage resizeMode="contain" style={styles.imageShoe} source={{ uri: item.icon }} />
        </View>
        <Text style={{ fontSize: 11, color: isEnd ? '#C51616' : '#0084FF' }}>{isEnd ? '已结束' : isStart ? '抢购中' : '活动中' }</Text>
        <Text style={styles.shopTitle} numberOfLines={2}>{item.activity_name}</Text>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  scaleView: {
    backgroundColor: Colors.WHITE_COLOR,
    marginTop: 7,
    padding: 6,
    paddingBottom: 7,
    borderRadius: 2,
    overflow: 'hidden',
    width: (getScreenWidth() - 26) / 2,
    justifyContent: 'space-between',
    height: 241,
  },
  shopTitle: {
    fontSize: 13,
    fontFamily: YaHei,
    textAlign: 'justify',
    lineHeight: 15,
    marginTop: 5,
  },
  qian: {
    height: wPx2P(10),
    width: wPx2P(35),
  },
  imageShoe: {
    width: wPx2P(147),
    height: wPx2P(91),
    alignSelf: 'center',
  },
});
