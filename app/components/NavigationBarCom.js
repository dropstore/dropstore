/*
 * @Author: Lsfern
 * @Date: 2019-08-12 14:43:12
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 19:04:36
 * @Description: 导航栏组件
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Label, NavigationBar } from 'teaset';
import CommonColor from '../res/color/CommonColor';

class NavigationBarCom extends PureComponent {
  render() {
    const { isShowLeftView, navigation, headerTitle } = this.props;
    return (
      <NavigationBar
        type="ios"
        style={{ backgroundColor: CommonColor.HEADER_COLOR }}
        tintColor={CommonColor.WHITE_COLOR}
        title={(
          <View style={styles.titleWrapper}>
            <Label style={styles.title} text={headerTitle} />
          </View>
        )}
        leftView={isShowLeftView ? <NavigationBar.BackButton title="Back" onPress={() => navigation.goBack()} /> : <View />}
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
    color: CommonColor.WHITE_COLOR,
    fontSize: 20,
  },
});

export default withNavigation(NavigationBarCom);
