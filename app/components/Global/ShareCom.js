import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Modalbox from 'react-native-modalbox';
import { wPx2P } from '../../utils/ScreenUtil';
import { SCREEN_WIDTH } from '../../common/Constant';
import Image from '../Image';
import Images from '../../res/Images';
import ImageBackground from '../ImageBackground';
import Share from '../../utils/ShareUtil';
import { showToast } from '../../utils/MutualUtil';

const schemes = [
  { icon: 'wx', scheme: 2 },
  { icon: 'pyq', scheme: 3 },
];

export default class ShareCom extends PureComponent {
  componentDidMount() {
    this.modalbox && this.modalbox.open();
  }

  share = (scheme) => {
    const { data, successCallback, failCallback } = this.props;
    const {
      text, img, url, title,
    } = data;
    Share(text, img, url, title, scheme).then(() => {
      successCallback();
    }).catch(() => {
      showToast('分享失败，请稍后重试');
      failCallback();
    });
  }

  render() {
    const { onClosed } = this.props;
    return (
      <Modalbox
        position="bottom"
        backButtonClose
        onClosed={onClosed}
        style={styles.modalbox}
        ref={(v) => {
          this.modalbox = v;
        }}
      >
        <ImageBackground source={Images.fxt} style={{ ...styles.modalbox, ...styles.fxt }}>
          {
            schemes.map(v => (
              <TouchableOpacity key={v.icon} onPress={() => this.share(v.scheme)}>
                <Image style={styles.shareIcon} source={Images[v.icon]} />
              </TouchableOpacity>
            ))
          }
        </ImageBackground>
      </Modalbox>
    );
  }
}

const styles = StyleSheet.create({
  modalbox: {
    width: SCREEN_WIDTH,
    height: wPx2P(278),
  },
  shareIcon: {
    width: wPx2P(69),
    height: wPx2P(91),
    marginHorizontal: wPx2P(15),
  },
  fxt: {
    flexDirection: 'row',
    paddingTop: wPx2P(159),
    justifyContent: 'center',
  },
});
