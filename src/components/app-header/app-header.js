import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavLinkIcon from './nav-link-icon/nav-link-icon';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles['header-wrap']}>
        <nav className={styles['navigation-panel']}>
          <ul className={styles['navigation-menu']}>
            <li>
              <NavLinkIcon icon={BurgerIcon} isActive={true}>
                Конструктор
              </NavLinkIcon>
            </li>
            <li>
              <NavLinkIcon icon={ListIcon} isActive={false}>
                Лента заказов
              </NavLinkIcon>
            </li>
          </ul>
          <div className={styles['navigation-logo']}>
            <Logo />
          </div>
          <div className={styles['navigation-profile']}>
            <NavLinkIcon icon={ProfileIcon} isActive={false}>
              Личный кабинет
            </NavLinkIcon>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
