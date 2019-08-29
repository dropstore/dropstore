/**
 * @file 支付失败组件
 * @date 2019/8/26 16:00
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT} from "../../../common/Constant";
import ImageBackground from '../../../components/ImageBackground';
import {bottomStyle} from '../../../res/style/BottomStyle';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import {Mario, YaHei} from "../../../res/FontFamily";

export default class PayFailCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, closeOver} = this.props;
    return (
      <View style={_style.container}>
        <View style={_style.mainView}>
          <Text style={_style.statusText}>支付失败</Text>
        </View>
        <View style={bottomStyle.bottomView}>
          <ImageBackground style={bottomStyle.buttonOnlyOneChildView} source={Images.bg_right}
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


