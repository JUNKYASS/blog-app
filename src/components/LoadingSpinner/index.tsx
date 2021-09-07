import React from 'react';
import './style.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
};

export {
  LoadingSpinner
};
