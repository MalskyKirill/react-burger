import stiles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';

function App() {
  return (
    <div className={stiles.app}>
      <AppHeader />
      <MainPage/>
    </div>
  );

}

export default App;
