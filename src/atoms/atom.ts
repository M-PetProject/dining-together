import { atom } from 'recoil';
import { getSession, isEmptyObj, nvl } from '../util/cm_util';
import { MemberAllergyVoInterface, MemberFoodVoInterface, TeamMemberVoInterface } from '../api/interfaces';

const sessionStorageEffect =
  (key) =>
  // setSelf 함수는 세션스토리지에서 값을 불러와 초기값을 지정해주는 역할.
  // onSet 함수는 해당 atom값이 변경될 때마다 세션스토리지와 atom 값을 동기화해주는 역할
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isEmptyObj(newValue) ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

interface UserStateInterface {
  memberId: string;
  memberIdx: number;
  memberName: string;
  memberAllergyVos: MemberAllergyVoInterface[];
  memberLikeFoodVos: MemberFoodVoInterface[];
  memberHateFoodVos: MemberFoodVoInterface[];
  teamMemberVos: TeamMemberVoInterface[];
}
// 사용자 정보
export const userState = atom<UserStateInterface>({
  key: 'user',
  default: {},
  effects: [sessionStorageEffect('user')],
});

// 사용자_팀 정보
export const teamMemberState = atom<TeamMemberVoInterface>({
  key: 'team_member',
  default: {},
  effects: [sessionStorageEffect('team_member')],
});

export interface TokenStateInterface {
  accessToken: string;
  refreshToken: string;
}
// 사용자 토큰 정보 (AT, RT)
export const tokenState = atom<TokenStateInterface | null>({
  key: 'token',
  default: {},
  // effects : atom 초기화 or 동기화할때, 사용
  effects: [sessionStorageEffect('token')],
});

// 공통 다이얼로그
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

// 공통 토스트
export const alertToastOpenState = atom({
  key: 'alertToastOpenState',
  default: false,
});
export const alertToastState = atom({
  key: 'alertToastState',
  default: '기본 토스트메세지입니다.',
});

export interface HeaderStateInterface {
  left?: HeaderLeft;
  right?: React.ReactElement;
}
interface HeaderLeft {
  header: React.ReactElement;
  subHeader: string;
}
// 공통 헤더
export const headerState = atom<HeaderStateInterface | null>({
  key: 'headerState',
  default: null,
});
