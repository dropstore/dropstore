import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image, Price, ScaleView } from '../../components';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';

export default class RestPayItem extends PureComponent {
  changeChoosed = () => {
    const { item, changeChoosed } = this.props;
    changeChoosed(item);
  }

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={styles.container} onPress={this.changeChoosed}>
        <View style={styles.left}>
          <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
            {/* <Image source={{ uri: item.image }} style={styles.shoe} /> */}
            <Image source={Images.shoe} style={styles.shoe} />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text numberOfLines={1} style={{ fontSize: 13, flex: 1, marginBottom: 2 }}>{item.name}</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={styles.title}>{item.activity_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Price price={item.price} />
              <Text style={styles.size}>{`SIZE：${item.size}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btn}>
          <Image source={item.choosed ? Images.choose : Images.unchoose} style={{ width: 19, height: 19 }} />
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 9,
    flexDirection: 'row',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
  },
  left: {
    paddingLeft: 10,
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 7,
  },
  title: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
  btn: {
    width: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ddd',
    marginLeft: 10,
  },
  avatar: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    overflow: 'hidden',
    marginRight: 5,
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
    justifyContent: 'center',
    marginBottom: 5,
  },
  size: {
    fontSize: 12,
    fontFamily: YaHei,
  },
});
