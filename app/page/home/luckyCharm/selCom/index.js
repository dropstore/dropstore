/**
 * @file 锦鲤详情模块
 * @date 2019/9/6
 * @author YDD
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import BuyMainCom from '../../../shopDetail/components/main/self/components/BuyMainCom';
import DrawMainCom from '../../../shopDetail/components/main/self/components/DrawMainCom';
import ShopMainBodyCom from '../../../shopDetail/components/main/ShopMainBodyCom';
import ShopConstant from '../../../../common/ShopConstant';
import RuleCom from "../../../shopDetail/components/main/RuleCom";
import {getShopDetailInfo} from "../../../../redux/reselect/shopDetailInfo";
import {checkTime} from "../../../../utils/TimeUtils";


function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class SelfCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 设置主View
   * @param shopInfo 商品详情
   * @returns {*}
   * @private
   */
  _setMainDOM = (shopInfo) => {
    let b_type = shopInfo.activity.b_type;
    // 参加状态
    let is_join = shopInfo.is_join;
    // 活动开始时间
    let start_time = shopInfo.activity.start_time;
    // 无论是否开始活动，只要状态属于未参加
    if (is_join === ShopConstant.NOT_JOIN) {
      return <ShopMainBodyCom shopInfo={shopInfo}/>
    }
    if (b_type === ShopConstant.DRAW) {
      return <DrawMainCom shopInfo={shopInfo}/>
    }
    if (b_type === ShopConstant.BUY) {
      // 已参加，且活动已开始
      if (checkTime(start_time) < 0) {
        // 团员身份无法查看当前抢鞋状态
        if (is_join === ShopConstant.MEMBER) {
          return <ShopMainBodyCom shopInfo={shopInfo}/>
        }
      }
      // 团长可以查看当前抢鞋状态
      return <BuyMainCom shopInfo={shopInfo}/>
    }
  };

  render() {
    const {shopDetailInfo} = this.props;
    let shopInfo = shopDetailInfo.data;
    return (
      <View>
        <RuleCom shopInfo={shopInfo}/>
        {
          this._setMainDOM(shopInfo)
        }
      </View>
    )
  }
}

export default connect(mapStateToProps)(withNavigation(SelfCom));
