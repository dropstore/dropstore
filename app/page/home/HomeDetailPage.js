/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:48:28
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:36:02
 * @Description: 测试页面
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import NavigationBarCom from '../../components/NavigationBarCom';


export default class HomeDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBarCom headerTitle={'详情界面'} isShowLeftView={true}/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>测试界面</Text>
                </View>
            </View>

        )
    }
}
