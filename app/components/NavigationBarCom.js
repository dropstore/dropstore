/**
 * @file 通用导航栏组件
 * @date 2019/8/17 10:40
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationBar } from 'teaset';
import { hitSlop } from '../common/Constant';
import Colors from '../res/Colors';
import Images from '../res/Images';
import Image from './Image';

class NavigationBarCom extends PureComponent {
  render() {
    const {
      isShowLeftView, navigation, headerTitle, bgColor, rightView,
    } = this.props;
    return (
      <NavigationBar
        type="ios"
        statusBarStyle="dark-content"
        style={[styles.container, { backgroundColor: (bgColor || Colors.MAIN_BACK) }]}
        tintColor={Colors.WHITE_COLOR}
        title={headerTitle}
        titleStyle={[styles.title, { color: (bgColor ? Colors.WHITE_COLOR : Colors.NORMAL_TEXT_6) }]}
        leftView={isShowLeftView
          ? (
            <TouchableOpacity hitSlop={hitSlop} onPress={() => navigation.goBack()}>
              <Image source={Images.zjt} style={styles.leftImage} resizeMode="contain" />
            </TouchableOpacity>
          )
          : <View />}
        rightView={rightView || <View />}
      />
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa',
  },
  leftImage: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
});

export default withNavigation(NavigationBarCom);
