import React from 'react';

// Hooks
import { usePageStateContext } from '../../contexts/PageContext.js';

// Components
import PaginationButton from '../PaginationButton/PaginationButton.js';

// Styles
import './Pagination.styles.scss';

export default function Pagination() {
  const DEFAULT_NUM_BUTTONS = 4;
  const { page, totalPages } = usePageStateContext();

  // Setting  up the number of buttons
  const numberOfButtons = Math.min(totalPages, DEFAULT_NUM_BUTTONS);

  const buttonElements = [];
  let firstButton;

  // Checking that at least there are '(numberOfButtons - 1)  / 2' pages
  // left to the right so that our  current page is at the middle
  if (totalPages - page >= Math.ceil((numberOfButtons - 1) / 2)) {
    // If the remaining number of buttons is greater than the pages before our current page,
    // we simply start from the page number 1
    firstButton = Math.max(1, page - Math.floor((numberOfButtons - 1) / 2));
  } else {
    // In  this case we take pages from  the end since our current page is closer than '(numberOfButtons - 1)  / 2' pages
    firstButton = totalPages - numberOfButtons + 1;
  }

  for (let i = firstButton; i < firstButton + numberOfButtons; i++) {
    const button = <PaginationButton pageNumber={i} active={i === page} key={i} />;
    buttonElements.push(button);
  }

  return (
    <div className="pagination">
      {buttonElements}
    </div>
  );
}
