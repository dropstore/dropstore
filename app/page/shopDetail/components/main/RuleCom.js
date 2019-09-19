/**
 * @file 抽签、抢购、锦鲤规则组件
 * @date 2019/8/19 13:50
 * @author ZWW
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from '../../../../components/Image';
import { YaHei } from '../../../../res/FontFamily';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import ShopConstant from '../../../../common/ShopConstant';
import { checkTime } from '../../../../utils/TimeUtils';


export default class RuleCom extends PureComponent {
  /**
   * 设置主View
   * @param shopInfo 商品详情
   * @returns {*}
   * @private
   */
  _setMainDOM = (shopInfo) => {
    // 活动子类型:1、抽签；2、抢购;3 锦鲤
    const b_type = shopInfo.activity.b_type;
    // 参加状态
    const is_join = shopInfo.is_join;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    if (b_type === ShopConstant.LUCKY_CHARM) {
      return this._drawLuckRulesCom(is_join, start_time);
    }
    if (b_type === ShopConstant.DRAW) {
      return this._drawStatus(is_join);
    }
    if (b_type === ShopConstant.BUY) {
      return this._buyStatus(is_join, start_time);
    }
  };

  /**
   * 抽签模块
   * @param status 参加状态
   * @returns {*}
   * @private
   */
  _drawStatus = (status) => {
    // 未参加
    if (status === ShopConstant.NOT_JOIN) {
      return (
        <View style={_styles.mainView}>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex1} />
            <View>
              <Text style={_styles.textView}>有偿邀请</Text>
              <Text style={_styles.textView}>好友领签</Text>
            </View>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex2} />
            <Text style={_styles.textView}>设置佣金</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex3} />
            <Text style={_styles.textView}>队员中签</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex4} />
            <View>
              <Text style={_styles.textView}>中签好友</Text>
              <Text style={_styles.textView}>获得佣金</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={_styles.mainView}>
        <View style={_styles.itemMainView}>
          <Image style={_styles.imageView} source={Images.ex1} />
          <Text style={_styles.textView}>选择商品</Text>
        </View>
        <View style={_styles.itemMainView}>
          <Image style={_styles.imageView} source={Images.ex2} />
          <View>
            <Text style={_styles.textView}>发起助攻</Text>
            <Text style={_styles.textView}>设定奖金</Text>
          </View>
        </View>
        <View style={_styles.itemMainView}>
          <Image style={_styles.imageView} source={Images.ex3} />
          <View>
            <Text style={_styles.textView}>等待好友</Text>
            <Text style={_styles.textView}>助攻支付</Text>
          </View>
        </View>
        <View style={_styles.itemMainView}>
          <Image style={_styles.imageView} source={Images.ex4} />
          <View>
            <Text style={_styles.textView}>达到人数</Text>
            <Text style={_styles.textView}>查看结果</Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * 抢购模块
   * @param status 参加状态
   * @param start_time 开始时间
   * @returns {*}
   * @private
   */
  _buyStatus = (status, start_time) => {
    // 活动已开始
    if (checkTime(start_time) < 0) {
      // 未参加
      if (status === ShopConstant.NOT_JOIN) {
        return <View />;
      }
      // 团员身份无法查看当前抢鞋状态
      if (status === ShopConstant.MEMBER) {
        return <View />;
      }
      // 只有团长可以看当前抢鞋状态
      return this._joinBuyDOM();
    }

    // 未参加活动
    if (status === ShopConstant.NOT_JOIN) {
      return (
        <View style={_styles.mainView}>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex1} />
            <View>
              <Text style={_styles.textView}>有偿邀请</Text>
              <Text style={_styles.textView}>好友抢鞋</Text>
            </View>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex2} />
            <Text style={_styles.textView}>设置佣金</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex3} />
            <Text style={_styles.textView}>抢鞋成功</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex4} />
            <Text style={_styles.textView}>获得佣金</Text>
          </View>
        </View>
      );
    }
    // 已参加活动
    return this._joinBuyDOM();
  };

  _joinBuyDOM = () => (
    <View style={_styles.mainView}>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex1} />
        <Text style={_styles.textView}>选择商品</Text>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex2} />
        <View>
          <Text style={_styles.textView}>发起助攻</Text>
          <Text style={_styles.textView}>设定奖金</Text>
        </View>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex3} />
        <View>
          <Text style={_styles.textView}>等待好友</Text>
          <Text style={_styles.textView}>助攻支付</Text>
        </View>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex4} />
        <View>
          <Text style={_styles.textView}>达到人数</Text>
          <Text style={_styles.textView}>查看结果</Text>
        </View>
      </View>
    </View>
  );

  /**
   * 锦鲤模块
   * @returns {*}
   * @private
   */
  _drawLuckRulesCom = () => (
    <View style={_styles.mainView}>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex1} />
        <View>
          <Text style={_styles.textView}>首次分享</Text>
          <Text style={_styles.textView}>(签号*1)</Text>
        </View>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex2} />
        <View>
          <Text style={_styles.textView}>好友注册</Text>
          <Text style={_styles.textView}>登录app</Text>
        </View>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex3} />
        <View>
          <Text style={_styles.textView}>好友激活</Text>
          <Text style={_styles.textView}>(签号*5)</Text>
        </View>
      </View>
      <View style={_styles.itemMainView}>
        <Image style={_styles.imageView} source={Images.ex4} />
        <View>
          <Text style={_styles.textView}>查看结果</Text>
          <Text style={_styles.textView}>免费领取</Text>
        </View>
      </View>
    </View>
  )

  render() {
    const { shopInfo } = this.props;
    return this._setMainDOM(shopInfo);
  }
}

const _styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: Colors.MAIN_BACK,
    borderTopWidth: 18,
  },
  itemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: 20,
    height: 20,
  },
  textView: {
    fontSize: 11,
    fontFamily: YaHei,
    fontWeight: '400',
    color: '#222',
    marginLeft: 3,
  },
});
