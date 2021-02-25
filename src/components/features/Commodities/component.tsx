import React from 'react';
import PricingSidebar from './features/PricingSidebar';

import './style.css';

export interface CommoditiesProps {}

function Commodities(props: CommoditiesProps) {
  const baseClassName = 'Commodities';
  const classNames = {
    root: baseClassName
  };

  return (
    <div className={classNames.root}>
      <PricingSidebar />
    </div>
  );
}

export default Commodities;
