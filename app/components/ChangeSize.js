import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import ImageBackground from './ImageBackground';
import { wPx2P } from '../utils/ScreenUtil';
import { Mario } from '../res/FontFamily';
import Images from '../res/Images';

export default class ChangeSize extends PureComponent {
  constructor(props) {
    super(props);
    const { initSize } = this.props;
    this.state = {
      size: initSize,
    };
  }

  upSize = () => {
    const { size } = this.state;
    const { onChange } = this.props;
    if (size * 1 === 46) {
      return;
    }
    const value = (size * 1 + 0.5).toFixed(1);
    this.setState({ size: value });
    onChange(value);
  }

  downSize = () => {
    const { size } = this.state;
    const { onChange } = this.props;
    if (size * 1 === 36) {
      return;
    }
    const value = (size * 1 - 0.5).toFixed(1);
    this.setState({ size: value });
    onChange(value);
  }

  render() {
    const hitSlop = {
      top: 20, left: 50, right: 50, bottom: 20,
    };
    const { size } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        <ImageBackground
          style={styles.iconUp}
          source={Images.iconUp}
          onPress={this.upSize}
          hitSlop={hitSlop}
        />
        <ImageBackground source={Images.frameSize} style={styles.sizeWrapper}>
          <Text style={styles.sizeText}>{size}</Text>
        </ImageBackground>
        <ImageBackground
          style={styles.iconUp}
          source={Images.iconDown}
          onPress={this.downSize}
          hitSlop={hitSlop}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sizeWrapper: {
    width: wPx2P(115),
    height: wPx2P(39),
    marginVertical: wPx2P(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontFamily: Mario,
    fontSize: 21,
    padding: 0,
    marginBottom: 1,
    color: '#000',
  },
  iconUp: {
    height: wPx2P(15),
    width: wPx2P(26),
  },
});
