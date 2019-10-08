import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, View, StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import ShareCom from './ShareCom';
import Modalbox from './Modalbox';

const callback = (dropstoreEventType, type, data) => {
  DeviceEventEmitter.emit('dropstoreCallback', {
    dropstoreEventType,
    type,
    data,
  });
};

const successCallback = (dropstoreEventType, data) => {
  callback(dropstoreEventType, 'success', data);
};

const failCallback = (dropstoreEventType, data) => {
  callback(dropstoreEventType, 'failed', data);
};

export default class Global extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      share: { show: false, data: {} },
      modalbox: { show: false, data: {} },
    };
  }

  show = (type, data) => {
    this.setState({ [type]: { show: true, data } });
  }

  hide = (type, immediately) => {
    if (immediately) {
      this.setState({ [type]: { show: false } });
    } else {
      this[type] && this[type].close();
    }
  }

  onClosed = (type) => {
    this.setState({ [type]: { show: false } });
  }

  render() {
    const { share, modalbox } = this.state;
    return (
      <View style={[styles.wrapper, { height: modalbox.show || share.show ? SCREEN_HEIGHT : 0, width: SCREEN_WIDTH }]}>
        {
          share.show && (
            <ShareCom
              onClosed={() => this.onClosed('share')}
              data={share.data}
              ref={(v) => { this.share = v; }}
              successCallback={data => successCallback('share', data)}
              failCallback={data => failCallback('share', data)}
            />
          )
        }
        {
          modalbox.show && (
            <Modalbox
              data={modalbox.data}
              ref={(v) => { this.modalbox = v; }}
              onClosed={() => this.onClosed('modalbox')}
            />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
  },
});
