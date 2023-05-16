import React from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { usePetGetPlacesQuery } from '../../api/useQuerys.js';
import { PlaceInterface } from '../../api/interfaces';
import StarIcon from '@mui/icons-material/Star';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import moment from 'moment';
import ImageError from '../ImageError';

const PlaceRecommendList: React.FC = () => {
  const placeQuery = usePetGetPlacesQuery();

  if (placeQuery.isLoading) return <div />;

  const { data: placeDataList } = placeQuery.data;

  return (
    <Stack spacing={3}>
      {placeDataList.map((place: PlaceInterface) => {
        return (
          <Card key={place.placeBasicInfoIdx}>
            <CardContent>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Avatar>{place.creatorMemberName?.[0]}</Avatar>
                  <Typography variant={'subtitle1'}>{place.creatorMemberName ?? '작성자'}</Typography>
                  <Typography color="text.secondary" variant={'subtitle2'}>
                    {moment(place.regDtm).format('YYYY-MM-DD')}
                  </Typography>
                </Stack>
              </Stack>

              <ImageError
                imgUrl={place.imageUrl}
                width={'100%'}
                height={150}
                style={{ marginTop: 2, marginBottom: 2 }}
              />
              <Typography variant={'h5'}>{place.name}</Typography>
              <Typography variant="body1">{place.intro}</Typography>

              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <StarIcon sx={{ color: 'orange' }} />
                  <Typography color="text.secondary" variant={'subtitle2'}>
                    {place.rating}
                  </Typography>
                  &emsp;
                  <Typography color="text.secondary" variant={'subtitle2'}>
                    {place.businessHours}
                  </Typography>
                </Stack>
                <ModeCommentIcon />
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};
export default PlaceRecommendList;
