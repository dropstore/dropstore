/**
 * @file 球鞋锦鲤商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../../components/Image';
import {showShareOlView} from '../overlay';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';

const data = {'isSelect': false};

class LuckBottomCom extends PureComponent {

  render() {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => showShareOlView(data)}>
          <Image source={Images.fx}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  bottomView: {
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default withNavigation(LuckBottomCom);
