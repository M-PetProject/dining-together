import { setLocalStorage } from '../util/cm_util';
import { LocalStorageKey } from '../enum/enum';
import { TokenStateInterface } from '../atoms/atom';

export default function useAutoSignIn() {
  function setAutoSignIn(token: TokenStateInterface) {
    setLocalStorage(LocalStorageKey.IsAutoLogin, true);
    setLocalStorage(LocalStorageKey.Token, JSON.stringify(token));
  }

  function setAutoSignOut() {
    setLocalStorage(LocalStorageKey.IsAutoLogin, false);
    localStorage.removeItem(LocalStorageKey.Token);
  }

  return { setAutoSignIn, setAutoSignOut };
}
