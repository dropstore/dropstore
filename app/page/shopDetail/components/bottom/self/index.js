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
import Image from '../../../../../components/Image';
import ImageBackground from '../../../../../components/ImageBackground';
import SelectShoeSizeCom from '../../other/SelectShoeSizeCom';
import BuyBottomCom from './BuyBottomCom';
import Images from '../../../../../res/Images';
import Colors from '../../../../../res/Colors';
import {bottomStyle} from '../../../../../res/style/BottomStyle';
import ShopConstant from '../../../../../common/ShopConstant';
import {getReShoesList, getShopDetailInfo} from "../../../../../redux/reselect/shopDetailInfo";
import {bindActionCreators} from "redux";
import {getShoesList, getShopDetail} from "../../../../../redux/actions/shopDetailInfo";
import {checkTime} from "../../../../../utils/TimeUtils";
import commission from "../../../../commission";
import {shopDetail1} from "../../../../TempData";
import {debounce} from "../../../../../utils/commonUtils";
import Modalbox from "react-native-modalbox";
import {SCREEN_WIDTH} from "../../../../../common/Constant";

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
      myShoesList: []
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
    const {shopDetailInfo, navigation} = this.props;
    const shopInfo = shopDetailInfo.data;
    // 邀请人数达到上限，需重新选择尺码
    if (shopInfo.user_activity.number === shopInfo.join_user.length - 1) {
      this.showOver();
    } else {
      navigation.push('commission', {title: '助攻佣金设定'})
    }
  };

  /**
   * 显示选鞋浮层
   */
  showOver = () => {
    const {shopDetailInfo, getShoesList} = this.props;
    const shopId = shopDetailInfo.data.activity.id;
    getShoesList(shopId).then(isSuccess => {
      if (isSuccess) {
        const {shoesInfo} = this.props;
        const myShoesList = shoesInfo.shoesList;
        if (myShoesList && myShoesList.length !== 0) {
          this.setState({myShoesList: myShoesList}, () => {
            this.selShoeBox && this.selShoeBox.open();
          })
        }
      }
    });
  };
  closeBox = () => {
    this.selShoeBox && this.selShoeBox.close();
  };

  getShopDetail() {
    const {getShopDetail} = this.props;
    getShopDetail(shopDetail1)
  };

  render() {
    const {navigation, shopDetailInfo} = this.props;
    const shopInfo = shopDetailInfo.data;
    const shopId = shopInfo.activity.id;
    return (
      <View>
        {
          this._setMainDOM(shopInfo)
        }
        <Modalbox
          position="bottom"
          style={_styles.container}
          ref={(v) => {
            this.selShoeBox = v;
          }}
        >
          <SelectShoeSizeCom shopId={shopId}
                             navigation={navigation}
                             shopInfo={shopInfo}
                             shoesList={this.state.myShoesList}
                             closeBox={this.closeBox}
          />
        </Modalbox>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: Colors.WHITE_COLOR,
    height:400
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SelfBottomCom))
