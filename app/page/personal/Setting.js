import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, Platform, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import ImageBackground from '../../components/ImageBackground';
import Image from '../../components/Image';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { wPx2P } from '../../utils/ScreenUtil';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class Setting extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      list: [
        { title: '头像', name: 'avatar', value: userInfo.avatar },
        { title: '昵称', name: 'name', value: userInfo.user_name },
        { title: '性别', name: 'sex', value: userInfo.sex },
        { title: '年龄', name: 'age', value: userInfo.age },
        { title: '鞋码', name: 'size', value: userInfo.size },
      ],
    };
  }

  render() {
    const { list } = this.state;
    return (
      <View style={styles.container}>
        {
          list.map(v => (
            <TouchableOpacity key={v.name} style={[styles.itemWrapper, { marginBottom: v.name === 'avatar' ? 7 : 2 }]}>
              <Text style={styles.text}>{v.title}</Text>
              {
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {
                    v.name === 'avatar'
                      ? (
                        <ImageBackground source={Images.frameAvatar} style={styles.frameAvatar}>
                          <Image source={Images.iconBoy} style={{ height: 45, width: 45 }} />
                        </ImageBackground>
                      ) : <Text style={styles.text}>{v.title}</Text>
                  }
                  <Image source={Images.iconRight} style={styles.right} />
                </View>
              }
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 13,
  },
  frameAvatar: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    height: 15,
    width: 10,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
