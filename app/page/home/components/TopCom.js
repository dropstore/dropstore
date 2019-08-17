/**
 * @file 首页顶部图组件
 * @date 2019/8/17 19:09
 * @author ZWW
 */

import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Image from '../../../components/Image';
import ScaleView from '../../../components/ScaleView';
import {px2Dp} from '../../../utils/ScreenUtil';

class TopCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {imageSource} = this.props;
    return (
      <ScaleView style={_styles.scaleView}>
        <Image style={_styles.topImage} source={imageSource}/>
      </ScaleView>
    )
  }
}

const _styles = StyleSheet.create({
  scaleView:{
    paddingLeft:px2Dp(15),
    paddingRight:px2Dp(18)
  },
  topImage: {
    width: px2Dp(717),
    height: px2Dp(301)
  }
});
export default TopCom;
