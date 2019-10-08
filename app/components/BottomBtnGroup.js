/* eslint-disable react/no-array-index-key */
/* @flow */
import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Platform, TouchableOpacity, Text,
} from 'react-native';
import { PADDING_TAB, getScreenWidth } from '../common/Constant';
import { wPx2P } from '../utils/ScreenUtil';
import Colors from '../res/Colors';

type Props = {
  btns: Array<{
    onPress: Function,
    backgroundColor?: String,
    disabled: Boolean,
    text: String
  }>,
};

export default class BottomBtnGroup extends PureComponent<Props> {
  render() {
    const { btns } = this.props;
    return (
      <View style={[styles.container, { justifyContent: btns.length === 2 ? 'space-between' : 'flex-end' }]}>
        {
          btns.map(((v, i) => (
            <TouchableOpacity
              key={v.text + i}
              disabled={v.disabled}
              style={[styles.item, { backgroundColor: v.disabled ? '#C7C7C7' : v.backgroundColor || (i === 0 ? '#FFA700' : Colors.OTHER_BACK) }]}
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
    height: 66 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    width: getScreenWidth(),
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
        elevation: 30,
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
