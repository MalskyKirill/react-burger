import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';


function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage/>
    </div>
  );

}

export default App;
