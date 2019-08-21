import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../common/Constant';

export const bottomStyle = StyleSheet.create({
  bottomView: {
    width: SCREEN_WIDTH,
    height: 60,
    borderWidth: 1,
    borderColor: 'rgba(215, 215, 215, 1)',
  },
  buttonView: {
    width: 178,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:8
  },
  buttonText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
  },
});
