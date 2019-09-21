/**
 * @file 自营底部组件
 * 抽签抢购公共部分
 * @date 2019/8/22 15:14
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../../../../components/Image';
import ImageBackground from '../../../../../components/ImageBackground';
import SelectShoeSizeCom from '../../other/SelectShoeSizeCom';
import BuyBottomCom from './BuyBottomCom';
import Images from '../../../../../res/Images';
import { bottomStyle } from '../../../../../res/style/BottomStyle';
import ShopConstant from '../../../../../common/ShopConstant';
import { getReShoesList, getShopDetailInfo } from '../../../../../redux/reselect/shopDetailInfo';
import { getShoesList, getShopDetail } from '../../../../../redux/actions/shopDetailInfo';
import { checkTime } from '../../../../../utils/TimeUtils';
import { shopDetail1 } from '../../../../TempData';
import { debounce } from '../../../../../utils/commonUtils';
import { wPx2P } from '../../../../../utils/ScreenUtil';
import {
  showShare, showToast, closeModalbox, showModalbox,
} from '../../../../../utils/MutualUtil';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
    shoesInfo: getReShoesList(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
    getShoesList,
  }, dispatch);
}

class SelfBottomCom extends PureComponent {
  getShopDetail() {
    const { getShopDetail } = this.props;
    getShopDetail(shopDetail1);
  }

  _toCommissionPage = () => {
    const { navigation } = this.props;
    navigation.push('commission', { title: '助攻佣金设定' });
  };

  /**
   * 显示选鞋浮层
   */
  _showOver = () => {
    const { shopDetailInfo, getShoesList, navigation } = this.props;
    const shopId = shopDetailInfo.data.activity.id;
    getShoesList(shopId).then((shoesList) => {
      if (shoesList && shoesList.length > 0) {
        showModalbox({
          element: (<SelectShoeSizeCom
            shopId={shopId}
            navigation={navigation}
            shopInfo={shopDetailInfo.data}
            shoesList={shoesList}
            closeBox={this.closeBox}
          />),
          options: {
            style: {
              height: 400,
              backgroundColor: 'transparent',
            },
            position: 'bottom',
          },
        });
      }
    });
  };

  closeBox = () => {
    closeModalbox();
  };

  _setMainDOM = (shopInfo) => {
    const { navigation } = this.props;
    // 活动子类型:1、抽签；2、抢购
    const b_type = shopInfo.activity.b_type;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 活动未开始
    if (checkTime(start_time) > 0) {
      return this._normalDOM(shopInfo, false);
    }
    if (b_type === ShopConstant.DRAW) {
      return <View />;
      // return this._normalDOM(shopInfo, true);
    }
    return (
      <BuyBottomCom
        navigation={navigation}
        shopInfo={shopInfo}
        showModalbox={showModalbox}
        closeModalbox={closeModalbox}
      />
    );
  };

  /**
   * @param shopInfo 商品信息
   * @param isStart 活动是否开始
   * @returns {*}
   * @private
   */
  _normalDOM = (shopInfo, isStart) => {
    const isJoin = shopInfo.is_join;
    const joinUser = shopInfo.join_user;
    // 活动未开始且是参团人员
    if (isJoin === ShopConstant.MEMBER && !isStart) {
      if (shopInfo.activity.b_type === ShopConstant.DRAW) {
        return <View />;
      }
      return (
        <View style={bottomStyle.bottomView}>
          <View />
          <TouchableOpacity style={[bottomStyle.buttonNormalView, { backgroundColor: '#FFA700' }]} onPress={() => showToast('活动未开始')}>
            <Text style={bottomStyle.buttonText}>助攻抢购</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (joinUser.length !== 0) {
      return (
        <View style={bottomStyle.bottomView}>
          <TouchableOpacity style={[bottomStyle.buttonNormalView, { backgroundColor: '#FFA700' }]} onPress={debounce(this._showShare)}>
            <Text style={bottomStyle.buttonText}>分享</Text>
          </TouchableOpacity>
          { this._setRightDOM(shopInfo) }
        </View>
      );
    }
    return (
      <View style={bottomStyle.bottomView}>
        <TouchableOpacity style={[bottomStyle.buttonNormalView, { backgroundColor: '#FFA700' }]} onPress={() => showToast('已添加到通知')}>
          <Text style={bottomStyle.buttonText}>通知我</Text>
        </TouchableOpacity>
        { this._setRightDOM(shopInfo) }
      </View>
    );
  };

  _setRightDOM = (shopInfo) => {
    const is_join = shopInfo.is_join;
    // 是否存在未支付的佣金
    const isPay = shopInfo.user_activity.pay_status;
    const number = shopInfo.user_activity.number;
    // 未参加活动
    const text = is_join === ShopConstant.NOT_JOIN ? '选择尺码'
      : isPay == 0 && number !== 1 ? '支付佣金'
        : shopInfo.user_activity.commission != 0 ? '扩充团队'
          : '邀请助攻';
    const action = text === '支付佣金' ? this._toCommissionPage : this._showOver;
    return (
      <TouchableOpacity style={bottomStyle.buttonNormalView} onPress={debounce(action)}>
        <Text style={bottomStyle.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  _showShare = () => {
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    const aId = shopInfo.activity.id;
    const uAId = shopInfo.user_activity.id;
    const uId = shopInfo.user_activity.user_id;
    const title = shopInfo.goods.goods_name;
    const image = shopInfo.goods.image;
    const url = `${ShopConstant.SHARE_BASE_URL}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`;
    showShare({
      text: ShopConstant.SHARE_TEXT,
      img: image,
      url,
      title,
    }).then(() => {
      // 分享成功回调
    });
  };

  render() {
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    return (
      <View>
        {this._setMainDOM(shopInfo)}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfBottomCom);
