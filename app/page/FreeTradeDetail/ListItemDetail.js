import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Image, ImageNetUnkoneSize } from '../../components';
import Colors from '../../res/Colors';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';

class ListItemDetail extends PureComponent {
  render() {
    // const { shopInfo: { goods_image } } = this.props;
    return (
      <ScrollView style={styles.detailView} showsVerticalScrollIndicator={false}>
        <Image style={{ height: 240, width: SCREEN_WIDTH }} source={require('../../res/image/gonggao.jpg')} />
        {/* {
          goods_image.map(v => (
            <ImageNetUnkoneSize
              key={v.url}
              style={{ width: SCREEN_WIDTH }}
              source={{ uri: v.url }}
            />
          ))
        } */}
        <Image style={{ height: 437, width: SCREEN_WIDTH, marginBottom: PADDING_TAB }} source={require('../../res/image/rule.jpg')} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default ListItemDetail;
