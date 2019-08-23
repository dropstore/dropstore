/**
 * @file 通用导航栏组件
 * @date 2019/8/17 10:40
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Label, NavigationBar } from 'teaset';
import Colors from '../res/Colors';

class NavigationBarCom extends PureComponent {
  render() {
    const { isShowLeftView, navigation, headerTitle } = this.props;
    return (
      <NavigationBar
        type="ios"
        statusBarStyle="dark-content"
        style={styles.container}
        tintColor={Colors.WHITE_COLOR}
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
    color: Colors.NORMAL_TEXT_0,
    fontSize: 20,
  },
  container: {
    backgroundColor: Colors.MAIN_BACK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa',
  },
});

export default withNavigation(NavigationBarCom);
