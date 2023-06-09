import { useQuery } from 'react-query';
import { axiosModule } from './axios';

export const defaultQueryOption = {
  staleTime: 1000 * 60 * 60,
};

export const useMemberQuery = (option) => {
  return useQuery(['member'], () => axiosModule.get(`/member`), option);
};

export const useMemberDetailQuery = (member_id, option) => {
  return useQuery(['member'], () => axiosModule.get(`/member/${member_id}`), option);
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

export const useNoticeDetailQuery = (team_idx, notice_idx, option) => {
  let result = useQuery(
    ['notice', team_idx, notice_idx],
    ({ queryKey }) => axiosModule.get(`/notice/${queryKey[1]}/${queryKey[2]}`),
    option
  );
  return result;
};

export const usePetGetPlacesQuery = (option) => {
  return useQuery(['places'], ({ queryKey }) => axiosModule.get('/places'), option);
};
export const usePetGetPlaceQuery = (idx, option) => {
  return useQuery(['place', idx], ({ queryKey }) => axiosModule.get(`/place/${idx}`), option);
};
