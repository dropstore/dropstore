/**
 * @file 抽签成员详情组件
 * @date 2019/8/22 17:29
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../../../../../common/Constant';
import Colors from '../../../../../../res/Colors';
import { Mario, YaHei } from '../../../../../../res/FontFamily';
import { commonStyle } from '../../../../../../res/style/CommonStyle';
import { AvatarWithShadow, NameAndGender } from '../../../../../../components';

export default class DrawMainCom extends PureComponent {
  _renderLeading = (item, index, userActivity, joinUserLength) => (
    <View key={`leading-${index}`} style={styles.listContainer}>
      <AvatarWithShadow source={{ uri: item.avatar }} size={55} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <NameAndGender name={item.user_name} sex={item.sex} />
        { !!item.code && <Text style={[styles.qhStatus, { color: Colors.WHITE_COLOR }]}>已取号</Text> }
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginRight: 17 }}>
        <Text style={[styles.zg, { marginBottom: 5 }]}>{`我的团队：${joinUserLength}人`}</Text>
        <Text style={[styles.zg, { marginTop: 5 }]}>{`助攻佣金：${userActivity.pay_price / 100}￥`}</Text>
      </View>
    </View>
  );

  _renderMember = (item, index) => (
    <View key={`member-${index}`} style={styles.listContainer}>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={commonStyle.row}>
          <Text style={[styles.qhStatus, { color: Colors.NORMAL_TEXT_1E }]}>已取号</Text>
          <Text style={[styles.code, { color: Colors.NORMAL_TEXT_1E }]}>{item.code}</Text>
        </View>
        <View style={[commonStyle.row, { marginTop: 7 }]}>
          <Text style={[styles.userName, { color: Colors.NORMAL_TEXT_1E }]}>{item.user_name}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    const { shopInfo } = this.props;
    const joinUser = shopInfo.join_user;
    console.log(joinUser);
    const userActivity = shopInfo.user_activity;
    const number = userActivity.number;
    return (
      <View style={styles.container}>
        <View style={styles.fengexian} />
        <View style={styles.acContainer}>
          <Text style={styles.acNormalMes}>
            {'预期购买'}
            <Text style={styles.acImpMes}>{number}</Text>
            {'双'}
          </Text>
          <Text style={styles.acNormalMes}>
            {'团队上限'}
            <Text style={styles.acImpMes}>{number}</Text>
            {'人'}
          </Text>
          <Text style={styles.acNormalMes}>
            {'参与人数'}
            <Text style={styles.acImpMes}>{joinUser.length}</Text>
            {'人'}
          </Text>
          <Text style={styles.acNormalMes}>
            {'还差'}
            <Text style={styles.acImpMes}>{number - joinUser.length}</Text>
            {'人满额'}
          </Text>
        </View>
        {
          joinUser && joinUser.map((item, index) => (
            index === 0 ? this._renderLeading(item, index, userActivity, joinUser.length) : this._renderMember(item, index)
          ))
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MAIN_BACK,
    flex: 1,
  },
  fengexian: {
    backgroundColor: '#ddd',
    width: SCREEN_WIDTH - 34,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 17,
  },
  acContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 17,
    height: 30,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  acNormalMes: {
    fontSize: 11,
    color: '#333',
    fontFamily: YaHei,
    fontWeight: '400',
    marginLeft: 17,
  },
  acImpMes: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  listContainer: {
    marginHorizontal: 10,
    marginTop: 7,
    height: 68,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 67,
  },
  index: {
    fontSize: 12,
    fontFamily: Mario,
    marginLeft: 8,
  },
  userImageBg: {
    width: 54,
    height: 53,
    marginLeft: 7,
  },
  userImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    marginLeft: 5,
  },
  qhStatus: {
    fontSize: 10,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  code: {
    fontSize: 11,
    marginLeft: 12,
  },
  zg: {
    fontSize: 12,
    fontFamily: YaHei,
    fontWeight: '400',
    color: Colors.WHITE_COLOR,
  },
  jt: {
    width: 8,
    height: 9,
  },
  userName: {
    fontSize: 11,
  },
  sexImage: {
    width: 12,
    height: 11,
    marginLeft: 5,
  },
});
