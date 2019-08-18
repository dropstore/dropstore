import React, {PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Image from '../../../components/Image';

import ScaleView from '../../../components/ScaleView';
import { SCREEN_WIDTH } from '../../../common/Constant';
import Images from '../../../res/Images';


class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (

      <ScaleView style={styles.container} onPress={this._onPress}>
           <Image 
           source={ this.props.selected?require('../../../res/image/xh.png'):require('../../../res/image/xm.png')}>
           </Image>
        <View >
           <Text style={styles.nameText}>srgergreggrgrgr  rfrgrgrgdrf frgrdgr 黑色 efefefefefefefwaf</Text>
           
           <Text style={styles.priceText}>&1999</Text>
           <Text >2019/09/21</Text>
        </View>
        <Image 
           source={require('../../../res/image/x1.png')}>
        </Image>
      </ScaleView>
    );
  }
}
class MyTopImage extends React.PureComponent {
  _onPress = () => {
    
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
    data:[
      {
      title:'第一行' ,
      id:121217676762122
      },
      {
        title:'第二行' ,
        id:15668909334351212
        },
        {
          title:'第三行' ,
          id:121212787878712
          },
          {
            title:'第三行' ,
            id:121215656565212
            },
            {
              title:'第三行' ,
              id:1212165655212
              },
              {
                title:'第三行' ,
                id:1212565651212
                },
                {
                  title:'第三行' ,
                  id:121223231212
                  },
                  {
                    title:'第三行' ,
                    id:23232
                    },
                    {
                      title:'第三行' ,
                      id:1212132212
                      },
                      
  ]
  };
    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        Alert('被惦记的id是' + id)
    };

  _renderItem = ({item,index}) => {
      debugger
      (
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={true}
        title={item.title}
      />
    )
  };
  _renderTopImage = () => (
    <MyTopImage>

    </MyTopImage>
  );
  render() {
    return (
      <FlatList
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={3}
          style={{ flex: 1 }}
         data={this.state.data}
         extraData={this.state}
         keyExtractor={this._keyExtractor}
         ListHeaderComponent={this._renderTopImage}
         renderItem={this._renderItem}
       />)
  }
}
const styles = StyleSheet.create({
          customerNotes:{
              width:717,
              height:301,

          },
          container: {
            height:123,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 20,
            flexDirection: 'row',
          },
          nameText: {
            maxWidth: SCREEN_WIDTH - 175,
            flexShrink: 1,
            fontFamily: 'PingFangSC-Medium',
            lineHeight: 24,
            fontSize: 15,
            color: '#333333',
            fontWeight: '500',
            marginRight: 13,
          },
          imageBox:{
            padding:10,
            margin:10
          }
  })


