import React from 'react';
import { ModalProps } from '../../types';
import './style.scss';

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false, 0)}>
      <div className="content" onClick={(e) => e.stopPropagation()} >
        {children}
      </div>
      <div className="close" onClick={() => setActive(false, 0)}></div>
    </div>
  );
};

export {
  Modal
};
