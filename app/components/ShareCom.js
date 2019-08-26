import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalbox from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeShare } from '../redux/actions/component';
import { getShare } from '../redux/reselect/component';
import { wPx2P } from '../utils/ScreenUtil';
import { SCREEN_WIDTH } from '../common/Constant';
import Image from './Image';
import Images from '../res/Images';

const schemes = ['wx', 'pyq'];

function mapStateToProps() {
  return state => ({
    share: getShare(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeShare,
  }, dispatch);
}

class ShareCom extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { share } = this.props;
    if (!share.show && nextProps.share.show) {
      setTimeout(() => {
        this.modalbox.open();
      });
    } else if (share.show && !nextProps.share.show) {
      this.modalbox.close();
    }
  }

  render() {
    const { closeShare, share } = this.props;
    if (!share.show) {
      return null;
    }
    return (
      <Modalbox
        position="bottom"
        onClosed={closeShare}
        style={styles.modalbox}
        ref={(v) => { this.modalbox = v; }}
      >
        <View>
          {
            schemes.map(v => <Image style={styles.shareIcon} key={v} source={Images[v]} />)
          }
        </View>
      </Modalbox>
    );
  }
}

const styles = StyleSheet.create({
  modalbox: {
    width: SCREEN_WIDTH,
    height: wPx2P(268),
  },
  shareIcon: {
    height: wPx2P(83),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareCom);
