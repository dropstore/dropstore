/* eslint-disable react/no-array-index-key */
/**
 * @file 抽签、抢购、锦鲤规则组件
 * @date 2019/8/19 13:50
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YaHei } from '../../../res/FontFamily';
import Colors from '../../../res/Colors';
import ShopConstant from '../../../common/ShopConstant';
import { checkTime } from '../../../utils/TimeUtils';

const DATA_1 = [
  ['选择商品'],
  ['发起助攻', '设定奖金'],
  ['等待好友', '助攻支付'],
  ['达到人数', '查看结果'],
];
const DATA_2 = [
  ['有偿邀请', '好友领签'],
  ['设置佣金'],
  ['队员中签'],
  ['中签好友', '获得佣金'],
];
const DATA_3 = [
  ['有偿邀请', '好友抢鞋'],
  ['设置佣金'],
  ['抢鞋成功'],
  ['获得佣金'],
];
const DATA_4 = [
  ['首次分享', '(签号*1)'],
  ['好友注册', '登录app'],
  ['好友激活', '(签号*5)'],
  ['查看结果', '免费领取'],
];

export default class RuleCom extends PureComponent {
  /**
   * 抽签模块
   * @param status 参加状态
   * @returns {*}
   * @private
   */
  drawStatus = (status) => {
    // 未参加
    if (status === ShopConstant.NOT_JOIN) {
      return this.renderMain(DATA_2);
    }
    return this.renderMain(DATA_1);
  };

  /**
   * 抢购模块
   * @param status 参加状态
   * @param start_time 开始时间
   * @returns {*}
   * @private
   */
  buyStatus = (status, start_time) => {
    // 活动已开始
    if (checkTime(start_time) < 0) {
      // 未参加
      if (status === ShopConstant.NOT_JOIN) {
        return null;
      }
      // 团员身份无法查看当前抢鞋状态
      if (status === ShopConstant.MEMBER) {
        return null;
      }
      // 只有团长可以看当前抢鞋状态
      return this.renderMain(DATA_1);
    }

    // 未参加活动
    if (status === ShopConstant.NOT_JOIN) {
      return this.renderMain(DATA_3);
    }
    // 已参加活动
    return this.renderMain(DATA_1);
  };

  renderMain = data => (
    <View style={styles.mainView}>
      {
        data.map((group, index) => (
          <View key={`group-${index}`} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.numberWrapper}>
              <Text style={styles.number}>{index + 1}</Text>
            </View>
            <View>
              { group.map(item => <Text key={item} style={{ fontSize: 10, color: '#111' }}>{item}</Text>) }
            </View>
          </View>
        ))
      }
    </View>
  )

  render() {
    const { shopInfo } = this.props;
    // 活动子类型:1、抽签；2、抢购;3 锦鲤
    const b_type = shopInfo.activity.b_type;
    // 参加状态
    const is_join = shopInfo.is_join;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    if (b_type === ShopConstant.LUCKY_CHARM) {
      return this.renderMain(DATA_4);
    }
    if (b_type === ShopConstant.DRAW) {
      return this.drawStatus(is_join);
    }
    if (b_type === ShopConstant.BUY) {
      return this.buyStatus(is_join, start_time);
    }
    return null;
  }
}

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: Colors.MAIN_BACK,
    borderTopWidth: 8,
    backgroundColor: '#fff',
  },
  numberWrapper: {
    height: 21,
    width: 21,
    backgroundColor: '#D6D6D6',
    borderRadius: 10.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  number: {
    fontSize: 13,
    fontFamily: YaHei,
    color: '#fff',
  },
});
