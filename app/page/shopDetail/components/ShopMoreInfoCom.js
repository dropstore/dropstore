/**
 * @file 商品详细信息组件
 * @date 2019/8/18 17:39
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../components/Image';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';

class ShopBasicInfoCom extends PureComponent {
  render() {
    const {item} = this.props;
    return (
      <View style={_styles.detailView}>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test1}/>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test2}/>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test1}/>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test2}/>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test1}/>
        <Image resizeMode="cover" style={_styles.detailImage} source={Images.test2}/>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  detailView: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  detailImage: {
    width: '100%',
    height: 300
  },
});

export default withNavigation(ShopBasicInfoCom);
