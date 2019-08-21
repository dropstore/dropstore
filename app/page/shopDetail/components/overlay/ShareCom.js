/**
 * @file 分享组件
 * @date 2019/8/19 9:30
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet, View, TouchableOpacity} from 'react-native';
import Image from '../../../../components/Image';
import Images from '../../../../res/Images';

const imageSource = [Images.wx, Images.pyq, Images.wb, Images.qq];

class ShareCom extends PureComponent {
  shareByIndex = (index, closeOver) => {
    switch (index) {
      case 0:
        alert('微信好友');
        closeOver();
        break;
      case 1:
        alert('微信朋友圈');
        break;
      case 2:
        alert('微博');
        break;
      case 3:
        alert('QQ');
        break;
    }
  };

  // 需要根据数据状态去初始化不同的背景图和分享按钮的margin
  render() {
    const {data, closeOver} = this.props;
    let isSelect = data.isSelect;
    return (
      <ImageBackground
        source={isSelect ? Images.fxt_dd : Images.fxt}
        style={{height: isSelect ? 175 : 268,}}
        resizeMode={'cover'}
      >
        <View style={[_styles.mainView, {marginTop: isSelect ? 67 : 159,}]}>
          {
            imageSource.map((item, index) => (
              <TouchableOpacity onPress={() => this.shareByIndex(index, closeOver)} key={index}>
                <Image style={_styles.imageView} source={item}/>
              </TouchableOpacity>
            ))
          }
        </View>
      </ImageBackground>
    );
  }
}

const _styles = StyleSheet.create({
  container: {},
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 25
  },
  imageView: {}
});

export default ShareCom;
