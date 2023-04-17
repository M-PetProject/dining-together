import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { sampleState } from '../../atoms/sampleAtom';
import { BackButton } from '../../components/Buttons';
import Gap from '../../components/Gap';

const SecondPage = () => {
  const [count, setCount] = useState(0);

  const [number, setNumber] = useRecoilState(sampleState);
  // 아래 처럼 readonly, setonly로 분리할 수 있습니다.
  const readOnlyNumber = useRecoilValue(sampleState);
  const setOnlyNumber = useSetRecoilState(sampleState);

  const _onClickStateUp = () => {
    setCount(count + 1);
  };
  const _onClickRecoilUp = () => {
    setNumber(number + 1);
  };
  return (
    <Container>
      <BackButton />
      <Gap height={20} />
      <h1>State VS Recoil</h1>
      <hr />
      {count}
      <br />
      <button onClick={_onClickStateUp}>state UP</button>
      <button onClick={_onClickRecoilUp}>recoil UP</button>
      <hr />
      <StateCard count={count} />
      <hr />
      <RecoilCard />
    </Container>
  );
};

export default SecondPage;

const StateCard = (props) => {
  const { count } = props;
  return <StateCard1 count={count} />;
};
const StateCard1 = (props) => {
  const { count } = props;
  return <StateCard2 count={count} />;
};
const StateCard2 = (props) => {
  const { count } = props;
  return <StateCard3 count={count} />;
};
const StateCard3 = (props) => {
  const { count } = props;
  return <StateCard4 count={count} />;
};
const StateCard4 = (props) => {
  const { count } = props;
  return <Container>이것은 state로 만든 유형입니다. : {count}</Container>;
};

const RecoilCard = () => {
  return <RecoilCard1 />;
};
const RecoilCard1 = (props) => {
  return <RecoilCard2 />;
};
const RecoilCard2 = (props) => {
  return <RecoilCard3 />;
};
const RecoilCard3 = (props) => {
  return <RecoilCard4 />;
};
const RecoilCard4 = (props) => {
  const [number, setNumber] = useRecoilState(sampleState);
  const number2 = useRecoilValue(sampleState);
  return (
    <Container>
      <p>이것은 Recoil로 만든 유형입니다. : {number}</p>
      <p>이것은 Recoil로 만든 유형입니다. : {number2}</p>
    </Container>
  );
};
