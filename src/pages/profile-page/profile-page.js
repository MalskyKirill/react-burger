import { NavLink, Outlet } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';
import styles from './profile-page.module.css';

const ProfilePage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.account}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.linkwrap}>
              <NavLink to='' end className={styles.link}>
                {({ isActive }) => (
                  <p
                    className={`text text_type_main-medium ${
                      isActive ? 'text_color_primary' : 'text_color_inactive'
                    }`}
                  >
                    Профиль
                  </p>
                )}
              </NavLink>
            </li>
            <li className={styles.linkwrap}>
              <NavLink
                to={AppRoute.orders}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
              >
                {({ isActive }) => (
                  <p
                    className={`text text_type_main-medium ${
                      isActive ? 'text_color_primary' : 'text_color_inactive'
                    }`}
                  >
                    История заказов
                  </p>
                )}
              </NavLink>
            </li>
            <li className={styles.linkwrap}>
              <NavLink
                to={AppRoute.logout}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
              >
                {({ isActive }) => (
                  <p
                    className={`text text_type_main-medium ${
                      isActive ? 'text_color_primary' : 'text_color_inactive'
                    }`}
                  >
                    Выход
                  </p>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        <Outlet />
      </section>
    </main>
  );
};

export default ProfilePage;
