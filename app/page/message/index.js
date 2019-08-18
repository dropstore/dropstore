import React, { Component } from 'react';
import NavigationBarCom from '../../components/NavigationBarCom';

export default class MessageCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationBarCom headerTitle="系统通知" isShowLeftView={false} />
    );
  }
}
