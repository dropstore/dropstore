/**
 * @file 商品详情导航右布局
 * @date 2019/8/18 16:13
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import Images from '../../../../res/Images';
import { YaHei } from '../../../../res/FontFamily';

export default class ShopDetailHeaderRight extends PureComponent {
  render() {
    const { rate, onPress } = this.props;
    if (rate) {
      const Wrapper = onPress ? TouchableOpacity : View;
      return (
        <Wrapper onPress={onPress} style={_styles.mainView}>
          <Text style={_styles.rateTitle}>中签率</Text>
          <Image resizeMode="contain" style={_styles.imageShoe} source={Images.lot_win_rate} />
          <Text style={_styles.rateText}>{rate}</Text>
        </Wrapper>
      );
    }
    return <View />;
  }
}

const _styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rateTitle: {
    fontSize: 9,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(255,255,255,1)',
    marginRight: 7,
  },
  rateImage: {
    width: 13,
    height: 12,
  },
  rateText: {
    fontSize: 11,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
    marginLeft: 4,
  },
});
