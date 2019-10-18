import {
  View, Text, TouchableOpacity, Linking,
} from 'react-native';
import React from 'react';
import { showModalbox } from './MutualUtil';
import Colors from '../res/Colors';
import { YaHei } from '../res/FontFamily';

let isChecked = false;
function debounce(fun, delay = 1000) {
  return (...params) => {
    if (!fun.timer || Date.now() - fun.timer > delay) {
      fun.timer = Date.now();
      fun(...params);
    }
  };
}

function debounceDelay(fun, delay = 350) {
  return (...params) => {
    if (fun.timer) {
      clearTimeout(fun.timer);
    }
    fun.timer = setTimeout(() => {
      fun(...params);
    }, delay);
  };
}

function formatDate(time, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!time) { return ''; }
  const fullTime = new Date(time * 1000);
  return format
    .replace('yyyy', fullTime.getFullYear())
    .replace('MM', `${fullTime.getMonth() + 1}`.padStart(2, 0))
    .replace('dd', `${fullTime.getDate()}`.padStart(2, 0))
    .replace('hh', `${fullTime.getHours()}`.padStart(2, 0))
    .replace('mm', `${fullTime.getMinutes()}`.padStart(2, 0))
    .replace('ss', `${fullTime.getSeconds()}`.padStart(2, 0));
}

function formatTimeAgo(time) {
  const now = Date.now() / 1000;
  const diff = now - time;
  if (diff < 60) {
    return '刚刚';
  } if (diff < 3600) {
    return `${parseInt(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${parseInt(diff / 3600)}小时前`;
  }
  return formatDate(time);
}

function needUpdate(appVersion, minVersion) {
  if (isChecked) { return; }
  isChecked = true;
  const arr1 = appVersion.split('.').map(v => v * 1);
  const arr2 = minVersion.split('.').map(v => v * 1);
  let updateIsOpen = false;
  arr1.forEach((v, i) => {
    if (v < arr2[i] && !updateIsOpen) {
      updateIsOpen = true;
      showModalbox({
        element: (
          <View style={{
            backgroundColor: '#fff', height: '100%', width: '100%', borderRadius: 2, overflow: 'hidden',
          }}
          >
            <Text style={{
              fontSize: 16, fontFamily: YaHei, textAlign: 'center', marginTop: 50,
            }}
            >
              {'版本太旧，请升级至最新版本'}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.baidu.com')}
              style={{
                backgroundColor: Colors.YELLOW,
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                width: '100%',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>确定</Text>
            </TouchableOpacity>
          </View>
        ),
        options: {
          style: {
            height: 180,
            width: 240,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          backdropPressToClose: false,
        },
      });
    }
  });
}

export {
  debounce, debounceDelay, formatDate, formatTimeAgo, needUpdate,
};
