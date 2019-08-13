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

export default { debounce, debounceDelay };
