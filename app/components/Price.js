import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BrowalliaNew } from '../res/FontFamily';

export default class Price extends PureComponent {
  render() {
    const { price } = this.props;
    const text = `${price / 100}`;
    return (
      <View style={{
        flexDirection: 'row', alignItems: 'flex-end', position: 'relative', marginRight: 4,
      }}
      >
        <Text style={[styles.bigPrice, styles.price]}>{text[0]}</Text>
        <Text style={[styles.price, styles.littlePrice]}>{`${text.slice(1)}￥`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigPrice: {
    transform: [{ scale: 1.8 }, { translateX: 1 }, { translateY: -2.2 }],
    fontWeight: '500',
  },
  littlePrice: {
    transform: [{ translateX: 4 }],
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    position: 'relative',
    fontFamily: BrowalliaNew,
  },
});
