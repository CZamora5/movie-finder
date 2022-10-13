import React from 'react';

// Styles
import './CardSkeleton.styles.scss';

export default function CardSkeleton(props) {
  const style = {
    '--width': props.width || '5%',
    '--rounded': props.rounded || '0'
  };

  return (
    <div className="card-skeleton" style={style}></div>
  );
}
