import { StyleSheet, Platform } from 'react-native';
import { getScreenWidth, PADDING_TAB } from '../../common/Constant';
import Colors from '../Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { RuiXian } from '../FontFamily';

export default StyleSheet.create({
  listTitle: {
    fontSize: 13,
    fontFamily: RuiXian,
    lineHeight: 14,
    textAlign: 'justify',
    flex: 1,
  },
});
