import React, { PureComponent } from 'react';
import { DeviceEventEmitter } from 'react-native';
import ShareCom from './ShareCom';

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
      type: null,
      share: {},
    };
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('dropstoreGlobal', (e) => {
      if (e.dropstoreEventType === 'toast') {
        console.log(e.params);
      } else if (e.dropstoreEventType === 'share') {
        this.setState({
          type: 'share',
          share: {
            ...e.params,
            show: true,
          },
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  close = () => {
    this.setState({ type: null });
  }

  render() {
    const { share, type } = this.state;
    if (!type) { return null; }
    return ({
      share: <ShareCom
        closeShare={this.close}
        share={share}
        successCallback={data => successCallback('share', data)}
        failCallback={data => failCallback('share', data)}
      />,
    }[type]);
  }
}
