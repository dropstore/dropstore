import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { wPx2P } from '../utils/ScreenUtil';
import { Mario, YaHei } from '../res/FontFamily';
import Colors from '../res/Colors';

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
    if (size * 1 === 48) {
      return;
    }
    const value = (size * 1 + 0.5).toFixed(1);
    this.setState({ size: value });
    onChange(value);
  }

  downSize = () => {
    const { size } = this.state;
    const { onChange } = this.props;
    if (size * 1 === 35.5) {
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
        <TouchableOpacity style={styles.arrowUp} onPress={this.upSize} hitSlop={hitSlop} />
        <View style={styles.sizeWrapper}>
          <Text style={styles.sizeText}>{size}</Text>
        </View>
        <TouchableOpacity style={styles.arrowDown} onPress={this.downSize} hitSlop={hitSlop} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sizeWrapper: {
    height: wPx2P(40),
    marginVertical: wPx2P(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontFamily: YaHei,
    fontSize: 21,
    padding: 0,
    color: '#000',
  },
  iconUp: {
    height: wPx2P(15),
    width: wPx2P(26),
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 16,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.OTHER_BACK,
    borderRightColor: 'transparent',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderBottomWidth: 0,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: Colors.OTHER_BACK,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
