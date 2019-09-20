import { StyleSheet, Platform } from 'react-native';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';
import Colors from '../Colors';
import { wPx2P } from '../../utils/ScreenUtil';

export const bottomStyle = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    height: 69 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 9,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(188, 188, 188)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 50,
        position: 'relative',
      },
    }),
  },
  buttonNormalView: {
    width: wPx2P(168),
    height: 46,
    backgroundColor: Colors.OTHER_BACK,
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
