/**
 * @file 自营底部组件
 * 抽签抢购公共部分
 * @date 2019/8/22 15:14
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SelectShoeSizeCom from '../SelectShoeSizeCom';
import BuyBottomCom from './BuyBottomCom';
import ShopConstant from '../../../../common/ShopConstant';
import { getSimpleData } from '../../../../redux/reselect/simpleData';
import { checkTime } from '../../../../utils/TimeUtils';
import { debounce } from '../../../../utils/commonUtils';
import {
  showShare, showToast, closeModalbox, showModalbox,
} from '../../../../utils/MutualUtil';
import { BottomBtnGroup } from '../../../../components';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getSimpleData(state, 'activityInfo'),
  });
}

class SelfBottomCom extends PureComponent {
  _toCommissionPage = () => {
    const { navigation } = this.props;
    navigation.push('commission', { title: '助攻佣金设定' });
  };

  /**
   * 显示选鞋浮层
   */
  showOver = () => {
    const { shopDetailInfo, navigation } = this.props;
    const shopId = shopDetailInfo.data.activity.id;
    showModalbox({
      element: (<SelectShoeSizeCom
        shopId={shopId}
        navigation={navigation}
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
  };

  closeBox = (immediately) => {
    closeModalbox(immediately);
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
        return null;
      }
      return <BottomBtnGroup btns={[{ text: '助攻抢购', onPress: () => showToast('活动未开始') }]} />;
    }
    const btns = [];
    if (joinUser.length !== 0) {
      btns.push({ text: '分享', onPress: debounce(this._showShare) });
    } else {
      btns.push({ text: '通知我', onPress: () => showToast('已添加到通知') });
    }
    btns.push(this.setRightDOM(shopInfo));
    return <BottomBtnGroup btns={btns} />;
  };

  setRightDOM = (shopInfo) => {
    const is_join = shopInfo.is_join;
    // 是否存在未支付的佣金
    const isPay = shopInfo.user_activity.pay_status;
    const number = shopInfo.user_activity.number;
    // 未参加活动
    const text = is_join === ShopConstant.NOT_JOIN ? '选择尺码'
      : isPay == 0 && number !== 1 ? '支付佣金'
        : shopInfo.user_activity.commission != 0 ? '扩充团队'
          : '邀请助攻';
    const action = text === '支付佣金' ? this._toCommissionPage : this.showOver;
    return ({ text, onPress: debounce(action) });
  };

  _showShare = () => {
    const { shopDetailInfo } = this.props;
    const shopInfo = shopDetailInfo.data;
    const aId = shopInfo.activity.id;
    const uAId = shopInfo.user_activity.id;
    const uId = shopInfo.user_activity.user_id;
    const image = shopInfo.goods.image;
    const url = `${ShopConstant.SHARE_BASE_URL}?id=${aId}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`;
    showShare({
      text: shopInfo.goods.goods_name,
      img: image,
      url,
      title: shopInfo.activity.b_type === '2' ? `快来炒饭APP帮我助攻抢购，成功可立获${shopInfo.user_activity.commission / 100}元佣金`
        : `快来炒饭APP帮我抽一支幸运签，中签可立获${shopInfo.user_activity.commission / 100}元佣金`,
    }).then(() => {
      // 分享成功回调
    });
  };

  render() {
    const { shopDetailInfo: { data: shopInfo }, navigation } = this.props;
    // 活动子类型:1、抽签；2、抢购
    const b_type = shopInfo.activity.b_type;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 活动未开始
    if (checkTime(start_time) > 0) {
      return this._normalDOM(shopInfo, false);
    }
    if (b_type === ShopConstant.DRAW) {
      return null;
    }
    return (
      <BuyBottomCom
        navigation={navigation}
        shopInfo={shopInfo}
        showModalbox={showModalbox}
        closeModalbox={closeModalbox}
      />
    );
  }
}

export default connect(mapStateToProps)(SelfBottomCom);
