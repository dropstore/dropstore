/**
 * @file 锦鲤详情模块
 * @date 2019/8/23
 * @author YDD
 */
import React, {PureComponent} from 'react';
import Image, {View,Text} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import LuckBottom from '../../bottom/LuckBottomCom';
import ShopDetail from '../../main/ShopMainBodyCom';
import RuleCom from "../RuleCom";
import {getShopDetailInfo} from "../../../../../redux/reselect/shopDetailInfo";
import {checkTime} from "../../../../../utils/TimeUtils";
import Colors from '../../../../../res/Colors';
import ImageBackground from '../../../../../components/ImageBackground';
import Images from '../../../../../res/Images';
import { commonStyle } from '../../../../../res/style/CommonStyle';


function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class LuckCom extends PureComponent {
  constructor(props) {
    super(props);
  }
  _renderLeading = (item) => {
    return (
      <View style={_styles.listContainer}>
        <View style={[_styles.itemContainer, {backgroundColor: Colors.OTHER_BACK}]}>
          <Text style={[_styles.index, {color: Colors.WHITE_COLOR}]}>1</Text>
          <ImageBackground style={_styles.userImageBg} source={Images.tx} children={
            <Image style={_styles.userImage} source={item.avatar}/>
          }/>
          <View style={{flex: 1, marginLeft: 12}}>
            <View style={commonStyle.row}>
              <Text style={[_styles.qhStatus, {color: Colors.WHITE_COLOR}]}>已取号</Text>
              {/*<Text style={[_styles.code, {color: Colors.WHITE_COLOR}]}>{item.code}</Text>*/}
              <Text style={[_styles.code, {color: Colors.WHITE_COLOR}]}>001122212</Text>
            </View>
            <View style={[commonStyle.row, {marginTop: 7}]}>
              <Image style={_styles.jt} source={Images.shape_1_ji3}/>
              <Text style={[_styles.userName, {color: Colors.WHITE_COLOR}]}>{item.user_name}</Text>
              <Image style={_styles.sexImage} source={Images.xt_xn}/>
            </View>
          </View>
          {/*<View style={{justifyContent: 'center', alignItems: 'flex-start', marginRight: 17}}>*/}
          {/*  <Text style={[_styles.zg, {marginBottom: 5}]}>我的助攻团队：{joinUserLength}人</Text>*/}
          {/*  <Text style={[_styles.zg, {marginTop: 5}]}>助攻佣金：{userActivity.pay_price}￥</Text>*/}
          {/*</View>*/}
        </View>
      </View>
    )
  };
  render() {
    // const {shopDetailInfo} = this.props;
    let {shopDetailInfo} = this.props

    return (
      <View>
        <RuleCom shopInfo={shopDetailInfo}/>
        {
          shopDetailInfo.is_join?this._renderLeading(shopDetailInfo):<ShopDetail />
        }
      </View>
    )
  }
}

export default connect(mapStateToProps)(withNavigation(LuckCom));
