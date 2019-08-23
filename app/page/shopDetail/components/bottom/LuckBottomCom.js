/**
 * @file 球鞋锦鲤商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Overlay} from "teaset";
import Image from '../../../../components/Image';
import ShareCom from '../overlay/ShareCom';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {hideOlView} from '../../../../utils/ViewUtils';

const data = {'isSelect': false};

class LuckBottomCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shareOlKey: -1,
    }
  }

  showShareOverView = (data) => {
    let olView = (
      <Overlay.PullView>
        <ShareCom data={data} closeOver={this.closeShareOver.bind(this)}/>
      </Overlay.PullView>
    );
    let key = Overlay.show(
      olView
    );
    this.setState({shareOlKey: key})
  };

  closeShareOver() {
    hideOlView(this.state.shareOlKey);
  };

  render() {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={() => this.showShareOverView(data)}>

          <Image source={Images.fx} style={{width: 178, height: 49}}/>

        </TouchableOpacity>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  bottomView: {
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default withNavigation(LuckBottomCom);
