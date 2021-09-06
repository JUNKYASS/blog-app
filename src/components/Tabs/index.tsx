import React, { useCallback, useState } from 'react';
import './style.scss';

type TabProps = {
  children: React.ReactNode;
  title: string;
  count: number;
}

type TabTitleProps = {
  title: string;
  index: number;
  count: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

type TabsProps = {
  children: React.ReactElement[];
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tabs-body">{children}</div>;
};

const TabTitle: React.FC<TabTitleProps> = ({ title, setSelectedTab, index, selectedTab, count }) => {
  const btnClickHandler = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li className={`item ${index === selectedTab ? 'active': ''}`} data-index={index} data-selindex={selectedTab} onClick={btnClickHandler}>
      <div className="title">{title}</div>
      <span className="badge">{count}</span>
    </li>
  );
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      <ul className="tabs-heading">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            count={item.props.count}
            index={index}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
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
