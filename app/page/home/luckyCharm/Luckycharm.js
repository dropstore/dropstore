import React, {PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Image from '../../../components/Image';
import {SCREEN_WIDTH} from '../../../common/Constant'
import Images from '../../../res/Images';
import TopCom from '../components/TopCom';

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
               
                <View>
                    <Image
                        source={this.props.selected ? Images.xh : Images.xm}>

                    </Image>
                </View>
                <View>
                    <Text>

                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class LuckyCharmList extends PureComponent {
    state = {
        selected: true,
        data: [
            {
                title: '第一行',
                id: 121217676762122
            },
            {
                title: '第二行',
                id: 1212556651212
            },
            {
                title: '第三行',
                id: 12121212
            },
        ]
    };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        Alert('被惦记的id是' + id)
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={true}
            title={item.title}
        />
    );

    render() {
        return (
            <View>
                <View>
                    <TopCom imageSource={Images.instructions} />
                    {/* <TouchableOpacity>
                        <Image resizeMode='stretch' source={Images.instructions}
                               style={styles.customerNotes}/>
                    </TouchableOpacity> */}
                </View>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>)
    }
}
const styles = StyleSheet.create({
    customerNotes: {
        width: SCREEN_WIDTH,
        padding: 10,
        margin: 10
    }
})
