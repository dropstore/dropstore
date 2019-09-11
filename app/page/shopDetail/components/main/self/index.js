/**
 * @file 自营抽签和抢购成员模块
 * @date 2019/8/22 17:10
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import BuyMainCom from './components/BuyMainCom';
import DrawMainCom from './components/DrawMainCom';
import ShopMainBodyCom from '../ShopMainBodyCom';
import ShopConstant from '../../../../../common/ShopConstant';
import RuleCom from '../RuleCom';
import { getShopDetailInfo } from '../../../../../redux/reselect/shopDetailInfo';
import { checkTime } from '../../../../../utils/TimeUtils';


function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class SelfCom extends PureComponent {
  /**
   * 设置主View
   * @param shopInfo 商品详情
   * @returns {*}
   * @private
   */
  _setMainDOM = (shopInfo) => {
    const b_type = shopInfo.activity.b_type;
    // 参加状态
    const is_join = shopInfo.is_join;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 无论是否开始活动，只要状态属于未参加
    if (is_join === ShopConstant.NOT_JOIN) {
      return <ShopMainBodyCom shopInfo={shopInfo} />;
    }
    if (b_type === ShopConstant.DRAW) {
      return <DrawMainCom shopInfo={shopInfo} />;
    }
    if (b_type === ShopConstant.BUY) {
      // 已参加，且活动已开始
      if (checkTime(start_time) < 0) {
        // 团员身份无法查看当前抢鞋状态
        if (is_join === ShopConstant.MEMBER) {
          return <ShopMainBodyCom shopInfo={shopInfo} />;
        }
      }
      // 团长可以查看当前抢鞋状态
      return <BuyMainCom shopInfo={shopInfo} />;
    }
  };

  render() {
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    return (
      <View>
        <RuleCom shopInfo={shopInfo} />
        {
          this._setMainDOM(shopInfo)
        }
      </View>
    );
  }
}

export default connect(mapStateToProps)(withNavigation(SelfCom));
