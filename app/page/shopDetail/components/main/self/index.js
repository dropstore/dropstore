import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import BuyMainCom from './components/BuyMainCom';
import DrawMainCom from './components/DrawMainCom';
import ShopMainBodyCom from '../ShopMainBodyCom';
import ShopConstant from '../../../../../common/ShopConstant';
import { checkTime } from '../../../../../utils/TimeUtils';

class SelfCom extends PureComponent {
  render() {
    const { shopInfo } = this.props;
    const b_type = shopInfo.activity.b_type;
    // 参加状态
    const is_join = shopInfo.is_join;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 无论是否开始活动，只要状态属于未参加
    if (is_join === ShopConstant.NOT_JOIN) {
      return <ShopMainBodyCom shopInfo={shopInfo} />;
    } if (b_type === ShopConstant.DRAW) {
      return <DrawMainCom shopInfo={shopInfo} />;
    } if (b_type === ShopConstant.BUY) {
      // 已参加，且活动已开始，团员身份无法查看当前抢鞋状态
      if (checkTime(start_time) < 0 && is_join === ShopConstant.MEMBER) {
        return <ShopMainBodyCom shopInfo={shopInfo} />;
      }
      // 团长可以查看当前抢鞋状态
      return <BuyMainCom shopInfo={shopInfo} />;
    }
  }
}

export default withNavigation(SelfCom);
