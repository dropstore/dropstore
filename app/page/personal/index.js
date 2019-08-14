/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:56:23
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:32:40
 * @Description: 个人中心界面
 */

import React, { Component } from 'react';
import NavigationBarCom from '../../components/NavigationBarCom';

export default class PersonalCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationBarCom headerTitle="个人中心" isShowLeftView={false} />
    );
  }
}
