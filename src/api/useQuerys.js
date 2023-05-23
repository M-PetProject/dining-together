import { useQuery } from 'react-query';
import { axiosModule } from './axios';

export const defaultQueryOption = {
  staleTime: 1000 * 60 * 60,
};

export const useMemberQuery = (option = defaultQueryOption) => {
  return useQuery(['member'], () => axiosModule.get(`/member`), option);
};

<<<<<<< HEAD
export const useMemberDetailQuery = (member_id,option) => {
  return useQuery(['member'], () => axiosModule.get(`/member/${member_id}`), option);
};

export const useTeamQuery = (team_idx, option) => {
=======
export const useTeamQuery = (team_idx, option = defaultQueryOption) => {
>>>>>>> 7f6b1e208c4fdf4f7893b86769649ebd990a4c91
  let result = useQuery(['team', team_idx], ({ queryKey }) => axiosModule.get(`/team/${queryKey[1]}`), option);
  return result;
};

export const useNoticesQuery = (team_idx, option = defaultQueryOption) => {
  let result = useQuery(
    ['team_notices', team_idx],
    ({ queryKey }) => axiosModule.get(`/notices/${queryKey[1]}`),
    option
  );
  return result;
};

export const useNoticeDetailQuery = (team_idx, notice_idx, option = defaultQueryOption) => {
  let result = useQuery(
    ['notice', team_idx, notice_idx],
    ({ queryKey }) => axiosModule.get(`/notice/${queryKey[1]}/${queryKey[2]}`),
    option
  );
  return result;
};

export const usePetGetPlacesQuery = (option = defaultQueryOption) => {
  return useQuery(['places'], ({ queryKey }) => axiosModule.get('/places'), option);
};
export const usePetGetPlaceQuery = (idx, option = defaultQueryOption) => {
  return useQuery(['place', idx], ({ queryKey }) => axiosModule.get(`/place/${idx}`), option);
};
