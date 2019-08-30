import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modalbox from 'react-native-modalbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {closeShare, shareCallback} from '../redux/actions/component';
import {getShare} from '../redux/reselect/component';
import {wPx2P} from '../utils/ScreenUtil';
import {SCREEN_WIDTH} from '../common/Constant';
import Image from './Image';
import Images from '../res/Images';
import ImageBackground from './ImageBackground';
import Share from '../utils/ShareUtil';
import {showToast} from '../utils/MutualUtil';

const schemes = [
  {icon: 'wx', scheme: 2},
  {icon: 'pyq', scheme: 3},
];

function mapStateToProps() {
  return state => ({
    share: getShare(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeShare, shareCallback,
  }, dispatch);
}

class ShareCom extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const {share} = this.props;
    if (!share.show && nextProps.share.show) {
      setTimeout(() => {
        this.modalbox.open();
      });
    } else if (share.show && !nextProps.share.show) {
      this.modalbox.close();
    }
  }

  share = (scheme) => {
    const {share, shareCallback} = this.props;
    const {
      text, img, url, title,
    } = share;
    Share(text, img, url, title, scheme).then(() => {
      shareCallback(true);
    }).catch((err) => {
      showToast('分享失败，请稍后重试');
      console.log(err);
    });
  }

  render() {
    const {closeShare, share} = this.props;
    if (!share.show) {
      return null;
    }
    return (
      <Modalbox
        position="bottom"
        backButtonClose={true}
        onClosed={closeShare}
        style={styles.modalbox}
        ref={(v) => {
          this.modalbox = v;
        }}
      >
        <ImageBackground source={Images.fxt} style={{...styles.modalbox, ...styles.fxt}}>
          {
            schemes.map(v => (
              <TouchableOpacity key={v.icon} onPress={() => this.share(v.scheme)}>
                <Image style={styles.shareIcon} source={Images[v.icon]}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareCom);
