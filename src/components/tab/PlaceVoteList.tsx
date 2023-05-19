import React from 'react';
import { Card, CardContent, LinearProgress, MenuItem, Skeleton, Stack } from '@mui/material';
import UserProfile from '../UserProfile';
import Button from '@mui/joy/Button';
import { FormControl, List, ListItem, Radio, RadioGroup, Typography } from '@mui/joy';
import CommComment from '../CommComment';
import { CommCommentType } from '../../enum/enum';

export default function PlaceVoteList(): React.ReactElement {
  return (
    <Stack>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <UserProfile name={'엘리'} regDate={'20220422'} menuItem={[<MenuItem onClick={() => {}}>삭제</MenuItem>]} />
            <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
              <List
                sx={{
                  '--List-gap': '0.5rem',
                  '--ListItem-radius': '8px',
                }}
              >
                {['망원회관', '호남돼지', '계륵장군'].map((item, index) => (
                  <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                    <FormControl sx={{ p: 2, flexDirection: 'row', gap: 2, width: '100%' }}>
                      <Radio overlay value={item} />
                      <Stack direction={'row'} width="100%" spacing={2}>
                        <div style={{ width: '100%' }}>
                          <Typography level="h6">{item}</Typography>
                          <LinearProgress variant="determinate" value={50} />
                          <Typography level="body3">2명 / 베니, 제이크</Typography>
                        </div>
                        <Skeleton variant="rectangular" width={50} height="100%" />
                      </Stack>
                    </FormControl>
                  </ListItem>
                ))}
              </List>
            </RadioGroup>

            <Button variant={'outlined'} color={'primary'}>
              투표마감
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <CommComment commentType={CommCommentType.VOTE} />
    </Stack>
  );
}
