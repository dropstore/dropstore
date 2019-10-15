/* eslint-disable react/no-array-index-key */
/* @flow */
import React, { PureComponent } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';

type Props = {
  btns: Array<{
    onPress: Function,
    color?: String,
    disabled: Boolean,
    text: String
  }>,
};

export default class BottomBtnGroup extends PureComponent<Props> {
  render() {
    const { btns } = this.props;
    const left = btns[0];
    const right = btns[1] || btns[0];

    return (
      <View style={styles.container}>
        {
          btns[1] && (
          <TouchableOpacity
            disabled={left.disabled}
            style={styles.item}
            onPress={left.onPress}
            hitSlop={{
              top: 20, left: 20, right: 10, bottom: 20,
            }}
          >
            <Text style={[styles.text, { color: left.color || Colors.RED }]}>{left.text}</Text>
          </TouchableOpacity>
          )
        }

        <View style={styles.shuxian} />
        <TouchableOpacity
          disabled={right.disabled}
          style={styles.item}
          onPress={right.onPress}
          hitSlop={{
            top: 20, left: 10, right: 20, bottom: 20,
          }}
        >
          <Text style={[styles.text, { color: right.color || Colors.RED }]}>{right.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontFamily: YaHei,
  },
  shuxian: {
    height: 13,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 13,
  },
});
