import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import stiles from './app-header.module.css'
import NavLinkIcon from './nav-link-icon/nav-link-icon';

const AppHeader = () => {
  return(
    <header className={`${stiles.header} pt-4 pb-4`}>
      <nav className={stiles['navigation-panel']}>
        <ul className={stiles['navigation-menu']}>
          <li><NavLinkIcon icon={BurgerIcon} isActive={true}>Конструктор</NavLinkIcon></li>
          <li><NavLinkIcon icon={ListIcon} isActive={false}>Лента заказов</NavLinkIcon></li>
        </ul>
        <div className={stiles['navigation-logo']}>
          <Logo />
        </div>
        <div className={stiles['navigation-profile']}>
          <NavLinkIcon icon={ProfileIcon} isActive={false}>Личный кабинет</NavLinkIcon>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
