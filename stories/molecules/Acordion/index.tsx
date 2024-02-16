'use-client'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IconArrowBottom, IconArrowTop } from '../../../assets/icons';
import {
  ContainerBurger,
  MenuLeft,
  OptionMenu,
  Row,
  Span
} from './Styled';

interface OptionsProps {
  active?: boolean;
  children?: React.ReactNode;
  handleClick: (index: number) => void;
  icon?: React.ReactNode;
  index: number;
  label: string;
  path: string;
}

export const Options: React.FC<OptionsProps> = ({
  active = false,
  children,
  handleClick,
  icon: IconComponent = <></>,
  index,
  label,
  path
}) => {
  const refButton = useRef<HTMLDivElement>(null);
  const refMenu = useRef<HTMLDivElement>(null);
  const location = useRouter();

  const [menuState, setMenuState] = useState<{
    height: number;
    heightMenu: number;
    status: string;
  }>({
    height: 0,
    heightMenu: 0,
    status: 'close'
  });

  useEffect(() => {
    if (!refButton.current || !refMenu.current) return;
    
    const initialHeight = refButton.current.clientHeight - refMenu.current.clientHeight;
    const initialHeightMenu = refMenu.current.clientHeight;
  
    setMenuState(prevState => ({
      ...prevState,
      height: initialHeight,
      heightMenu: initialHeightMenu
    }));
  
    if (location && location.pathname.includes(path)) {
      handleClick(index);
    }
  }, []);
  

  useEffect(() => {
    const updatedHeight = active
      ? menuState.height + menuState.heightMenu
      : refButton.current?.clientHeight - refMenu.current?.clientHeight;
    const updatedStatus = active ? 'open' : 'close';

    setMenuState(prevState => ({
      ...prevState,
      height: updatedHeight,
      status: updatedStatus
    }));
  }, [active]);
  return (
    <MenuLeft
      active={active}
      height={menuState?.height}
      id={`menu-id__${index}`}
      index={index}
      onClick={() => handleClick(index)}
      ref={refButton}
    >
      <Row active={active}>
        <div style={{ display: 'flex' }}>
          <Span active={active}>{label}</Span>
        </div>
        <ContainerBurger>
          <button
            className='BurgerMenu__container'
            onClick={() => handleClick(index)}
          >
            {active ? <IconArrowTop color='#252525' size={15} /> : <IconArrowBottom color='#25252569' size={15} />}
          </button>
        </ContainerBurger>
      </Row>
      <OptionMenu active={active} ref={refMenu}>
        {children}
      </OptionMenu>
    </MenuLeft>
  );
};
