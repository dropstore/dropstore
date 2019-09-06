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

function formatDate(time) {
  const fullTime = new Date(time * 1000);
  let str = '';
  str += `${fullTime.getFullYear()}-`;
  str += (`${fullTime.getMonth() + 1}-`).padStart(3, 0);
  str += (`${fullTime.getDay()} `).padStart(3, 0);
  str += (`${fullTime.getHours()}:`).padStart(3, 0);
  str += (`${fullTime.getMinutes()}:`).padStart(3, 0);
  str += (`${fullTime.getSeconds()}`).padStart(2, 0);
  return str;
}

export { debounce, debounceDelay, formatDate };
