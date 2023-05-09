import { setSession } from '../util/cm_util';
import { cm_util, getSession, nvl } from '../util/cm_util';
import { axiosModule } from './axios.js';

const createPrm = (method, url, data, succ, err, onAuth = true) => {
  return { method, url, data, succ, err };
};

const axiosConfig = {
  withCredentials: true, // 쿠키 cors 통신 설정
};
export const api = {
  post: function (url, data, succ, err) {
    let prm = createPrm('post', url, data, succ, err);
    axiosModule
      .post(prm.url, prm.data, axiosConfig)
      .then((res) => {
        prm.succ(res);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  postSuccess: function (url, data) {
    return new Promise((resolve, reject) => {
      this.post(
        url,
        data,
        (res) => {
          if (res.status !== 200) throw 'API 호출 실패!';
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  get: function (url, succ, err) {
    let prm = createPrm('get', url, null, succ, err);
    axiosModule
      .get(prm.url)
      .then((res) => {
        prm.succ(res);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  getSuccess: function (url) {
    return new Promise((resolve, reject) => {
      this.get(
        url,
        (res) => {
          if (res.status !== 200) throw 'API 호출 실패!';
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};

export const reissue = () => {
  let tokenMap = JSON.parse(sessionStorage.getItem('token'));
  console.log('토큰 재발급', tokenMap);
  axiosModule
    .post('/auth/reissue', tokenMap)
    .then((res) => {
      console.log(res);
      setSession(
        'token',
        JSON.stringify({
          ...tokenMap,
          accessToken: res.data.accessToken,
        })
      );
    })
    .catch(handleError);
};

/**
 * axios 에러 핸들러
 * @param {*} err
 */
export const handleError = (err) => {
  console.error(err);
  try {
    const res = err.response;
    const { data } = res;

    alert(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const cm_callsvc = {
  exec: api,
  reissue: reissue,
};
