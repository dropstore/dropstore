/**
 * @file 自营商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from '../../../../components/Image';
import ImageBackground from '../../../../components/ImageBackground';
import {hideOlView, SelectShoeSizeCom} from '../overlay';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {Overlay} from "teaset";

type Props = {
  type: Object,
  status: Object
};

class SelfBottomCom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      overSelShoeSizeKey: -1,
    }
  }

  _showBottomRightText = (type, status) => {
    if (type === 1) {
      if (status === 1) {
        return '挑选鞋码';
      }
      if (status === 2) {
        return '邀请助攻';
      }
    }
  };
  /**
   * 显示选鞋浮层
   * @param activityId
   */
  showOver = (activityId) => {
    let olView = (
      <Overlay.PullView>
        <SelectShoeSizeCom activityId={activityId} closeOver={this.closeOver.bind(this)}/>
      </Overlay.PullView>
    );
    let key = Overlay.show(
      olView
    );
    this.setState({overSelShoeSizeKey: key})
  };

  // 关闭浮层
  closeOver() {
    hideOlView(this.state.overSelShoeSizeKey);
  };

  render() {
    const {type, status, activityId} = this.props;
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => alert('通知我')}>
          <Image style={{width: 178, height: 49}} source={Images.tzw}/>
        </TouchableOpacity>
        <ImageBackground style={_styles.ibg} source={Images.bg_right}
                         onPress={() => this.showOver(activityId)}>
          <Text style={_styles.selShoe}>{this._showBottomRightText(type, status)}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
  },
  selShoe: {
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
  },
  ibg:{
    justifyContent:'center',
    alignItems:'center',
    width: 178,
    height: 48
  }
});

export default withNavigation(SelfBottomCom);
