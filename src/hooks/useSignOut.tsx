import { useRecoilState } from 'recoil';
import { teamMemberState, tokenState, userState } from '../atoms/atom';
import { useNavigate } from 'react-router-dom';
import useAutoSignIn from './useAutoSignIn';
import { isEmptyObj } from '../util/cm_util';

export default function useSignOut() {
  const navi = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [teamMember, setTeamMember] = useRecoilState(teamMemberState);
  /// 사용자의 jwt토큰정보 atom ({accessToken, refreshToken})
  const [token, setToken] = useRecoilState(tokenState);

  const { setAutoSignOut } = useAutoSignIn();

  function handleSignOut() {
    if (isEmptyObj(token)) return;
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    setToken(null);
    setUser(null);
    setTeamMember(null);

    setAutoSignOut();

    navi('/sign-in');
  }

  return { handleSignOut };
}
