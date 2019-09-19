import React, { PureComponent } from 'react';
import { Image, ImageNetUnkoneSize } from '../../../components';
import { SCREEN_WIDTH } from '../../../common/Constant';

export default class DetailImage extends PureComponent {
  render() {
    const { item } = this.props;
    if (item.source) {
      return <Image source={item.source} style={{ height: item.height, width: SCREEN_WIDTH }} />;
    }
    return <ImageNetUnkoneSize style={{ width: SCREEN_WIDTH }} source={{ uri: item.url }} />;
  }
}
