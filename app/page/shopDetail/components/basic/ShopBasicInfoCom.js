/**
 * @file 商品基本信息组件
 * @date 2019/8/18 16:46
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../../components/Image';
import  Images from '../../../../res/Images';

class ShopBasicInfoCom extends PureComponent {
  render() {
    const {item} = this.props;
    return (
      <View>
        <View style={_styles.explainView}>
          <Image resizeMode="contain" style={_styles.explainImage} source={Images.jth}/>
          <Text style={_styles.explainText}>查看活动说明</Text>
        </View>
        <View style={_styles.mainView}>
          <Image resizeMode="contain" style={_styles.imageShoe} source={item.shoe}/>
          <View style={_styles.overView}>
            <Text style={_styles.overTitle}>距活动结束:</Text>
            <Text style={_styles.overTime}>{item.endTime}</Text>
          </View>
          <Text style={_styles.shopTitle}>`{item.shopTitle}{item.shopSubTitle}`</Text>
          <Text style={_styles.price}>{`${item.price}￥`}</Text>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  explainView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 12,
  },
  explainImage: {
    width: 12,
    height: 10
  },
  explainText: {
    color: 'rgba(107,107,107,1)',
    fontSize: 9,
    fontFamily: 'FZLTHJW',
    marginLeft: 3
  },
  mainView: {
    marginTop: 19,
    alignItems: 'center',
  },
  imageShoe: {
    width: 251,
    height: 135,
    right: 20,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: 'HiraginoSansGB',
    marginTop: 9
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21
  },
  overTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: 'rgba(194,0,0,1)',
  },
  overTime: {
    fontSize: 12,
    fontFamily: 'super',
    color: 'rgba(0,0,0,1)',
    marginLeft: 6
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: 'rgba(0,0,0,1)',
    marginTop: 21,
    textDecorationLine: 'line-through',
    textDecorationColor: 'rgba(0,0,0,1)'
  },
});

export default withNavigation(ShopBasicInfoCom);
