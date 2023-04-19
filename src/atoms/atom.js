import { atom } from 'recoil';
import { getSession, nvl } from '../util/cm_util';

const sessionStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      const confirm = newValue.length === 0;
      confirm ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userState = atom({
  key: 'user',
  default: {},
});

export const tokenState = atom({
  key: 'token',
  default: nvl(getSession('token'), {}),
  effects: [sessionStorageEffect('token')],
});
