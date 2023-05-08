import { useQuery } from 'react-query';
import { axiosModule } from './axios';
import { CommentType } from '../enum/enum';

export const useMemberQuery = (option) => {
  return useQuery(['member'], () => axiosModule.get(`/member`), option);
};

export const useTeamQuery = (team_idx, option) => {
  let result = useQuery(['team', team_idx], ({ queryKey }) => axiosModule.get(`/team/${queryKey[1]}`), option);
  return result;
};

export const useNoticesQuery = (team_idx, option) => {
  let result = useQuery(
    ['team_notices', team_idx],
    ({ queryKey }) => axiosModule.get(`/notices/${queryKey[1]}`),
    option
  );
  return result;
};

export const useCommentQuery = (team_idx, idx, comment_type, option) => {
  let result = useQuery(['comment_list', team_idx, idx, comment_type], getCommentTypeFn(comment_type), option);
  return result;
};

const getCommentTypeFn = (comment_type) => {
  switch (comment_type) {
    case CommentType.NOTC: {
      return ({ queryKey }) => axiosModule.get(`/notice/${queryKey[1]}/${queryKey[2]}/comments`);
    }
  }
};

export const useNoticeDetailQuery = (team_idx, notice_idx, option = {}) => {
  let result = useQuery(
    ['notice', team_idx, notice_idx],
    ({ queryKey }) => axiosModule.get(`/notice/${queryKey[1]}/${queryKey[2]}`),
    option
  );
  return result;
};
