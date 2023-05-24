import { ReactElement } from 'react';

export default function DefaultFallback({ error, resetErrorBoundary }): ReactElement {
  return <div>에러 발생 FALLBACK</div>;
}
