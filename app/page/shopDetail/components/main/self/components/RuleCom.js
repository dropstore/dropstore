/**
 * @file 抽签或抢购规则组件
 * @date 2019/8/19 13:50
 * @author ZWW
 */

import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Image from '../../../../../../components/Image';
import {YaHei} from '../../../../../../res/FontFamily';
import Images from '../../../../../../res/Images';

type Props = {
  type: Object,
  status: Object
};
export default class RuleCom extends PureComponent<Props> {
  _getShowInfo = (type, status) => {
    if (type === 1) {
      return (
        this._drawStatus(status)
      )
    }
  };
  _drawStatus = (status) => {
    if (status === 1) {
      return (
        <View style={_styles.mainView}>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex1}/>
            <View>
              <Text style={_styles.textView}>有偿邀请</Text>
              <Text style={_styles.textView}>好友领签</Text>
            </View>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex2}/>
            <Text style={_styles.textView}>设置佣金</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex3}/>
            <Text style={_styles.textView}>队员中签</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex4}/>
            <View>
              <Text style={_styles.textView}>中签好友</Text>
              <Text style={_styles.textView}>获得佣金</Text>
            </View>
          </View>
        </View>
      )
    }
    if(status === 2){
      return (
        <View style={_styles.mainView}>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex1}/>
              <Text style={_styles.textView}>选择商品</Text>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex2}/>
            <View>
              <Text style={_styles.textView}>发起助攻</Text>
              <Text style={_styles.textView}>设定奖金</Text>
            </View>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex3}/>
            <View>
              <Text style={_styles.textView}>等待好友</Text>
              <Text style={_styles.textView}>助攻支付</Text>
            </View>
          </View>
          <View style={_styles.itemMainView}>
            <Image style={_styles.imageView} source={Images.ex4}/>
            <View>
              <Text style={_styles.textView}>达到人数</Text>
              <Text style={_styles.textView}>查看结果</Text>
            </View>
          </View>
        </View>
      )
    }
  };

  render() {
    const {type, status} = this.props;
    return this._getShowInfo(type, status)
  }
}

const _styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: 20,
    height: 20
  },
  textView: {
    fontSize: 13,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    marginLeft: 3
  }
});


