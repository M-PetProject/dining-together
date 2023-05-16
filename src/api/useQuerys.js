import { useQuery } from 'react-query';
import { axiosModule } from './axios';
import { CommentType } from '../enum/enum';

const defaultOption = {
  staleTime: 1000 * 60 * 60,
};

export const useMemberQuery = (option = defaultOption) => {
  return useQuery(['member'], () => axiosModule.get(`/member`), option);
};

export const useTeamQuery = (team_idx, option = defaultOption) => {
  let result = useQuery(['team', team_idx], ({ queryKey }) => axiosModule.get(`/team/${queryKey[1]}`), option);
  return result;
};

export const useNoticesQuery = (team_idx, option = defaultOption) => {
  let result = useQuery(
    ['team_notices', team_idx],
    ({ queryKey }) => axiosModule.get(`/notices/${queryKey[1]}`),
    option
  );
  return result;
};

export const useNoticeDetailQuery = (team_idx, notice_idx, option = defaultOption) => {
  let result = useQuery(
    ['notice', team_idx, notice_idx],
    ({ queryKey }) => axiosModule.get(`/notice/${queryKey[1]}/${queryKey[2]}`),
    option
  );
  return result;
};

export const usePetGetPlacesQuery = (option = defaultOption) => {
  return useQuery(['places'], ({ queryKey }) => axiosModule.get('/places'), option);
};
export const usePetGetPlaceQuery = (idx, option = defaultOption) => {
  return useQuery(['place', idx], ({ queryKey }) => axiosModule.get(`/place/${idx}`), option);
};
