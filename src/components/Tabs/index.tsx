import React, { useCallback, useState } from 'react';
import { TabProps, TabsProps, TabTitleProps } from '../../types';
import './style.scss';

const Tab: React.FC<TabProps> = ({ children }) => { // Основной компонент, сам таб
  return <div className="tabs-body">{children}</div>;
};

const TabTitle: React.FC<TabTitleProps> = ({ title, setSelectedTab, index, selectedTab, count }) => { // Заголовок таба
  const btnClickHandler = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li className={`item ${index === selectedTab ? 'active' : ''}`}
      data-index={index}
      data-selindex={selectedTab}
      onClick={btnClickHandler}
    >
      <div className="title">{title}</div>
      {typeof count === 'number' && <span className="badge">{count}</span>}
    </li>
  );
};

const Tabs: React.FC<TabsProps> = ({ children }) => { // Контейнер табов
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      <ul className="tabs-heading">
        {
          children.map((item, index) => (
            <TabTitle
              key={index}
              title={item.props.title}
              count={item.props.count}
              index={index}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))
        }
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export {
  Tabs,
  Tab,
  TabTitle
};
