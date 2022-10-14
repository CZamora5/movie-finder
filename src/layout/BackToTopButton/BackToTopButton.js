import React, { useRef, useEffect, useState } from 'react';

// Utils
import { convertRemToPixels } from '../../utils/convertRemToPixels.js';

// Styles
import './BackToTopButton.styles.scss';

export default function BackToTopButton() {
  const button = useRef();
  const [
    isVisible,
    setIsVisible
  ] = useState(window.scrollY >= Math.max(convertRemToPixels(24), window.innerHeight * 0.8));

  useEffect(() => {
    function handleScroll() {
      const visible = window.scrollY >= Math.max(convertRemToPixels(24), window.innerHeight * 0.8);
      setIsVisible(visible);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {
        isVisible &&
        <button
          ref={button}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="back-to-top__button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="back-to-top__icon"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </button>
      }
    </>
  );
}
