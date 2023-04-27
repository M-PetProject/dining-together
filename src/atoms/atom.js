import { atom } from 'recoil';
import { getSession, isEmptyObj, nvl } from '../util/cm_util';

const sessionStorageEffect =
  (key) =>
  // setSelf 함수는 세션스토리지에서 값을 불러와 초기값을 지정해주는 역할.
  // onSet 함수는 해당 atom값이 변경될 때마다 세션스토리지와 atom 값을 동기화해주는 역할
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isEmptyObj(newValue) ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userState = atom({
  key: 'user',
  default: {},
  effects: [sessionStorageEffect('user')],
});

export const tokenState = atom({
  key: 'token',
  default: {},
  // effects : atom 초기화 or 동기화할때, 사용
  effects: [sessionStorageEffect('token')],
});

export const alertDialogOpenState = atom({
  key: 'alertDialogOpenState',
  default: false,
});
export const alertDialogState = atom({
  key: 'alertDialogState',
  default: {
    title: '제목',
    content: '내용',
    succFn: null,
  },
});

export const alertToastOpenState = atom({
  key: 'alertToastOpenState',
  default: false,
});
export const alertToastState = atom({
  key: 'alertToastState',
  default: '기본 토스트메세지입니다.',
});

export const headerState = atom({
  key: 'headerState',
  default: null,
});
