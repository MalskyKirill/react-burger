import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './nav-link-icon.module.css';


type TNavLinkIcon = {
  icon: React.ElementType,
  children: string,
  isActive: boolean,
  path: string,
}

const NavLinkIcon = ({icon: Icon, children, path, isActive}: TNavLinkIcon) => {
  return(
    <NavLink to={path} className={`${styles['link-element']} pl-5 pr-5 pt-4 pb-4`}>
      <Icon type={isActive ? 'primary' : 'secondary'}/>
      <p className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>{children}</p>
    </NavLink>
  );
}

export default NavLinkIcon;
