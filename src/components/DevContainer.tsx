import { ReactElement } from 'react';
import { isDevMode } from '../util/cm_util';

interface PropInterface {
  children: ReactElement;
}
export default function DevContainer({ children }: PropInterface): ReactElement {
  return isDevMode ? children : <div />;
}
