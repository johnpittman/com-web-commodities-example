import React, { Suspense } from 'react';

export default function (component: any) {
  const Component = React.lazy(() => component);

  return function LoadableComponent() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    );
  };
}
