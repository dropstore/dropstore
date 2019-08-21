/**
 * @file 自营抢购和抽签业务模块
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View,Text} from 'react-native';
import RuleCom from './components/RuleCom';
import PandectCom from './components/PandectCom';
import TeamListCom from './components/TeamListCom';
import Colors from '../../../../../res/Colors';

export default class SelfCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={_styles.container}>
        {/*<ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>*/}
          {/*<RuleCom/>*/}
          {/*<PandectCom/>*/}
          {/*<TeamListCom/>*/}
        {/*</ScrollView>*/}
        <Text>自营抽签和抢购模块</Text>
      </View>
    )
  }
}
const _styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: Colors.WHITE_COLOR
  },
});
