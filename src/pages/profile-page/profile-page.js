import { NavLink, Outlet } from 'react-router-dom';
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
                to='/profile/orders'
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
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
              >
                Выход
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
