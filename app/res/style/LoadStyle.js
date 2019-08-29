import {StyleSheet} from 'react-native';
import {px2Dp} from '../../utils/ScreenUtil';
import Colors from "../Colors";

export const loadStyle = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: px2Dp(40),
    borderTopColor: Colors.NORMAL_TEXT_E5,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.NORMAL_TEXT_6,
    marginTop: 10
  },
  loadingGif: {
    width: px2Dp(23),
    height: px2Dp(5),
    marginLeft: px2Dp(6),
  },
});
