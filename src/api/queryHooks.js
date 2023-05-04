import { useQuery } from 'react-query';
import { axiosModule } from './axios';

export const useMemberQuery = (option) => {
  return useQuery(['member'], () => axiosModule.get(`/member`), option);
};

export const useTeamQuery = (team_idx, option) => {
  let result = useQuery(['team', team_idx], ({ queryKey }) => axiosModule.get(`/team/${queryKey[1]}`), option);
  return result;
};

export const useGetNoticesQuery = (team_idx, option) => {
  let result = useQuery(
    ['team_notices', team_idx],
    ({ queryKey }) => axiosModule.get(`/notices/${queryKey[1]}`),
    option
  );
  return result;
};
