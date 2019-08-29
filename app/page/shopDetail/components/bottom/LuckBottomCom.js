/**
 * @file 球鞋锦鲤商品详情底部组件
 * @date 2019/8/19 9:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withNavigation} from 'react-navigation';
import {Overlay} from "teaset";
import Image from '../../../../components/Image';
import ShareCom from '../overlay/ShareCom';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {hideOlView} from '../../../../utils/ViewUtils';

import { showShare } from '../../../../redux/actions/component';
import { getShareSuccess } from '../../../../redux/reselect/component';

const data = {'isSelect': false};

function mapStateToProps() {
  return state =>({
    shareSuccess: getShareSuccess(state),
  })
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showShare,
  }, dispatch);
}
class LuckBottomCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shareOlKey: -1,
    }
  }
  componentWillReceiveProps(nextProps) {
    const { shareSuccess } = this.props;
    if (!shareSuccess && nextProps.shareSuccess) {
      console.log('分享成功');
    }
  }

  closeShareOver() {
    hideOlView(this.state.shareOlKey);
  };
  shareMyShose = () => {
    const { showShare } = this.props;
    showShare({
      text: '锦鲤',
      img: 'https://www.baidu.com/img/bd_logo1.png',
      url: 'https://www.baidu.com/',
      title: '分享的标题',
    });
  }
  render() {
    return (
      <View style={_styles.bottomView}>
        <TouchableOpacity onPress={this.shareMyShose}>
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

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(LuckBottomCom));
