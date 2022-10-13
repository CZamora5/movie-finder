import React from 'react';

// Styles
import './Subheading.styles.scss';

export default function Subheading(props) {
  return (
    <h2 className="subheading">{props.text}</h2>
  );
}
