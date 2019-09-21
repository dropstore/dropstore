import React, { PureComponent } from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Platform,
} from 'react-native';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';
import { PADDING_TAB } from '../common/Constant';
import { wPx2P } from '../utils/ScreenUtil';

export default class BottomPay extends PureComponent {
  onPress = () => {
    const { onPress, price } = this.props;
    onPress(price);
  }

  render() {
    const { price, disabled } = this.props;
    return (
      <View style={styles.bottom}>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>合计：</Text>
          <Text style={[styles.price, { color: Colors.OTHER_BACK }]}>{price / 100}</Text>
          <Text style={styles.price}>￥</Text>
        </View>
        <TouchableOpacity
          disabled={disabled}
          style={[styles.zhifu, { backgroundColor: disabled ? '#e2e2e2' : Colors.OTHER_BACK }]}
          onPress={this.onPress}
        >
          <Text style={styles.queren}>确认支付</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(188, 188, 188)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 50,
        position: 'relative',
      },
    }),
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
  queren: {
    color: '#fff',
    fontSize: 16,
    fontFamily: YaHei,
  },
});
