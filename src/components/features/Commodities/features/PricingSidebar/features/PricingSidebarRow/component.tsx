import React, { useMemo } from 'react';
import moment from 'moment';
import FavoriteButton from '@client/components/shared/FavoriteButton';
import DirectionUpIcon from '@client/assets/icons/feather/arrow-up.svgr.svg';
import DirectionDownIcon from '@client/assets/icons/feather/arrow-down.svgr.svg';
import DirectionIdleIcon from '@client/assets/icons/feather/minus.svgr.svg';

import './style.css';

export interface PricingSidebarRowProps {
  id: number | string;
  favorite?: boolean;
  price: number;
  name: string;
  updatedAt: string;
  onAddFavorite: (id: number | string) => void;
  onRemoveFavorite: (id: number | string) => void;
}

function PricingSidebarRow(props: PricingSidebarRowProps) {
  const baseClassName = 'PricingSidebarRow';
  const classNames = {
    root: baseClassName,
    title: `${baseClassName}__title`,
    favIcon: `${baseClassName}__fav-icon`,
    name: `${baseClassName}__name`,
    price: `${baseClassName}__price`,
    directionIcon: `${baseClassName}__direction-icon`,
    directionIconIdle: `${baseClassName}__direction-icon--idle`,
    directionIconUp: `${baseClassName}__direction-icon--up`,
    directionIconDown: `${baseClassName}__direction-icon--down`
  };

  let priceDirectionComponent = null;

  let withinTimeRange = useMemo(() => {
    let now = moment();
    let updatedTime = moment(props.updatedAt);
    let inRange = now.diff(updatedTime, 'h');

    return inRange < 24;
  }, [props.updatedAt]);

  // NOTE: Discussion
  // Could be separate component and added to domain styleguide.
  // Would have discussion and run-through of design roadmap for flushed out reusable components.
  if (!withinTimeRange) {
    priceDirectionComponent = (
      <DirectionIdleIcon
        // @ts-ignore
        className={`${classNames.directionIcon} ${classNames.directionIconIdle}`}
      />
    );
  } else if (props.price < 0) {
    priceDirectionComponent = (
      <DirectionDownIcon
        // @ts-ignore
        className={`${classNames.directionIcon} ${classNames.directionIconDown}`}
      />
    );
  } else if (props.price >= 0) {
    priceDirectionComponent = (
      <DirectionUpIcon
        // @ts-ignore
        className={`${classNames.directionIcon} ${classNames.directionIconUp}`}
      />
    );
  }

  let handleFavoriteClick = () => {
    if (props.favorite) {
      props.onRemoveFavorite(props.id);
    } else {
      props.onAddFavorite(props.id);
    }
  };

  return (
    <div className={classNames.root}>
      <FavoriteButton
        className={classNames.favIcon}
        selected={props.favorite}
        onClick={handleFavoriteClick}
      />
      <span className={classNames.name}>{props.name}</span>
      <span className={classNames.price}>{props.price.toFixed(2)}</span>
      {priceDirectionComponent}
    </div>
  );
}

export default PricingSidebarRow;
