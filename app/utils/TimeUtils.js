/**
 * @file 时间工具类
 * @date 2019/8/22 21:43
 * @author ZWW
 */

/**
 * 计算两个时间戳之间的时间差
 * @param time
 * @returns {number}
 */
export const checkTime = (time) => {
  return time - (Date.parse(new Date()) / 1000);
};

/**
 * 把两个时间戳之间的时间差转为时间格式 hh:mm:ss
 * @param {Number} timeStamp - 时间差
 * @returns {string}
 */
export function countDown(timeStamp) {
  let h, m, s;
  if (timeStamp > 0) {
    h = Math.floor(timeStamp / 3600 % 24);
    m = Math.floor(timeStamp / 60 % 60);
    s = Math.floor(timeStamp % 60);
    let h1 = h;
    let m1 = m;
    let s1 = s;
    if (h1 < 10) {
      h1 = `0${h1}`;
    }
    if (m1 < 10) {
      m1 = `0${m1}`;
    }
    if (s1 < 10) {
      s1 = `0${s1}`;
    }
    return `${h1}：${m1}：${s1}`
  }
}

