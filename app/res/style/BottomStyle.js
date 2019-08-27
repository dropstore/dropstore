import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, PADDING_TAB} from '../../common/Constant';
import Colors from "../Colors";

export const bottomStyle = StyleSheet.create({
  bottomView: {
    width: SCREEN_WIDTH,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
    borderTopWidth: 1,
    borderTopColor: 'rgba(215, 215, 215, 1)',
    marginBottom: PADDING_TAB
  },

  buttonNormalView: {
    width: 178,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 5
  },
  buttonOnlyOneChildView: {
    width: 178,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 6,
  },
  buttonText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
  },
});
