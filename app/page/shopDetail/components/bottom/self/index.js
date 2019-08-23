/**
 * @file 自营底部组件
 * 抽签抢购公共部分
 * @date 2019/8/22 15:14
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from "react-redux";
import {Overlay} from "teaset";
import Image from '../../../../../components/Image';
import ImageBackground from '../../../../../components/ImageBackground';
import SelectShoeSizeCom from '../../overlay/SelectShoeSizeCom';
import BuyBottomCom from './BuyBottomCom';
import Images from '../../../../../res/Images';
import Colors from '../../../../../res/Colors';
import {bottomStyle} from '../../../../../res/style/BottomStyle';
import ShopConstant from '../../../../../common/ShopConstant';
import {hideOlView} from '../../../../../utils/ViewUtils';
import {getShopDetailInfo} from "../../../../../redux/reselect/shopDetailInfo";
import {bindActionCreators} from "redux";
import {getShopDetail} from "../../../../../redux/actions/shopDetailInfo";
import {checkTime} from "../../../../../utils/TimeUtils";
import commission from "../../../../commission";
import {shopDetail1} from "../../../../TempData";

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
  }, dispatch);
}

class SelfBottomCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      overSelShoeSizeKey: -1,
    }
  }

  _setMainDOM = (shopInfo, navigation) => {
    // 活动子类型:1、抽签；2、抢购
    let b_type = shopInfo.activity.b_type;
    // 活动开始时间
    let start_time = shopInfo.activity.start_time;
    // 活动未开始
    if (checkTime(start_time)) {
      return this._normalDOM(shopInfo, navigation);
    }
    if (b_type === ShopConstant.DRAW) {
      return this._normalDOM(shopInfo, navigation);
    }
    return <BuyBottomCom shopInfo={shopInfo}/>
  };
  _normalDOM = (shopInfo, navigation) => {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => alert('通知我')}>
          <Image style={bottomStyle.buttonNormalView} source={Images.tzw}/>
        </TouchableOpacity>
        {
          this._setRightDOM(shopInfo, navigation)
        }
      </View>
    );
  };
  _setRightDOM = (shopInfo, navigation) => {
    let is_join = shopInfo.is_join;
    // 未参加活动
    if (is_join === ShopConstant.NOT_JOIN) {
      return (
        <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                         onPress={() => this.showOver(shopInfo, navigation)}>
          <Text style={bottomStyle.buttonText}>选择尺码</Text>
        </ImageBackground>
      )
    }
    return (
      <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                       onPress={() => navigation.push('commission', {title: '助攻佣金设定',})}>
        <Text style={bottomStyle.buttonText}>邀请助攻</Text>
      </ImageBackground>
    )
  };

  /**
   * 显示选鞋浮层
   * @param shopInfo
   * @param navigation
   */
  showOver = (shopInfo, navigation) => {
    let olView = (
      <Overlay.PullView>
        <SelectShoeSizeCom
          navigation={navigation}
          shopInfo={shopInfo}
          getShopDetail={this.getShopDetail.bind(this)}
          closeOver={this.closeOver.bind(this)}/>
      </Overlay.PullView>
    );
    let key = Overlay.show(
      olView
    );
    this.setState({overSelShoeSizeKey: key})
  };

  /**
   * 关闭浮层
   */
  closeOver() {
    hideOlView(this.state.overSelShoeSizeKey);
  };

  getShopDetail() {
    const {getShopDetail} = this.props;
    getShopDetail(shopDetail1)
  };

  render() {
    const {shopDetailInfo, navigation} = this.props;
    const shopInfo = shopDetailInfo.shopData.data;
    return this._setMainDOM(shopInfo, navigation);
  }
}

const _styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
  },
  selShoe: {
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SelfBottomCom))
