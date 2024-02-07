import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.css';
import NavLinkIcon from './nav-link-icon/nav-link-icon';
import { AppRoute } from '../../utils/consts';

const Layout = (): JSX.Element => {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={`${styles.header} pt-4 pb-4`}>
        <div className={styles['header-wrap']}>
          <nav className={styles['navigation-panel']}>
            <ul className={styles['navigation-menu']}>
              <li>
                <NavLinkIcon icon={BurgerIcon}  isActive={location.pathname === AppRoute.main} path={AppRoute.main}>
                  Конструктор
                </NavLinkIcon>
              </li>
              <li>
                <NavLinkIcon icon={ListIcon} isActive={location.pathname === AppRoute.feed} path={AppRoute.feed} >
                  Лента заказов
                </NavLinkIcon>
              </li>
            </ul>
            <Link to={AppRoute.main} className={styles['navigation-logo']}>
              <Logo />
            </Link>
            <div className={styles['navigation-profile']}>
              <NavLinkIcon icon={ProfileIcon} isActive={location.pathname.slice(0, 8) === AppRoute.profile} path={AppRoute.profile}>
                Личный кабинет
              </NavLinkIcon>
            </div>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
