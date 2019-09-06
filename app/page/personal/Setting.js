import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import {
  Image, ModalNormal, ActionSheet, ChangeSize,
} from '../../components';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { showToast } from '../../utils/MutualUtil';
import { closeModalbox, showModalbox } from '../../redux/actions/component';
import { request } from '../../http/Axios';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser, closeModalbox, showModalbox,
  }, dispatch);
}

const options = ['相册', '相机', '取消'];

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

  submit = () => {
    const { updateUser, navigation } = this.props;
    const { list } = this.state;
    updateUser({
      size: list[4].value,
      sex: { 男: 1, 女: 2 }[list[2].value],
      age: list[3].value,
      user_name: list[1].value,
    }).then(() => {
      showToast('资料修改成功');
      navigation.pop();
    });
  }

  sizeChange = (size) => {
    this.size = size;
  }

  onPress = (item) => {
    const { navigation, showModalbox, closeModalbox } = this.props;
    if (item.name === 'avatar') {
      this.actionSheet.show();
    } else if (item.name !== 'sex') {
      const customText = item.name === 'size' ? <ChangeSize onChange={this.sizeChange} initSize={item.value} /> : (
        <View style={styles.inputWrapper}>
          <TextInput
            maxLength={item.name === 'name' ? 12 : 3}
            keyboardType={item.name === 'name' ? null : 'number-pad'}
            placeholder={item.name === 'name' ? '输入昵称' : '输入年龄'}
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.input}
            defaultValue={item.value}
            clearButtonMode="while-editing"
            onChangeText={(text) => { this[item.name] = text; }}
          />
        </View>
      );
      showModalbox({
        element: (<ModalNormal
          sure={() => {
            const { list } = this.state;
            this.setState({
              list: list.map((v) => {
                if (v.name === item.name) {
                  return ({ ...v, value: this[v.name] });
                }
                return v;
              }),
            });
            closeModalbox();
          }}
          closeModalbox={closeModalbox}
          customText={customText}
          title={`修改${item.title}`}
        />),
        options: {
          style: {
            height: 250,
            width: 265,
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      });
    }
  }

  openPicker = (i) => {
    if ([0, 1].includes(i)) {
      ImagePicker[['openPicker', 'openCamera'][i]]({
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        cropping: true,
        freeStyleCropEnabled: true,
        useFrontCamera: true,
        mediaType: 'photo',
        cropperChooseText: '选择',
        cropperCancelText: '取消',
        loadingLabelText: '加载中...',
      }).then((image) => {
        console.log(image);
      });
    }
  }

  render() {
    const { list } = this.state;
    return (
      <View style={styles.container}>
        {
          list.map(v => (
            <TouchableOpacity onPress={() => this.onPress(v)} key={v.name} style={[styles.itemWrapper, { marginBottom: v.name === 'avatar' ? 7 : 2 }]}>
              <Text style={styles.text}>{v.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    v.name === 'avatar'
                      ? (
                        <View style={styles.imageWrapper}>
                          <Image
                            source={v.value ? { uri: v.value } : v.sex === '女' ? Images.iconGirl : Images.iconBoy}
                            style={{ ...styles.image, height: v.value ? wPx2P(40) : wPx2P(34), width: v.value ? wPx2P(40) : wPx2P(34) }}
                          />
                        </View>
                      ) : <Text style={styles.text}>{v.value}</Text>
                  }
                <Image source={Images.iconRight} style={styles.right} />
              </View>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity style={styles.btn} onPress={this.submit}>
          <Text style={{ color: '#fff', fontSize: 16 }}>确认修改</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={(o) => { this.actionSheet = o; }}
          options={options}
          cancelButtonIndex={2}
          onPress={this.openPicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 46,
    width: wPx2P(265),
    backgroundColor: Colors.OTHER_BACK,
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: hPx2P(PADDING_TAB + 30),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  inputWrapper: {
    height: 26,
    width: 200,
    overflow: 'hidden',
    borderRadius: 2,
    borderColor: '#8F8F8F',
    borderWidth: 0.5,
    paddingLeft: 7,
  },
  input: {
    flex: 1,
    fontSize: 12,
  },
  image: {
    overflow: 'hidden',
    borderRadius: wPx2P(20),
  },
  imageWrapper: {
    height: wPx2P(40),
    width: wPx2P(40),
    borderRadius: wPx2P(23.5),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(166, 166, 166)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 100,
        position: 'relative',
      },
    }),
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
    height: 7.5,
    width: 5,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
