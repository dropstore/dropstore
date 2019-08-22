/**
 * @file 时间工具类
 * @date 2019/8/22 21:43
 * @author ZWW
 */

export const checkTime = (time) => {
  return time - (Date.parse(new Date()) / 1000) > 0;
};
