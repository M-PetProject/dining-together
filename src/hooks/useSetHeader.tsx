import { useSetRecoilState } from 'recoil';
import { headerState, HeaderStateInterface } from '../atoms/atom';

export default function useSetHeader() {
  const setHeaderState = useSetRecoilState(headerState);

  return (content: HeaderStateInterface | null) => setHeaderState(content);
}
