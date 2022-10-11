import React from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './Logo.styles.scss';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="logo__wrapper">
      <div className="logo">
        <div className="logo__square"></div>
        <div className="logo__square"></div>
        <div className="logo__square"></div>
      </div>
    </div>
  )
}
