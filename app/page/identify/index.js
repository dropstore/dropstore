import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationBarCom from '../../components/NavigationBarCom';
import Images from '../../res/Images';
import Image from '../../components/Image';
import { wPx2P } from '../../utils/ScreenUtil';

export default class Identify extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBarCom title="鉴定" />
        <Image style={{ width: wPx2P(480 / 2), height: wPx2P(190 / 2) }} source={Images.identifyPlaceholder} />
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
