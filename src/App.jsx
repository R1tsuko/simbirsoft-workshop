import { useState } from 'react';
import MainPage from './components/Pages/MainPages';
import Sidebar from './components/Sidebar/Sidebar';
import Menu from './components/Menu/Menu';
import styles from './App.module.scss';

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className={styles.appWrapper}>
      <Sidebar openMenu={() => setIsMenuOpened(true)} />
      <MainPage openMenu={() => setIsMenuOpened(true)} />
      <Menu closeMenu={() => setIsMenuOpened(false)} isOpened={isMenuOpened} />
    </div>
  );
};

export default App;
