import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getScreenWidth } from '../../../common/Constant';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';
import { AvatarWithShadow, NameAndGender } from '../../../components';

export default class MemberCom extends PureComponent {
  renderLeader = (item, userActivity, joinUserLength) => (
    <View style={styles.listContainer}>
      <AvatarWithShadow source={{ uri: item.avatar }} size={55} />
      <View style={{ flex: 1, marginLeft: 12, paddingTop: 4 }}>
        <NameAndGender name={item.user_name} sex={item.sex} />
        <Text style={{ color: '#111', fontSize: 11, marginTop: 2 }}>已取号</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5 }}>
        <View>
          <Text style={{ color: '#696969', fontSize: 11 }}>{`我的团队：${joinUserLength}人`}</Text>
          <Text style={{ color: '#696969', fontSize: 11 }}>{`助攻佣金：${userActivity.pay_price / 100}￥`}</Text>
        </View>
      </View>
    </View>
  );

  renderMember = (item, index) => (
    <View key={index} style={styles.item}>
      <AvatarWithShadow source={{ uri: item.avatar }} size={41} />
      <Text style={{ marginTop: 5, fontSize: 10 }}>{item.user_name}</Text>
    </View>
  )

  render() {
    const { shopInfo } = this.props;
    const joinUser = shopInfo.join_user;
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
        {joinUser && this.renderLeader(joinUser[0], userActivity, joinUser.length)}
        <View style={styles.list2Container}>
          {joinUser && joinUser.slice(1).map(this.renderMember) }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MAIN_BACK,
    minHeight: '200%',
  },
  fengexian: {
    backgroundColor: '#ddd',
    width: getScreenWidth() - 34,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 17,
  },
  acContainer: {
    width: getScreenWidth(),
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
    color: Colors.RED,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  list2Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 7,
  },
  listContainer: {
    marginHorizontal: 10,
    marginTop: 7,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  item: {
    width: (getScreenWidth() - 20) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
