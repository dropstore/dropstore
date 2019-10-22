import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { BottomBtnGroup } from '../../components';
import Image from '../../components/Image';
import { debounce } from '../../utils/commonUtils';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Mario, YaHei } from '../../res/FontFamily';
import { showShare } from '../../utils/MutualUtil';
import ShopConstant from '../../common/ShopConstant';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { hPx2P, wPx2P } from '../../utils/ScreenUtil';
import { STATUSBAR_HEIGHT } from '../../common/Constant';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getSimpleData(state, 'activityInfo'),
  });
}

class DrawStatus extends PureComponent {
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
      title: `快来炒饭APP帮我抽一支幸运签，中签可立获${shopInfo.user_activity.commission / 100}元佣金`,
    }).then(() => {
      // 分享成功回调
    });
  };

  render() {
    const { navigation } = this.props;
    const shopDetailInfo = navigation.getParam('shopDetailInfo');
    const data = shopDetailInfo.data;
    return (
      <View style={_style.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
          <View style={_style.mainView}>
            <Image style={_style.goodImage} source={{ uri: data.goods.image }} />
            <Text style={_style.shopName}>{data.goods.goods_name}</Text>
          </View>
        </ScrollView>
        <BottomBtnGroup btns={[
          { text: '分享邀请', onPress: debounce(this._showShare) },
          { text: '确认', onPress: () => navigation.goBack() },
        ]}
        />
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(30 + STATUSBAR_HEIGHT),
    paddingBottom: hPx2P(20),
    justifyContent: 'space-between',
  },
  waitLeft: {
    fontSize: 16,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
  },
  time: {
    fontSize: 18,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)',
  },
  shopName: {
    justifyContent: 'center',
    fontSize: 17,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: '400',
    marginTop: 17,
    marginHorizontal: 20,
  },
  goodImage: {
    width: 294,
    height: 155,
  },
});
export default connect(mapStateToProps)(DrawStatus);
