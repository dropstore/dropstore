/**
 * @file 商品主体信息组件
 * @date 2019/8/18 17:39
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, ImageNetUnkoneSize } from '../../../../components';
import Colors from '../../../../res/Colors';
import { SCREEN_WIDTH } from '../../../../common/Constant';

class ShopBasicInfoCom extends PureComponent {
  render() {
    const { shopInfo: { goods_image } } = this.props;
    return (
      <View style={styles.detailView}>
        <Image style={{ height: 240, width: SCREEN_WIDTH }} source={require('../../../../res/image/gonggao.jpg')} />
        {
          goods_image.map(v => (
            <ImageNetUnkoneSize
              key={v.url}
              style={{ width: SCREEN_WIDTH }}
              source={{ uri: v.url }}
            />
          ))
        }
        <Image style={{ height: 437, width: SCREEN_WIDTH }} source={require('../../../../res/image/rule.jpg')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    marginTop: 16,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default ShopBasicInfoCom;
