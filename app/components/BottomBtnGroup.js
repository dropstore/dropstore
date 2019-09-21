/* eslint-disable react/no-array-index-key */
/* @flow */
import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Platform, TouchableOpacity, Text,
} from 'react-native';
import { PADDING_TAB, SCREEN_WIDTH } from '../common/Constant';
import { wPx2P } from '../utils/ScreenUtil';

type Props = {
  btns: Array<{
    onPress: Function,
    backgroundColor: String,
    disabled: Boolean,
    text: String
  }>,
};

export default class AvatarWithShadow extends PureComponent<Props> {
  render() {
    const { btns } = this.props;
    return (
      <View style={[styles.container, { justifyContent: btns.length === 2 ? 'space-between' : 'flex-end' }]}>
        {
          btns.map(((v, i) => (
            <TouchableOpacity
              key={v.text + i}
              disabled={v.disabled}
              style={[styles.item, { backgroundColor: v.backgroundColor }]}
              onPress={v.onPress}
            >
              <Text style={styles.text}>{v.text}</Text>
            </TouchableOpacity>
          )))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 66 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingTop: 9,
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
  item: {
    width: wPx2P(168),
    height: 46,
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
