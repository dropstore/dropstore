/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:51:53
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:34:16
 * @Description: 球鞋锦鲤界面
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import NavigationBarCom from '../../components/NavigationBarCom';


export default class ShoeKoiFishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavigationBarCom headerTitle={'球鞋锦鲤'} isShowLeftView={false}/>
        )
    }
}
