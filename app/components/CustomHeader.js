/* @flow */
import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Images from '../res/Images';
import Image from './Image';
import { YaHei } from '../res/FontFamily';
import { STATUSBAR_AND_NAV_HEIGHT, NAV_HEIGHT, STATUSBAR_HEIGHT } from '../common/Constant';

type Props = {
  title: String,
  Right?: any,
  navigation: any,
};

export default class CustomHeader extends PureComponent<Props> {
  static defaultProps = {
    Right: null,
  }

  render() {
    const { title, Right, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title || navigation.getParam('title')}</Text>
        </View>
        <TouchableOpacity style={styles.btnWrapper} onPress={() => navigation.pop()}>
          <Image source={Images.back} style={{ height: 18, width: 11 }} />
        </TouchableOpacity>
        {Right && Right}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: STATUSBAR_AND_NAV_HEIGHT,
    paddingTop: NAV_HEIGHT,
    backgroundColor: '#fff',
  },
  btnWrapper: {
    height: NAV_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 40,
  },
  titleWrapper: {
    marginTop: STATUSBAR_HEIGHT,
    position: 'absolute',
    height: NAV_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    color: '#010101',
    fontSize: 16,
    fontFamily: YaHei,
  },
});
