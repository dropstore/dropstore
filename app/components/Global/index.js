import React, { PureComponent } from 'react';
import { DeviceEventEmitter, View, StyleSheet } from 'react-native';
import ShareCom from './ShareCom';
import Modalbox from './Modalbox';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';

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
      share: {
        show: false,
        data: {},
      },
      modalbox: {
        show: false,
        data: {},
      },
    };
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('dropstoreGlobal', (e) => {
      if (e.dropstoreEventType === 'share') {
        this.setState({
          share: {
            show: true,
            data: e.params,
          },
        });
      } else if (e.dropstoreEventType === 'modalbox') {
        if (e.params) {
          this.setState({
            modalbox: {
              show: true,
              data: e.params,
            },
          });
        } else {
          this.modalbox.close();
        }
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  close = (type) => {
    this.setState({
      [type]: {
        show: false,
      },
    });
  }

  render() {
    const { share, modalbox } = this.state;
    return (
      <View style={styles.wrapper}>
        {
          share.show && (
            <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
              <ShareCom
                closeShare={() => this.close('share')}
                data={share.data}
                successCallback={data => successCallback('share', data)}
                failCallback={data => failCallback('share', data)}
              />
            </View>
          )
        }
        {
          modalbox.show && (
            <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
              <Modalbox
                data={modalbox.data}
                ref={(v) => { this.modalbox = v; }}
                onClosed={() => this.close('modalbox')}
              />
            </View>
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
