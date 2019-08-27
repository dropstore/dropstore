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
    return `${add(h1)}：${add(m1)}：${add(s1)}`
  }
}

/**
 * 格式化时间戳
 * @param timeStamp
 * @returns {string}
 */
export const submitFormat = (timeStamp) => {
  let time = new Date(timeStamp * 1000);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  return `${add(y)}/${add(m)}/${add(d)} ${add(h)}:${add(mm)}`
};
const add = (m) => {
  return m < 10 ? '0' + m : m
};
