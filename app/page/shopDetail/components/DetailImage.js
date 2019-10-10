import React, { PureComponent } from 'react';
import { Image, ImageNetUnkoneSize } from '../../../components';
import { getScreenWidth } from '../../../common/Constant';

export default class DetailImage extends PureComponent {
  render() {
    const { item } = this.props;
    if (item.source) {
      return <Image source={item.source} style={{ height: item.height, width: getScreenWidth() }} />;
    }
    return <ImageNetUnkoneSize style={{ width: getScreenWidth() }} source={{ uri: item.url }} />;
  }
}
