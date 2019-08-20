/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import ScaleView from '../../../components/ScaleView';
import Image from '../../../components/Image';
import { px2Dp } from '../../../utils/ScreenUtil';
import { debounce } from '../../../utils/commonUtils';
import Colors from '../../../res/Colors';
import ShopConstant from '../../../common/ShopConstant';

// 简单的通过自定义数据的状态值控制显示及隐藏。
class ShopListItemCom extends PureComponent {
  toShopDetailPage = () => {
    const { navigation, item } = this.props;
    navigation.push('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: '',
      type: ShopConstant.SELF_SUPPORT,
      // type: item.type,
      item, // 仅用于死数据，调用接口传id
    });
  };

  render() {
    const { item } = this.props;
    return (
      <ScaleView style={_styles.scaleView} onPress={debounce(this.toShopDetailPage)}>
        <Image style={_styles.plusIcon} source={item.leftImage} />
        <View style={_styles.middle}>
          <View style={{ flex: 1 }}>
            <Text style={_styles.shopTitle}>{item.shopTitle}</Text>
            <Text style={[_styles.shopTitle, { marginTop: 3 }]}>
              {item.shopSubTitle}
            </Text>
            <Text style={_styles.price}>{`${item.price}￥`}</Text>
            {
              item.status !== 0
                ? <Text style={_styles.time}>{item.time}</Text>
                : (
                  <View style={_styles.overView}>
                    <Text style={_styles.overTitle}>距结束:</Text>
                    <Text style={_styles.overTime}>{item.endTime}</Text>
                  </View>
                )
            }
          </View>
          <Image resizeMode="contain" style={_styles.imageShoe} source={item.shoe} />
        </View>
        {
          item.status !== 2
            ? <Image style={_styles.statusImage} resizeMode="cover" source={item.statusImage} />
            : <View />
        }
      </ScaleView>
    );
  }
}

const _styles = StyleSheet.create({
  scaleView: {
    marginHorizontal: 10,
    marginBottom: 3,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 9,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  plusIcon: {
    width: 13,
    height: 13,
    marginRight: 9,
    marginLeft: 6,
    marginTop: 4,
  },
  shopTitle: {
    fontSize: 10,
    color: 'rgba(0,0,0,1)',
    fontFamily: 'HiraginoSansGB',
  },
  imageShoe: {
    width: 92,
    height: 49,
    right: 20,
    position: 'relative',
  },
  statusImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 6,
    top: 4,
  },
  price: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: 'rgba(0,0,0,1)',
    marginLeft: 3,
    marginTop: 23,
  },
  time: {
    fontSize: 10,
    color: 'rgba(0,0,0,1)',
    marginTop: 6,
    marginLeft: 2,
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 6,
  },
  overTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: 'rgba(194,0,0,1)',
  },
  overTime: {
    fontSize: 8,
    fontFamily: 'super',
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
  },
});

export default withNavigation(ShopListItemCom);
