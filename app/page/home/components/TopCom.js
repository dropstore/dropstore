/**
 * @file 首页顶部图组件
 * @date 2019/8/17 19:09
 * @author ZWW
 */

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Image from '../../../components/Image';
import { px2Dp } from '../../../utils/ScreenUtil';
import { SCREEN_WIDTH } from '../../../common/Constant';

class TopCom extends PureComponent {
  render() {
    const { imageSource } = this.props;
    return (
      <Carousel
        data={[1, 2]}
        slideStyle={{ alignItems: 'center', justifyContent: 'center' }}
        renderItem={() => <Image style={_styles.topImage} source={imageSource} />}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableSnap
        loop
        autoplay
        autoplayInterval={4000}
        removeClippedSubviews={false}
      />
    );
  }
}

const _styles = StyleSheet.create({
  topImage: {
    width: px2Dp(717),
    height: px2Dp(301),
  },
});
export default TopCom;
