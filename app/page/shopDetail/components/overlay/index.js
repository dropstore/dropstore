import React from "react";
import {Overlay} from 'teaset';
import SelectShoeSizeCom from './SelectShoeSizeCom';
import ShareCom from './ShareCom';

// 选择鞋码浮层
export let showSelectShoeSizeOlView = (data) => {
  Overlay.show(
    <Overlay.PullView side='bottom' modal={false}>
      <SelectShoeSizeCom data={data}/>
    </Overlay.PullView>
  )
};

// 分享浮层
export let showShareOlView = (data) => {
  Overlay.show(
    <Overlay.PullView side='bottom' modal={false}>
      <ShareCom data={data}/>
    </Overlay.PullView>
  )
};
