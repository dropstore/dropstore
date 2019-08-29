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
import {getReShoesList, getShopDetailInfo} from "../../../../../redux/reselect/shopDetailInfo";
import {bindActionCreators} from "redux";
import {getShoesList, getShopDetail} from "../../../../../redux/actions/shopDetailInfo";
import {checkTime} from "../../../../../utils/TimeUtils";
import commission from "../../../../commission";
import {shoesList, shopDetail1} from "../../../../TempData";
import {debounce} from "../../../../../utils/commonUtils";
import {showToast} from "../../../../../utils/MutualUtil";

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
    shoesInfo: getReShoesList(state)
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
    getShoesList,
  }, dispatch);
}

class SelfBottomCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      overSelShoeSizeKey: -1,
    }
  }

  _setMainDOM = (shopInfo) => {
    // 活动子类型:1、抽签；2、抢购
    let b_type = shopInfo.activity.b_type;
    // 活动开始时间
    let start_time = shopInfo.activity.start_time;
    // 活动未开始
    if (checkTime(start_time) > 0) {
      return this._normalDOM(shopInfo);
    }
    if (b_type === ShopConstant.DRAW) {
      return this._normalDOM(shopInfo);
    }
    return <BuyBottomCom shopInfo={shopInfo}/>
  };
  _normalDOM = (shopInfo) => {
    return (
      <View style={bottomStyle.bottomView}>
        <TouchableOpacity onPress={() => alert('通知我')}>
          <Image style={bottomStyle.buttonNormalView} source={Images.tzw}/>
        </TouchableOpacity>
        {
          this._setRightDOM(shopInfo)
        }
      </View>
    );
  };
  _setRightDOM = (shopInfo) => {
    let is_join = shopInfo.is_join;
    // 未参加活动
    if (is_join === ShopConstant.NOT_JOIN) {
      return (
        <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                         onPress={debounce(this.showOver)}>
          <Text style={bottomStyle.buttonText}>选择尺码</Text>
        </ImageBackground>
      )
    }
    return (
      <ImageBackground style={bottomStyle.buttonNormalView} source={Images.bg_right}
                       onPress={debounce(this._toCommissionPage)}>
        <Text style={bottomStyle.buttonText}>邀请助攻</Text>
      </ImageBackground>
    )
  };

  _toCommissionPage = () => {
    const {navigation} = this.props;
    navigation.push('commission', {title:'助攻佣金设定'})
  };

  /**
   * 显示选鞋浮层
   */
  showOver = () => {
    const {shopDetailInfo, navigation, getShoesList} = this.props;
    const shopInfo = shopDetailInfo.data;
    getShoesList(shopInfo.activity.id).then(isSuccess => {
      if (isSuccess) {
        const {shoesInfo} = this.props;
        const myShoesList = shoesInfo.shoesList;
        if (myShoesList && myShoesList.length !== 0) {
          let olView = (
            <Overlay.PullView>
              <SelectShoeSizeCom
                navigation={navigation}
                shopInfo={shopInfo}
                shoesList={myShoesList}
                closeOver={this.closeOver.bind(this)}/>
            </Overlay.PullView>
          );
          let key = Overlay.show(olView);
          this.setState({overSelShoeSizeKey: key})
        }
      }
    });
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
    const {shopDetailInfo} = this.props;
    const shopInfo = shopDetailInfo.data;
    return this._setMainDOM(shopInfo);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SelfBottomCom))
