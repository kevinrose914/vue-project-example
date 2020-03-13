export function debounce(func, time, options) {
  const defaultOptions = Object.assign({}, {
    leading: false, // 事件开始时触发一次
    trailing: true, // 事件结束时触发一次
    context: null,
  }, options);
  let timer = null;
  const d = (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (defaultOptions.leading && !timer) {
      timer = setTimeout(null, time);
      func.apply(defaultOptions.context, args);
    } else if (defaultOptions.trailing) {
      timer = setTimeout(() => {
        func.apply(defaultOptions.context, args);
        timer = null;
      }, time);
    }
    d.cancel = () => {
      clearTimeout(timer);
      timer = null;
    };
  };
  return d;
}

export function throttle(func, time, options) {
  const times = time || 17;
  const defaultOptions = Object.assign({}, {
    leading: true,
    trailing: false,
    context: null,
  }, options);
  let previous = new Date(0).getTime();
  let timer = null;
  const t = (...args) => {
    const now = new Date().getTime();
    if (defaultOptions.leading) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          func.apply(defaultOptions.context, args);
        }, times);
      }
    } else if (now - previous > time) {
      func.apply(defaultOptions.context, args);
      previous = now;
    } else if (defaultOptions.trailing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(defaultOptions.context, args);
      }, times);
    }
  };
  t.cancel = () => {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };
  return t;
}

/**
 * @param {*} time 倒计时的时长，毫秒为单位
 * @param {*} showType 如何展示，支持：1s, 1:30
 */
export const countDownTime = (options, cb) => {
  const {
    time,
    timeType,
    interval,
    showType,
  } = options;
  if (Number.isNaN(time)) {
    return;
  }
  let isFirst = true;
  let timer = null;
  let target = null;
  if (timeType === 'distance') { // 时间间隔
    target = new Date().getTime() + time - 1;
  } else { // 到达时间
    target = time - 1;
  }
  function resultStr(result) {
    if (showType === 'sec') {
      return result;
    }
    if (showType === 'min') {
      const min = parseInt(result / 60, 0);
      const sec = result % 60;
      return `${min}:${sec}`;
    }
    if (showType === 'hour') {
      const hour = parseInt(result / 60 / 60, 0);
      const min = parseInt(result / 60, 0);
      const sec = result % 60;
      return `${hour}:${min}:${sec}`;
    }
    return result;
  }
  function output(distance) {
    const result = Math.floor((distance) / 1000);
    if (cb) {
      cb(resultStr(result));
    }
  }
  function timeout() {
    const now = new Date().getTime();
    const distance = target - now;
    if (isFirst) { // 第一次进来计算
      output(distance);
      isFirst = false;
      timer = setTimeout(() => {
        timeout(); // 间隔一秒后，递归
      }, interval || 1000);
    } else if (now < target) {
      output(distance); // 不是第一次的，先执行回调，再启用延时器递归
      timer = setTimeout(() => {
        timeout();
      }, interval || 1000);
    } else { // 关闭延时器，再次执行回调，通知倒计时结束
      clearTimeout(timer);
      timer = null;
      if (cb) {
        cb('over');
      }
    }
  }
  timeout.clear = () => {
    clearTimeout(timer);
    timer = null;
    if (cb) {
      cb('over');
    }
  };
  timeout();
  return timeout; // eslint-disable-line
};