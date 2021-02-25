import React from 'react';
import Icon from '@client/assets/icons/feather/heart.svgr.svg';

import './style.css';

export interface FavoriteButtonProps {
  className?: string;
  selected?: boolean;
  onClick: () => void;
}

function FavoriteButton(props: FavoriteButtonProps) {
  const baseClassName = 'FavoriteButton';
  const classNames = {
    root: baseClassName,
    selected: `${baseClassName}--selected`
  };

  if (props.className) {
    classNames.root += ` ${props.className}`;
  }

  if (props.selected) {
    classNames.root += ` ${classNames.selected}`;
  }

  // @ts-ignore
  return <Icon className={classNames.root} onClick={props.onClick} />;
}

export default FavoriteButton;
