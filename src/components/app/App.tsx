import stiles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className={stiles.app}>
      <AppHeader />

    </div>
  );

}

export default App;
