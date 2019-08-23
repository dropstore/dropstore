/**
 * @file 通用导航栏组件
 * @date 2019/8/17 10:40
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Label, NavigationBar} from 'teaset';
import Colors from '../res/Colors';
import Images from "../res/Images";
import Image from '../components/Image';

class NavigationBarCom extends PureComponent {
  render() {
    const {isShowLeftView, navigation, headerTitle, bgColor, rightView} = this.props;
    return (
      <NavigationBar
        type="ios"
        statusBarStyle="dark-content"
        style={[styles.container, {backgroundColor: (bgColor ? bgColor : Colors.MAIN_BACK)}]}
        tintColor={Colors.WHITE_COLOR}
        title={(
          <View style={styles.titleWrapper}>
            <Label style={[styles.title, {color: (bgColor ? Colors.WHITE_COLOR : Colors.NORMAL_TEXT_6)}]}
                   text={headerTitle}/>
          </View>
        )}
        leftView={isShowLeftView ?
          <TouchableOpacity style={styles.leftImage} onPress={() => navigation.goBack()}>
            <Image source={Images.zjt} style={styles.leftImage}/>
          </TouchableOpacity> : <View/>}
        rightView={rightView ? rightView : <View/>}
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
    fontSize: 16,
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa',
  },
  leftImage: {
    width: 6,
    height: 10,
    marginLeft: 8
  }
});

export default withNavigation(NavigationBarCom);
