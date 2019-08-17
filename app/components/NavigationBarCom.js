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
        style={{ backgroundColor: Colors.HEADER_COLOR }}
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
    color: Colors.WHITE_COLOR,
    fontSize: 20,
  },
});

export default withNavigation(NavigationBarCom);
