import React from 'react';

// Hooks
import { usePageApiContext } from '../../contexts/PageContext.js';

// Styles
import './PaginationButton.styles.scss';

export default function PaginationButton(props) {
  const api = usePageApiContext();
  let classname = 'pagination-button';

  if (props.active) {
    classname += ' active';
    return (
      <div className={classname}>
        <span className="pagination-button__number">{props.pageNumber}</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => api.setPage(props.pageNumber)}
      className={classname}
    >
      <span  className="pagination-button__number">{props.pageNumber}</span>
    </div>
  );
}
