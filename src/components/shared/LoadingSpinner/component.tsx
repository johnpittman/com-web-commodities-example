import * as React from 'react';

import './style.css';

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner(props: LoadingSpinnerProps) {
  let baseClassName = 'LoadingSpinner';
  let className = baseClassName;

  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <svg className={className} viewBox="25 25 50 50">
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default LoadingSpinner;
