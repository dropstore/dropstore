/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { Image } from '../../components';

export default class ImagePage extends PureComponent {
  render() {
    const { navigation } = this.props;
    const images = navigation.getParam('images');
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          images.map((v, i) => <Image source={v.source} key={i} style={v.style} />)
        }
      </ScrollView>
    );
  }
}
