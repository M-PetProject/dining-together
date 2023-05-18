import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PropsInterface {
  /**
   * @desc 이름
   * @example "홍길동"
   */
  name?: string;

  /**
   * @desc 날짜
   * @example "20231231"
   */
  regDate?: string;

  /**
   * @desc 메뉴 아이템 목록
   * @example [ <MenuItem onClick={() => {}}>메뉴1</MenuItem> ]
   */
  menuItem?: React.ReactElement[];
}

export default function UserProfile(props: PropsInterface): React.ReactElement {
  const { name, regDate, menuItem } = props;
  const svc = useService();
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Avatar>{name?.[0]}</Avatar>
        <Typography variant={'subtitle1'}>{name ?? '작성자'}</Typography>
        <Typography color="text.secondary" variant={'subtitle2'}>
          {regDate && moment(regDate).format('YYYY-MM-DD')}
        </Typography>
      </Stack>

      {menuItem && (
        <>
          <IconButton
            onClick={(e) => {
              svc.setMenuAnchorEl(e.currentTarget);
              svc.setOpenMenu(!svc.openMenu);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu id="basic-menu" anchorEl={svc.menuAnchorEl} open={svc.openMenu} onClose={() => svc.setOpenMenu(false)}>
            {menuItem.map((menu, key) => (
              <div key={key}>{menu}</div>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
}

function useService() {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  return {
    openMenu,
    setOpenMenu,
    menuAnchorEl,
    setMenuAnchorEl,
  };
}
