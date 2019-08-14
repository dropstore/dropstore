/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:54:20
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:35:22
 * @Description:消息中心界面
 */

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
