import { MemberType } from '../enum/enum';

interface TimeInterface {
  regDtm: string;
  updDtm: string;
}

export interface PlaceInterface extends TimeInterface {
  placeBasicInfoIdx: number;
  creatorMemberIdx: number;
  creatorMemberName: string | null;
  name: string;
  intro: string;
  businessHours: string;
  publicYn: string;
  deleteYn: string;
  extUrl: string;
  imageUrl: string;
  rating: number;
  commentCount: number;
}

export interface CommentReqInterface {
  commentCd: string;
  postIdx: number;
  title: string;
  content: string;
  useYn: string;
}
export interface CommentResInterface {
  commentIdx: number;
  title: string;
  content: string;
  childrenCnt: number;
  regDate: string;
  memberId: string;
}
export interface MemberAllergyVoInterface {
  memberIdx: number;
  allergyIdx: number;
  allergyNm: string;
}
export interface MemberFoodVoInterface {
  memberIdx: number;
  foodIdx: number;
  foodNm: string;
}
export interface TeamMemberVoInterface {
  teamIdx: number;
  teamNm: string;
  memberIdx: number;
  memberId: string;
  memberName: string;
  memberType: MemberType;
  regDate: string;
}
