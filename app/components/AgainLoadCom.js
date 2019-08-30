/**
 * @file 请求失败重新加载视图
 * @date 2019/8/29 11:47
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import ImageBackground from './ImageBackground';
import Images from '../res/Images';
import Colors from '../res/Colors';
import { bottomStyle } from '../res/style/BottomStyle';
import { debounce } from '../utils/commonUtils';


export default class AgainLoadCom extends PureComponent {
  onPress = () => {
    const { againLoad } = this.props;
    againLoad();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.NORMAL_TEXT_6, fontSize: 16 }}>请求失败，请重试</Text>
        <ImageBackground
          style={bottomStyle.buttonNormalView}
          source={Images.bg_right}
          onPress={debounce(this.onPress)}
        >
          <Text style={bottomStyle.buttonText}>重新加载</Text>
        </ImageBackground>
      </View>
    );
  }
}
