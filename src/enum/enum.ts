export const SaveType = {
  POST: 'post',
  PUT: 'put',
};

export const CommentType = {
  NOTC: 'NOTC',
  PLACE: 'PLAC',
};

export enum CommCommentType {
  NOTC = 'NOTC',
  PLACE = 'PLAC',
  VOTE = 'VOTE',
}

export enum MemberType {
  MEMBER = 'MEMBER',
  MASTER = 'MASTER',
}

export enum LocalStorageKey {
  IsAutoLogin = 'is_auto_login',
  Token = 'token',

  IsRememberId = 'is_remember_id',
  RememberId = 'remember_id',
}
