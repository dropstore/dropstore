import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Price extends PureComponent {
  render() {
    const { price, offsetBottom } = this.props;
    const text = `${price / 100}`;
    return (
      <View style={{
        flexDirection: 'row', alignItems: 'flex-end', position: 'relative', bottom: offsetBottom || 2,
      }}
      >
        <Text style={styles.bigPrice}>{text[0]}</Text>
        <Text style={styles.price}>{`${text.slice(1)}￥`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigPrice: {
    fontSize: 25,
    position: 'relative',
    padding: 0,
    includeFontPadding: false,
    bottom: -8,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    position: 'relative',
    bottom: -4.5,
    padding: 0,
    includeFontPadding: false,
    fontWeight: 'bold',
  },
});
