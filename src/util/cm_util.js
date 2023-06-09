export const nvl = (val, defaultVal) => {
  if (isEmptyObj(defaultVal)) {
    defaultVal = '';
  }

  if (isEmptyObj(val)) {
    return defaultVal;
  }

  return val;
};

export const isEmptyObj = (obj) => {
  if (typeof obj === 'undefined') {
    return true;
  }
  if (typeof obj === 'string' && obj === '') {
    return true;
  }
  if (typeof obj === 'function') {
    return false;
  }
  if (typeof obj === 'boolean') {
    return false;
  }
  if (typeof obj === 'number') {
    return false;
  }
  if (typeof obj === 'bigint') {
    return false;
  }
  if (obj instanceof FormData) {
    return false;
  }
  if (obj instanceof Promise) {
    return false;
  }
  if (typeof obj === 'object') {
    if (obj === null) {
      return true;
    }
    if (Array.isArray(obj) && obj.length < 1) {
      return true;
    }
    if (Object.keys(obj).length > 0) {
      return false;
    }
    var objStr = JSON.stringify(obj);
    if (objStr === '{}' || objStr === '[]') {
      return true;
    }
  }
  return false;
};

export const getSession = (key) => {
  return sessionStorage.getItem(key);
};

export const setSession = (key, value) => {
  sessionStorage.setItem(key, value);
};
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const rpad = function (str, pStr, len) {
  if (cm_util.isEmptyObj(str)) {
    str = '';
  }
  var result = str + '';
  if (cm_util.isEmptyObj(pStr)) {
    pStr = ' ';
  }
  var cnt = len - str.length;
  var temp = '';
  for (var i = 0; i < cnt; i++) {
    temp += pStr + '';
  }
  return result + temp;
};
export const lpad = function (str, pStr, len) {
  if (cm_util.isEmptyObj(str)) {
    str = '';
  }
  var result = str + '';
  if (cm_util.isEmptyObj(pStr)) {
    pStr = ' ';
  }
  var cnt = len - str.length;
  var temp = '';
  for (var i = 0; i < cnt; i++) {
    temp += pStr + '';
  }
  return temp + result;
};

export const createErr = function (caller, msg) {
  return {
    response: {
      data: {
        rslt_msg: msg,
        caller: caller,
      },
    },
  };
};

export const cm_util = {
  nvl: nvl,

  isEmptyObj: isEmptyObj,

  getSession: getSession,

  setSession: setSession,

  rpad: rpad,
  lpad: lpad,

  createErr: createErr,
};

/**
 * str : 16자리 문자열 => yyyy-mm-dd
 */
export const dateFormat = (str) => {
  let year = str.slice(0, 4);
  let month = str.slice(4, 6);
  let day = str.slice(6, 8);
  let hour = str.slice(8, 10);
  let min = str.slice(10, 12);
  let sec = str.slice(12, 14);

  return `${year}-${month}-${day}`;
};
