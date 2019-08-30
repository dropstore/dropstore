/**
 * @file 球鞋锦鲤商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../../components/Image';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';


class LuckBottomCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity>
          <Image source={Images.fx} style={{width: 178, height: 49}}/>
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
