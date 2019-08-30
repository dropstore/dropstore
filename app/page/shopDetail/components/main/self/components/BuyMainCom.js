/**
 * @file 抢购成员详情组件
 * @date 2019/8/22 17:29
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, DeviceEventEmitter
} from 'react-native';
import {SCREEN_WIDTH} from '../../../../../../common/Constant';
import ImageBackground from '../../../../../../components/ImageBackground';
import Image from '../../../../../../components/Image';
import Colors from '../../../../../../res/Colors';
import Images from '../../../../../../res/Images';
import {YaHei, Mario} from '../../../../../../res/FontFamily';
import {commonStyle} from '../../../../../../res/style/CommonStyle';

export default class BuyMainCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderLeading = (item, index, userActivity, joinUserLength) => {
    return (
      <View style={_styles.listContainer}>
        <View style={[_styles.itemContainer, {backgroundColor: Colors.OTHER_BACK}]}>
          <ImageBackground style={_styles.userImageBg} source={Images.tx} children={
            <Image style={_styles.userImage} source={item.avatar}/>
          }/>
          <View style={{flex: 1, marginLeft: 12}}>
            <View style={commonStyle.row}>
              <Text style={[_styles.userName, {color: Colors.WHITE_COLOR}]}>CAP.</Text>
            </View>
            <View style={[commonStyle.row, {marginTop: 7}]}>
              <Text style={[_styles.userName, {color: Colors.WHITE_COLOR}]}>{item.user_name}</Text>
              <Image style={_styles.sexImage} source={Images.xt_xn}/>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'flex-start', marginRight: 17}}>
            <Text style={[_styles.zg, {marginBottom: 5}]}>我的助攻团队：{joinUserLength}人</Text>
            <Text style={[_styles.zg, {marginTop: 5}]}>助攻佣金：{userActivity.pay_price}￥</Text>
          </View>
        </View>
      </View>
    )
  };
  _renderMember = (item, index) => {
    return (
      <View style={_styles.listContainer}>
        <View style={[_styles.itemContainer, {backgroundColor: Colors.NORMAL_TEXT_F6}]}>
          <Text style={[_styles.index, {color: Colors.NORMAL_TEXT_1E}]}>{index}</Text>
          <ImageBackground style={_styles.userImageBg} source={Images.tx} children={
            <Image style={_styles.userImage} source={item.avatar}/>
          }/>
          <View style={{flex: 1, marginLeft: 12}}>
            <View style={commonStyle.row}>
              <Text style={[_styles.qhStatus, {color: Colors.NORMAL_TEXT_1E}]}>已取号</Text>
              <Text style={[_styles.code, {color: Colors.NORMAL_TEXT_1E}]}>{item.code}</Text>
            </View>
          </View>
          <View style={[commonStyle.row, {marginRight: 17}]}>
            <Image style={[_styles.jt,]} source={Images.shape_1_ji3}/>
            <Text style={[_styles.userName, {color: Colors.NORMAL_TEXT_1E}]}>{item.user_name}</Text>
            <Image style={_styles.sexImage} source={Images.xt_xn}/>
          </View>
        </View>
      </View>
    )
  };

  render() {
    const {shopInfo} = this.props;
    const joinUser = shopInfo.join_user;
    const userActivity = shopInfo.user_activity;
    const number = userActivity.number;
    const upper = number+1;
    return (
      <View style={_styles.container}>
        <View style={_styles.acContainer}>
          <Text style={_styles.acNormalMes}>预期购买
            <Text style={_styles.acImpMes}> {number === 0 ? upper : number}</Text> 双
          </Text>
          <Text style={_styles.acNormalMes}>团队上限
            <Text style={_styles.acImpMes}> {upper}</Text> 人
          </Text>
          <Text style={_styles.acNormalMes}>参与人数
            <Text style={_styles.acImpMes}> {joinUser.length}</Text> 人
          </Text>
          <Text style={_styles.acNormalMes}>还差
            <Text style={_styles.acImpMes}> {upper - joinUser.length}</Text> 人满额
          </Text>
        </View>
        {
          joinUser && joinUser.map((item, index) => (
            index === 0 ? this._renderLeading(item, index, userActivity, joinUser.length) : <View/>
          ))
        }
      </View>
    )
  }
}
const _styles = {
  container: {
    marginTop: 13,
    marginBottom: 13
  },
  acContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.NORMAL_TEXT_F6,
    paddingVertical: 5,
    paddingRight: 80
  },
  acNormalMes: {
    fontSize: 11,
    color: Colors.NORMAL_TEXT_5E,
    fontFamily: YaHei,
    fontWeight: '400',
    marginLeft: 17
  },
  acImpMes: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  listContainer: {
    marginHorizontal: 10,
    marginTop: 7,
    width: SCREEN_WIDTH - 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 67,
  },
  index: {
    fontSize: 12,
    fontFamily: Mario,
    marginLeft: 8,
  },
  userImageBg: {
    width: 54,
    height: 53,
    marginLeft: 7
  },
  userImage: {
    width: 54,
    height: 53,
  },
  qhStatus: {
    fontSize: 10,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  code: {
    fontSize: 11,
    marginLeft: 12
  },
  zg: {
    fontSize: 12,
    fontFamily: YaHei,
    fontWeight: '400',
    color: Colors.WHITE_COLOR,
  },
  jt: {
    width: 8,
    height: 9,
  },
  userName: {
    fontSize: 11,
    marginLeft: 11
  },
  sexImage: {
    width: 12,
    height: 11,
    marginLeft: 5
  }
};



