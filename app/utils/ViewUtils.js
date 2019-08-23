/**
 * @file 浮层控制模块
 * @date 2019/8/21 13:24
 * @author ZWW
 */

import React from "react";
import {Overlay} from 'teaset';

/**
 * 关闭浮层
 * @param key 唯一key
 */
let hideOlView = (key) => {
  if (key !== -1) {
    Overlay.hide(
      key
    )
  }
};
export {
  hideOlView
}

