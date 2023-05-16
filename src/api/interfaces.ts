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
  deleteYn: string;
  extUrl: string;
  imageUrl: string;
  rating: number;
  commentCount: number;
}

export interface CommentInterface {
  commentCd: string;
  postIdx: number;
  title: string;
  content: string;
  useYn: string;
}
