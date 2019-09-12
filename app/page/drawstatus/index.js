/**
 * @file 抽签结果界面
 * @date 2019/8/31 11:26
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import { commonStyle } from '../../res/style/CommonStyle';
import { bottomStyle } from '../../res/style/BottomStyle';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Mario, YaHei } from '../../res/FontFamily';
import { showShare } from '../../utils/MutualUtil';
import ShopConstant from '../../common/ShopConstant';
import { getShopDetailInfo } from '../../redux/reselect/shopDetailInfo';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class DrawStatus extends PureComponent {
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
    const { navigation } = this.props;
    const shopDetailInfo = navigation.getParam('shopDetailInfo');
    const data = shopDetailInfo.data;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Image source={Images.gx_zq} />
          <Image source={Images.got_em} />
          <Image style={_style.goodImage} source={{ uri: data.goods.image }} />
          <Text style={_style.shopName}>{data.goods.goods_name}</Text>
        </View>
        <View style={[bottomStyle.bottomView, commonStyle.row]}>
          <ImageBackground
            style={bottomStyle.buttonNormalView}
            source={Images.bg_left}
            onPress={() => this._showShare()}
          >
            <Text style={bottomStyle.buttonText}>分享邀请</Text>
          </ImageBackground>
          <ImageBackground
            style={bottomStyle.buttonNormalView}
            source={Images.bg_right}
            onPress={() => navigation.goBack()}
          >
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
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
    paddingTop: 27,
    backgroundColor: Colors.NORMAL_TEXT_F2,
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
