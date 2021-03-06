import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationBarCom, Image } from '../../components';
import Images from '../../res/Images';
import { wPx2P } from '../../utils/ScreenUtil';

export default class FreeTrade extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBarCom title="自由贸易" />
        <Image style={{ width: wPx2P(479 / 2), height: wPx2P(190 / 2) }} source={Images.freeTradePlaceholder} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
