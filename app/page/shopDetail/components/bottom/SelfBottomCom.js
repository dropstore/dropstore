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
import {Overlay} from "teaset";
import Image from '../../../../components/Image';
import ImageBackground from '../../../../components/ImageBackground';
import SelectShoeSizeCom from '../overlay/SelectShoeSizeCom';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {bottomStyle} from '../../../../res/style/BottomStyle';
import {hideOlView} from '../../../../utils/ViewUtils';

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
   * @param navigation
   */
  showOver = (activityId, navigation) => {
    let olView = (
      <Overlay.PullView>
        <SelectShoeSizeCom navigation={navigation} activityId={activityId} closeOver={this.closeOver.bind(this)}/>
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
    const {type, status, activityId, navigation} = this.props;
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => alert('通知我')}>
          <Image style={bottomStyle.buttonView} source={Images.tzw}/>
        </TouchableOpacity>
        <ImageBackground style={bottomStyle.buttonView} source={Images.bg_right}
                         onPress={() => this.showOver(activityId, navigation)}>
          <Text style={bottomStyle.buttonText}>{this._showBottomRightText(type, status)}</Text>
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
});

export default withNavigation(SelfBottomCom);
