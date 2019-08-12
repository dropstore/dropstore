/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:48:28
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:36:37
 * @Description: 首页
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {inject, observer} from 'mobx-react';
import NavigationBarCom from '../../components/NavigationBarCom';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBarCom headerTitle={'首页'} isShowLeftView={false}/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button title='HomeDetailPage' onPress={() => this.props.navigation.navigate('homeDetail')}/>
                </View>
            </View>
        )
    }
}
