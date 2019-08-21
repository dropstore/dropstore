/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import EmptyViewCom from '../../components/EmptyViewCom';
import ShopBasicInfoCom from './components/basic/ShopBasicInfoCom';
import ShopMainBodyCom from './components/main/ShopMainBodyCom';
import SelfCom from "./components/main/self";
import LuckyCom from "./components/main/lucky";
import SelfBottomCom from "./components/bottom/SelfBottomCom";
import LuckBottomCom from "./components/bottom/LuckBottomCom";
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import RuleCom from "./components/main/self/components/RuleCom";

class ShopDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 设置主题内容和底部UI
   * @param type
   * @param {boolean} isBottom 是否是底部UI调用
   * TODO:后期模块增多后，需优化
   * @returns {*}
   */
  setContentOrBottomUIByType = (type, isBottom) => {
    // 发售、自营
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return this._showSelf(isBottom);
    }
    // 锦鲤
    if (type === ShopConstant.LUCKY_CHARM) {
      if (isBottom) {
        return <LuckBottomCom/>
      }
      // 不显示主体内容
      return <LuckyCom/>
    }
  };

  /**
   * 设置发售和自营布局
   * @param isBottom
   * @returns {*}
   * @private
   */
  _showSelf = (isBottom) => {
    if (isBottom) {
      return <SelfBottomCom type={1} status={1}/>
    }
    // 发售详情 === 自营的抽签模块`
    let isChooseShoeSize = false;
    if (isChooseShoeSize) {// 是否已选择完尺寸，接口状态值
      return (
        <View>
          <RuleCom type={1} status={1}/>
          <SelfCom/>
        </View>
      )
    }
    return (
      <View>
        <RuleCom type={1} status={1}/>
        <ShopMainBodyCom/>
      </View>
    )
  };

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item');
    const shopId = navigation.getParam('shopId');
    const type = navigation.getParam('type');
    return (
      <View style={_styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <ShopBasicInfoCom item={item}/>
          <EmptyViewCom/>
          {
            this.setContentOrBottomUIByType(type, false)
          }
        </ScrollView>
        {
          this.setContentOrBottomUIByType(type, true)
        }
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR
  },
  // emptyView: {
  //   width: '100%',
  //   height: 18,
  //   backgroundColor: Colors.NORMAL_TEXT_F6
  // },

});
export default withNavigation(ShopDetail)
