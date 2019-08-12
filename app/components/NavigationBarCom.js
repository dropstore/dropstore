/*
 * @Author: Lsfern
 * @Date: 2019-08-12 14:43:12
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 19:04:36
 * @Description: 导航栏组件
 */

import React, {PureComponent} from 'react';
import {View} from 'react-native';
import { withNavigation } from 'react-navigation';
import {Label, NavigationBar} from 'teaset';
import CommonColor from '../res/color/CommonColor';

 class NavigationBarCom extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationBar
                type='ios'
                style={{backgroundColor: CommonColor.HEADER_COLOR}}
                tintColor={CommonColor.WHITE_COLOR}
                title={
                    <View style={{flex: 1, paddingLeft: 4, paddingRight: 4, alignItems: 'center'}}>
                        <Label style={{color: CommonColor.WHITE_COLOR, fontSize: 20}} text={this.props.headerTitle}/>
                    </View>
                }
                leftView={this.props.isShowLeftView ? <NavigationBar.BackButton title='Back' onPress={()=>this.props.navigation.goBack()}/> : <View/>}
            />
        )
    }
}
export default withNavigation(NavigationBarCom)