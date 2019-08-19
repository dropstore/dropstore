/**
 * @file 自营商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../../components/Image';
import ImageBackgroundCom from '../../../../components/ImageBackgroundCom';
import {showSelectShoeSizeOlView} from '../overlay';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';

const data = {'isSelect': false};

class SelfBottomCom extends PureComponent {

  render() {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => alert('通知我')}>
          <Image source={Images.tzw}/>
        </TouchableOpacity>
        <ImageBackgroundCom style={{width: 178}} source={Images.bg_right} onPress={() => showSelectShoeSizeOlView(data)}>
          <Text style={_styles.selShoe}>挑选鞋码</Text>
        </ImageBackgroundCom>
      </View>
    );
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
    fontFamily: 'HiraginoSansGB',
    color: 'rgba(255,255,255,1)'
  }
});

export default withNavigation(SelfBottomCom);
