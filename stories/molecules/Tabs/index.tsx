import React, { useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PColor } from '../../../assets/colors';

interface TabPanelProps {
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return (
    <TabContent role='tabpanel' tabIndex={0}>
      {children}
    </TabContent>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired
};

interface TabsProps {
  children: ReactNode;
  tabBreak: string;
  width: string | any;
}

export const Tabs: React.FC<TabsProps> = ({ children, tabBreak, width }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const selectTab = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <TabsWrapper>
      <TabList breakPoint={tabBreak} columnWidth={width} role='tablist'>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const { label } = child.props;
            return (
              <TabButton
                aria-selected={selectedTab === index ? 'true' : 'false'}
                onClick={() => selectTab(index)}
                role='tab'
                selected={selectedTab === index}
              >
                {label}
              </TabButton>
            );
          }
          return null;
        })}
      </TabList>
  
      <Content>
        {React.Children.map(children, (comp, index) => {
          return selectedTab === index ? comp : null;
        })}
      </Content>
    </TabsWrapper>
  );
  
};

const TabsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TabButton = styled.button<{ selected: boolean }>`
  height: 50px;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: default;
  background: transparent;

  transition: border-color 0.2s ease-in;
  border: none;
  border-bottom: 4px solid ${(props) => (props.selected ? PColor : '#eee')};
  &:hover,
  &:focus,
  &:active {
    border-bottom: 4px solid ${(props) => (props.selected ? PColor : '#c0bebe')};
  }
`;

const TabList = styled.div<{ columnWidth: string | any, breakPoint: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ columnWidth }) =>
    columnWidth
      ? columnWidth.map((x: string) => {
          return `${x} `;
        })
      : '1fr'};
  height: auto;
  align-items: center;
  margin: 0 auto;
  outline: none;
  @media (max-width: ${(props) => props.breakPoint}) {
    flex-direction: column;
    & > div,
    & > div > button {
      width: 100%;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding-top: 16px;
`;

const TabContent = styled.div`
  flex: 1;
  width: 100%;
`;
