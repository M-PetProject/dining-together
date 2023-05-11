import React, { useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import PlaceRecommend from './tab/PlaceRecommend.jsx';
import PlaceVote from './tab/PlaceVote';
import TimeVote from './tab/TimeVote';
import VoteStatus from './tab/VoteStatus';

export default function RoundTab() {
  const tabList = ['장소추천', '장소투표', '시간투표', '참여현황'];
  const tabPanelList = [<PlaceRecommend />, <PlaceVote />, <TimeVote />, <VoteStatus />];
  return <_RoundTab tabList={tabList} tabPanelList={tabPanelList} />;
}

const _RoundTab = (props) => {
  const { tabList = [], tabPanelList = [] } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
          {tabList.map((tab, index) => {
            return <Tab key={index} label={tab} />;
          })}
        </Tabs>
      </Box>
      {tabPanelList.map((panel, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {panel}
          </TabPanel>
        );
      })}
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
