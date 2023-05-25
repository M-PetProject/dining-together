import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosModule } from '../../api/axios.js';
import { handleError } from '../../api/cm_callsvc.js';
import { useState } from 'react';
import { useMemberDetailQuery, useTeamQuery } from '../../api/useQuerys.ts';
import { teamMemberState, userState, tokenState } from '../../atoms/atom.ts';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import styled from 'styled-components';
import useSignOut from '../../hooks/useSignOut';

const Element = styled.div`
  padding: 5px 10px;
  background-color: #d9d9d9;
  border-radius: 15px;
  margin: 0 2.5px;
`;

const MemberPage = () => {
  const svc = useService();

  const memberId = useParams().userId;
  const teamInfo = useRecoilValue(teamMemberState);
  const teamIdx = teamInfo.teamIdx;
  const setToken = useSetRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const setTeamMember = useSetRecoilState(teamMemberState);
  let navigate = useNavigate();

  const memberQuery = useMemberDetailQuery(memberId);
  const teamQuery = useTeamQuery(teamIdx);

  if (memberQuery.isLoading) return <div></div>;
  if (teamQuery.isLoading) return <div></div>;

  const {
    memberAllergyVos: allergys,
    memberHateFoodVos: hateFoods,
    memberIdx,
    memberLikeFoodVos: likeFoods,
    memberName,
  } = memberQuery.data.data;
  const teamMemberList = teamQuery.data.data.teamMemberVoList;

  const logout = useSignOut();

  const deleteMember = (teamIdx, memberIdx) => {
    return axiosModule
      .delete(`/team/${teamIdx}/member/${memberIdx}`)
      .then((res) => {
        setTeamMember();
        alert('선택하신 회원이 모임에서 제외되었습니다.');
        navigate(`/team/select`);
      })
      .catch(handleError);
  };

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography color="text.secondary">아이디</Typography>
          <Typography component="div" sx={{ mb: 1.5 }}>
            {memberId}
          </Typography>
          <Typography color="text.secondary">이름</Typography>
          <Typography component="div" sx={{ mb: 1.5 }}>
            {memberName}
          </Typography>
          <Typography color="text.secondary">내입맛</Typography>
          <Typography color="primary">좋아하는 요리</Typography>
          <div style={{ marginBottom: 10, display: 'flex' }}>
            {likeFoods.map((foodData) => {
              return <Element key={foodData.foodIdx}>{foodData.foodNm}</Element>;
            })}
          </div>
          <Typography color="primary">싫어하는 요리</Typography>
          <div style={{ marginBottom: 10, display: 'flex' }}>
            {hateFoods.map((foodData) => {
              return <Element key={foodData.foodIdx}>{foodData.foodNm}</Element>;
            })}
          </div>
          <Typography color="primary">알러지 있다면</Typography>
          <div style={{ marginBottom: 10, display: 'flex' }}>
            {allergys.map((foodData) => {
              // return <Typography variant="body2" key={foodData.allergyIdx}>{foodData.allergyNm}</Typography>;
              return <Element key={foodData.allergyIdx}>{foodData.allergyNm}</Element>;
            })}
          </div>
        </CardContent>
        <div style={{ padding: 16 }}>
          <Typography variant="body2" component="div" sx={{ mb: 1 }}>
            리더가 탈퇴하면 두번째 가입자가 리더를 자동승계합니다.
          </Typography>
          <div>
            {user.memberId === memberId ? (
              <div>
                <Button
                  variant="outlined"
                  size="big"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(`/member/edit/${user.memberId}`)}
                >
                  내정보수정
                </Button>
                <Button variant="outlined" size="big" sx={{ mr: 1 }} onClick={() => deleteMember(teamIdx, memberIdx)}>
                  모임탈퇴
                </Button>
                <Button
                  variant="contained"
                  size="big"
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              ``
            )}
            {user.memberId !== memberId && teamInfo.memberType === 'MASTER' ? (
              <Button variant="outlined" size="big" sx={{ mr: 1 }} onClick={() => deleteMember(teamIdx, memberIdx)}>
                모임강퇴
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

const useService = () => {};

export default MemberPage;
