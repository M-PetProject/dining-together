### prettier 설정

- vscode > extension > [prettier] 검색 후, install
- settings.json (VS Code) 파일 수정

```
{
  ...
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  ...
}
```

### 공통 호출 방법

1. 토스트메세지 - AlertToast

```
  const setOpen = useSetRecoilState(alertToastOpenState);
  const setMsg = useSetRecoilState(alertToastState);

  useEffect(() => {
    setMsg('토스트 메세지입니다.');
    setOpen(true);
  }, []);
```

2. 팝업 메세지 - ALertDialog

```
  const setOpenAlert = useSetRecoilState(alertDialogOpenState);
  const setAlertDialog = useSetRecoilState(alertDialogState);

  const _onCheckJoinTeam = async (data) => {
    const { joinCode } = data;
    let resMap = await getTeamByJoinCode(joinCode);
    const { teamNm, teamIdx, teamDesc } = resMap;

    setAlertDialog({
      title: '팀 참가 확인',
      content: `[${teamNm}]에 참가하시겠습니까?`,
      succFn: () => {
        joinTeamMutation.mutate(resMap);
      },
    });
    setOpenAlert(true);
  };

```

3. 레이아웃 - 헤더 - Header.jsx

```
const setHeaderState = useSetRecoilState(headerState);
const handleHeader = (data) => {
  const { memberType, teamNm } = data;
  setHeaderState({
    left: {
      header: (
        <Button onClick={() => navi('/team/info')}>
          {teamNm}
          <ChevronRightIcon />
        </Button>
      ),
      subHeader : '서브제목'
    },
    right: (
      <IconButton>
        <EditIcon />
      </IconButton>
    ),
  });
};
  };

```
