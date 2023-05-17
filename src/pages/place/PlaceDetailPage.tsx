import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardContent, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import ImageError from '../../components/ImageError';
import StarIcon from '@mui/icons-material/Star';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { usePetGetPlaceQuery } from '../../api/useQuerys';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommComment from '../../components/CommComment.js';
import { CommentType } from '../../enum/enum';
import { PlaceInterface } from '../../api/interfaces';
import MessageIcon from '@mui/icons-material/Message';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerState, HeaderStateInterface, userState } from '../../atoms/atom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LinkIcon from '@mui/icons-material/Link';
import { axiosModule } from '../../api/axios';
import { handleError } from '../../api/cm_callsvc';
const PlaceDetailPage: React.FC = () => {
  const svc = useService();
  const { idx } = useParams();

  const placeQuery = usePetGetPlaceQuery(idx);
  if (placeQuery.isLoading) return <div />;

  const placeData: PlaceInterface = placeQuery.data.data;

  return (
    <div>
      <Card key={placeData.placeBasicInfoIdx}>
        <CardContent>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Avatar>{placeData.creatorMemberName?.[0]}</Avatar>
              <Typography variant={'subtitle1'}>{placeData.creatorMemberName ?? '작성자'}</Typography>
              <Typography color="text.secondary" variant={'subtitle2'}>
                {moment(placeData.regDtm).format('YYYY-MM-DD')}
              </Typography>
            </Stack>
            {svc.userRecoilState.memberIdx == placeData.creatorMemberIdx ? (
              <>
                <IconButton
                  onClick={(e) => {
                    svc.setMenuAnchorEl(e.currentTarget);
                    svc.setOpenMenu(!svc.openMenu);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={svc.menuAnchorEl}
                  open={svc.openMenu}
                  onClose={() => svc.setOpenMenu(false)}
                >
                  <MenuItem onClick={() => svc.onMoveEditPage(placeData.placeBasicInfoIdx)}>수정</MenuItem>
                  <MenuItem onClick={() => svc.onDelete(placeData.placeBasicInfoIdx)}>삭제</MenuItem>
                </Menu>
              </>
            ) : (
              ''
            )}
          </Stack>

          <ImageError
            imgUrl={placeData.imageUrl}
            width={'100%'}
            height={200}
            style={{ marginTop: 5, marginBottom: 10 }}
          />
          <Typography variant={'h5'}>
            {placeData.name}
            <a href={placeData.extUrl} target="_blank">
              <LinkIcon />
            </a>
          </Typography>
          <Typography variant="body1">{placeData.intro}</Typography>

          <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 2 }}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <StarIcon sx={{ color: 'orange' }} />
              <Typography color="text.secondary" variant={'subtitle2'}>
                {placeData.rating}
              </Typography>
              &emsp;
              <Typography color="text.secondary" variant={'subtitle2'}>
                {placeData.businessHours}
              </Typography>
            </Stack>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <MessageIcon />
              <span>{placeData.commentCount ?? 0}</span>
            </div>
          </Stack>
        </CardContent>
      </Card>
      <CommComment commentType={CommentType.PLACE} postIdx={placeData.placeBasicInfoIdx} />
    </div>
  );
};

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState<HeaderStateInterface>(headerState);
  const userRecoilState = useRecoilValue(userState);

  const [openMenu, setOpenMenu] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    setHeaderState({
      left: {
        header: (
          <Button onClick={() => navi(-1)}>
            <ChevronLeftIcon />
            <p>장소추천상세</p>
          </Button>
        ),
      },
    });
  }, []);

  function onMoveEditPage(placeIdx: number) {
    navi(`/place/edit/${placeIdx}`);
  }

  function onDelete(placeBasicInfoIdx: number): void {
    if (confirm('삭제하시겠습니까?')) {
      axiosModule
        .delete(`/place/${placeBasicInfoIdx}`)
        .then((res) => {
          const { data } = res;
          alert(data);
          navi(-1);
        })
        .catch(handleError);
    }
  }

  return {
    userRecoilState,
    menuAnchorEl,
    setMenuAnchorEl,
    openMenu,
    setOpenMenu,
    onDelete,
    onMoveEditPage,
  };
};
export default PlaceDetailPage;
