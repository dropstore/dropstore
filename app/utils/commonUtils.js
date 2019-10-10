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

function formatDate(time, format = 'yyyy/MM/dd hh:mm:ss') {
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

export {
  debounce, debounceDelay, formatDate, formatTimeAgo,
};
