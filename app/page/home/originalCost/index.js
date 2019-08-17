import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {showModal, hideToastLoading, showModalLoading} from '../../../utils/MutualUtil';

export default class OriginalCost extends PureComponent {
  componentDidMount() {
    showModal('确定退出登录吗?', () => {
      alert('确定');
    }, {
      leftText: '不确定', leftCallBack: () => {
        alert('不确定');
      }
    })
  }

  render() {
    return <Text>原价发售</Text>;
  }
}
