/**
 * @file 锦鲤详情模块
 * @date 2019/8/23
 * @author YDD
 */
import React, {PureComponent} from 'react';
import {View,Text} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import LuckBottom from '../../bottom/LuckBottomCom';
import ShopDetail from '../../main/ShopMainBodyCom';
import RuleCom from "../RuleCom";
import {getShopDetailInfo} from "../../../../../redux/reselect/shopDetailInfo";
import {checkTime} from "../../../../../utils/TimeUtils";


function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class LuckCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {shopDetailInfo} = this.props;
    let shopInfo = shopDetailInfo.shopData.data;

    return (
      <View>
        <RuleCom shopInfo={shopInfo}/>
        <ShopDetail />
      </View>
    )
  }
}

export default connect(mapStateToProps)(withNavigation(LuckCom));
