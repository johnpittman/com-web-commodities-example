import React, { Suspense } from 'react';
import LoadingZone from '@client/components/shared/LoadingZone';

export default function (component: any) {
  const Component = React.lazy(() => component);

  return function LoadableComponent() {
    return (
      <Suspense fallback={<LoadingZone />}>
        <Component />
      </Suspense>
    );
  };
}
