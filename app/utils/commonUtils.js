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

function formatDate(time, separation = '-') {
  if (!time) { return ''; }
  const fullTime = new Date(time * 1000);
  let str = '';
  str += `${fullTime.getFullYear()}${separation}`;
  str += (`${fullTime.getMonth() + 1}${separation}`).padStart(3, 0);
  str += (`${fullTime.getDate() + 1} `).padStart(3, 0);
  str += (`${fullTime.getHours()}:`).padStart(3, 0);
  str += (`${fullTime.getMinutes()}:`).padStart(3, 0);
  str += (`${fullTime.getSeconds()}`).padStart(2, 0);
  return str;
}

function formatDateNoYear(time, separation = '/') {
  if (!time) { return ''; }
  const fullTime = new Date(time * 1000);
  let str = '';
  str += (`${fullTime.getMonth() + 1}${separation}`).padStart(3, 0);
  str += (`${fullTime.getDate() + 1} `).padStart(3, 0);
  str += (`${fullTime.getHours()}:`).padStart(3, 0);
  str += (`${fullTime.getMinutes()}`).padStart(2, 0);
  return str;
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
  debounce, debounceDelay, formatDate, formatTimeAgo, formatDateNoYear,
};
