import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { teamMemberState, tokenState, userState } from '../atoms/atom';
import { isEmptyObj } from './cm_util';

export const useInputs = (initForm) => {
  const [form, setForm] = useState(initForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initForm), [initForm]);

  return [form, onChange, reset, setForm];
};

export const useCustomParam = () => {
  let _params = useParams();
  let Params = {};
  for (const [key, value] of Object.entries(_params)) {
    Params[key] = value[0].toUpperCase() + value.slice(1); // 첫 문자, 대문자 치환
  }

  return Params;
};

export const useAuth = () => {
  const navi = useNavigate();
  const location = useLocation();
  /// 사용자의 정보 atom({memberId, memberPassword, memberName})
  const [user, setUser] = useRecoilState(userState);
  const [teamMember, setTeamMember] = useRecoilState(teamMemberState);
  /// 사용자의 jwt토큰정보 atom ({accessToken, refreshToken})
  const [token, setToken] = useRecoilState(tokenState);
  const [isLogin, setIsLogin] = useState(!isEmptyObj(token));

  const signOut = () => {
    if (!isLogin) return;
    setToken();
  };

  useEffect(() => {
    setIsLogin(!isEmptyObj(token));
    if (!isEmptyObj(token)) {
      if (location.pathname === '/sign-in') {
        navi('/');
      }
    }
  }, [token]);

  useEffect(() => {
    if (isEmptyObj(teamMember) && isLogin) {
      navi('/team/select');
    }
  }, [teamMember]);

  return {
    user,
    setUser,
    teamMember,
    setTeamMember,
    token,
    setToken,
    isLogin,
    setIsLogin,
    signOut,
  };
};
