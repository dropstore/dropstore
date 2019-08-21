/**
 * @file 选择鞋码组件
 * @date 2019/8/19 9:26
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT} from "../../../common/Constant";
import ImageBackground from '../../../components/ImageBackground';
import {commonStyle} from '../../../res/style/CommonStyle';
import {bottomStyle} from '../../../res/style/BottomStyle';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import {Mario, YaHei} from "../../../res/FontFamily";

export default class PayStatusCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, closeOver} = this.props;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Text style={_style.statusText}>支付成功</Text>
          <View style={[commonStyle.row, {marginTop: 26}]}>
            <Text style={_style.waitLeft}>等待发布：</Text>
            <Text style={_style.time}>10:56:57</Text>
          </View>
        </View>
        <View style={[bottomStyle.bottomView, commonStyle.row, {justifyContent: 'space-between'}]}>
          <ImageBackground style={bottomStyle.buttonView} source={Images.bg_left}
                           onPress={() => alert('分享')}>
            <Text style={bottomStyle.buttonText}>分享邀请</Text>
          </ImageBackground>
          <ImageBackground style={bottomStyle.buttonView} source={Images.bg_right}
                           onPress={() => {
                             closeOver();
                             navigation.navigate('shopDetail')
                           }}>
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: SCREEN_HEIGHT
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 66,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)'
  },
  waitLeft: {
    fontSize: 16,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)'
  },
  time: {
    fontSize: 18,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)'
  },
});


