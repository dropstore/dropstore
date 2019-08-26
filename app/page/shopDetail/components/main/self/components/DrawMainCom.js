/**
 * @file 抽签成员详情组件
 * @date 2019/8/22 17:29
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, DeviceEventEmitter
} from 'react-native';
import {SCREEN_WIDTH} from '../../../../../../common/Constant';
import ImageBackground from '../../../../../../components/ImageBackground';
import Image from '../../../../../../components/Image';
import Colors from '../../../../../../res/Colors';
import Images from '../../../../../../res/Images';
import {YaHei, Mario} from '../../../../../../res/FontFamily';
import {commonStyle} from '../../../../../../res/style/CommonStyle';

export default class DrawMainCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={_styles.container}>
        <View style={_styles.acContainer}>
          <Text style={_styles.acNormalMes}>预期购买
            <Text style={_styles.acImpMes}> 5</Text> 双
          </Text>
          <Text style={_styles.acNormalMes}>团队上限
            <Text style={_styles.acImpMes}> 6</Text> 人
          </Text>
          <Text style={_styles.acNormalMes}>参与人数
            <Text style={_styles.acImpMes}> 1</Text> 人
          </Text>
          <Text style={_styles.acNormalMes}>还差
            <Text style={_styles.acImpMes}> 5</Text> 人满额
          </Text>
        </View>
        <View style={_styles.listContainer}>
          <View style={[_styles.itemContainer, {backgroundColor: Colors.OTHER_BACK}]}>
            <Text style={_styles.index}>1</Text>
            <ImageBackground style={_styles.userImageBg} source={Images.tx}/>
            <View style={{flex: 1, marginLeft: 12}}>
              <View style={commonStyle.row}>
                <Text style={_styles.qhStatus}>已取号</Text>
                <Text style={_styles.code}>0045342345</Text>
              </View>
              <View style={[commonStyle.row, {marginTop: 7}]}>
                <Image style={_styles.jt} source={Images.shape_1_ji3}/>
                <Text style={_styles.userName}>Lorem Ipsum</Text>
                <Image style={_styles.sexImage} source={Images.xt_xn}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const _styles = {
  container: {
    marginTop: 13,
  },
  acContainer: {
    width: SCREEN_WIDTH,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.NORMAL_TEXT_F6,
    paddingVertical: 5,
    paddingRight: 80
  },
  acNormalMes: {
    fontSize: 11,
    color: Colors.NORMAL_TEXT_5E,
    fontFamily: YaHei,
    fontWeight: '400',
    marginLeft: 17
  },
  acImpMes: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
    fontFamily: YaHei,
    fontWeight: '400',
  },
  listContainer: {
    marginHorizontal: 10,
    marginTop: 7
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    height: 67
  },
  index: {
    fontSize: 12,
    fontFamily: Mario,
    color: Colors.WHITE_COLOR,
    marginLeft: 8,
  },
  userImageBg: {
    width: 54,
    height: 53,
    marginLeft: 7
  },
  qhStatus: {
    fontSize: 10,
    fontFamily: YaHei,
    fontWeight: '400',
    color: Colors.WHITE_COLOR,
  },
  code: {
    fontSize: 11,
    color: Colors.WHITE_COLOR,
    marginLeft: 12
  },
  zg: {
    fontSize: 12,
    fontFamily: YaHei,
    fontWeight: '400',
    color: Colors.WHITE_COLOR,
  },
  jt: {
    width: 8,
    height: 9,
  },
  userName: {
    fontSize: 11,
    color: Colors.WHITE_COLOR,
    marginLeft: 11
  },
  sexImage: {
    width: 12,
    height: 11,
    marginLeft: 5
  }
};



