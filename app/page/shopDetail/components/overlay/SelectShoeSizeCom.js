/**
 * @file 选择鞋码组件
 * @date 2019/8/19 9:26
 * @author ZWW
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Image from '../../../../components/Image';
import {SCREEN_WIDTH} from "../../../../common/Constant";
import ImageBackground from '../../../../components/ImageBackground';
import {commonStyle} from '../../../../res/style/CommonStyle';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {YaHei} from "../../../../res/FontFamily";
import {bottomStyle} from '../../../../res/style/BottomStyle';
import {shopDetail1} from '../../../../page/TempData';


export default class SelectShoeSizeCom extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
    }
  }

  componentDidMount() {
    let shoeList = [{
      'size': 36,
      'limit_num': 10,
      'stock': 10,
      'price': 1999,
    }, {
      'id': 1,
      'size': 36,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 2,
      'size': 33,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 3,
      'size': 32,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 4,
      'size': 32,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 5,
      'size': 32,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 6,
      'size': 32,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }, {
      'id': 7,
      'size': 32,
      'limit_num': 10,
      'stock': 10,
      'price': 1999
    }];
    for (let i = 0; i < shoeList.length; i++) {
      shoeList[i].count = 0;
    }
    this.setState({shoeList: shoeList})
  }

  changeChooseCount = (item, opertaor) => {
    let shoeList = this.state.shoeList;
    let totalCount = this.state.totalCount;
    for (let i = 0; i < shoeList.length; i++) {
      if (shoeList[i].id === item.id) {
        let _shoeData = shoeList[i];
        if (opertaor === '+') {
          if (_shoeData.count < 20) {
            _shoeData.count++;
            totalCount++;
          } else {
            alert('不能大于20')
          }
        } else {
          if (_shoeData.count !== 0) {
            _shoeData.count--;
            totalCount--;
          } else {
            alert('不能小于0')
          }
        }
      }
    }
    this.setState({shoeList: shoeList, totalCount: totalCount});
  };

  confirmChoose = (closeOver,getShopDetail) => {
    closeOver();
    getShopDetail();
  };

  render() {
    const {closeOver,getShopDetail} = this.props;
    return (
      <View style={_style.container}>
        <View style={{flex: 1,}}>
          <View style={commonStyle.row}>
            <View style={_style.mainView}>
              <Text style={_style.title}>鞋码选择</Text>
              <Text style={_style.alreadyChoose}>已选数量 {this.state.totalCount}</Text>
            </View>
            <TouchableOpacity style={_style.close} onPress={() => closeOver()}>
              <Image style={_style.close} source={Images.close_shoe}/>
            </TouchableOpacity>
          </View>
          <View style={_style.centerView}>
            <ScrollView>
              {
                this.state.shoeList && this.state.shoeList.map((item, index) => (
                  <View key={index}>
                    <View style={[commonStyle.row, {marginLeft: 43,}]}>
                      <Text style={_style.sizeAndCount}>{item.size}</Text>
                      <View style={[commonStyle.row, _style.rightView]}>
                        <Text style={_style.price}>{item.price}￥</Text>
                        <TouchableOpacity style={{padding: 5}}
                                          onPress={() => this.changeChooseCount(item, '-')}>
                          <Image style={_style.lrImage} source={Images.shoe_zjt}/>
                        </TouchableOpacity>
                        <Text style={_style.sizeAndCount}>{item.count}</Text>
                        <TouchableOpacity style={{padding: 5}}
                                          onPress={() => this.changeChooseCount(item, '+')}>
                          <Image style={_style.lrImage} source={Images.shoe_zjr}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Image
                      style={_style.line}
                      source={Images.shoe_hth}/>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
        <View style={bottomStyle.bottomView}>
          <ImageBackground style={bottomStyle.buttonOnlyOneChildView} source={Images.bg_right}
                           onPress={() => this.confirmChoose(closeOver,getShopDetail)}>
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 23
  },
  close: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 5,
    marginLeft: 10
  },
  alreadyChoose: {
    fontSize: 15,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: YaHei,
    fontWeight: '300',
    marginLeft: 20
  },
  centerView: {
    marginTop: 28,
    height: 250,
  },
  rightView: {
    position: 'absolute',
    right: 46,
    top: 0,
  },
  sizeAndCount: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18
  },
  price: {
    color: 'rgba(0,0,0,1)',
    fontSize: 15,
    marginRight: 31
  },
  lrImage: {
    width: 6,
    height: 8,
  },
  line: {
    width: 340,
    height: 1,
    marginTop: 12,
    marginBottom: 19,
    marginLeft: 26
  }
});


