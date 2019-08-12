/*
 * @Author: Lsfern
 * @Date: 2019-08-11 00:23:59
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 19:22:25
 * @Description: 广告页
 */

import React, {Component} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import System from '../utils/System';
import CommonImages from '../res/image/CommonImages';

export default class AdvertPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Image style={_styles.advert}
                       resizeMode='cover'
                       source={CommonImages.advert}>
                </Image>
                <View style={{position: 'absolute', right: 20, top: 20}}>
                    <Button title='跳过' onPress={() => this.props.navigation.navigate('homePage')}/>
                </View>
            </View>
        );
    }
}
const _styles = StyleSheet.create({
    advert: {
        width: System.SCREEN_WIDTH,
        height: System.SCREEN_HEIGHT,
    },
});
