import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { Avatar, Button, Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { headerState } from '../../atoms/atom';
import { isEmptyObj } from '../../util/cm_util';

import { useMemberQuery, useTeamQuery } from '../../api/queryHooks.js';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const TeamMemberInfoPage = () => {
  const svc = useService();

  if (svc.getTeamQuery.isLoading) return;

  return (
    <Stack spacing={3}>
      {svc.getTeamQuery.data?.data.teamMemberVoList.map((teamMember) => {
        return (
          <Card key={teamMember.memberId}>
            <CardHeader
              title={teamMember.memberName}
              avatar={<Avatar>P</Avatar>}
              action={
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              }
              subheader={teamMember.regDate}
            />
          </Card>
        );
      })}
    </Stack>
  );
};

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);

  const getMemberQuery = useMemberQuery();
  const teamIdx = getMemberQuery.data?.data.teamMemberVos[0].teamIdx;

  const getTeamQuery = useTeamQuery(teamIdx, { enabled: getMemberQuery.isSuccess });

  const renderHeader = (data) => {
    const { memberType, teamNm } = data;

    setHeaderState({
      left: (
        <Button onClick={() => navi('/')}>
          <ChevronLeftIcon />
          {teamNm}
        </Button>
      ),
      right: <IconButton></IconButton>,
    });
  };

  useEffect(() => {
    if (getMemberQuery.isSuccess) {
      const { teamMemberVos } = getMemberQuery.data.data;
      console.log();
      if (isEmptyObj(teamMemberVos)) {
        navi('/team/select');
      } else {
        renderHeader(teamMemberVos[0]);
      }
    }
  }, [getMemberQuery]);

  useEffect(() => {
    if (getTeamQuery.isSuccess) {
      console.log(getTeamQuery.data.data);
    }
  }, [getTeamQuery]);

  return {
    getTeamQuery,
  };
};

export default TeamMemberInfoPage;
