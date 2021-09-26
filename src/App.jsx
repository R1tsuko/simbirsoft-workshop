import { useState } from 'react';
import s from './App.module.scss';
import Menu from './components/Menu/Menu';
import MainPage from './components/Pages/MainPages';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className={s.appWrapper}>
      <Sidebar openMenu={() => setIsMenuOpened(true)} />
      <MainPage openMenu={() => setIsMenuOpened(true)} />
      <Menu closeMenu={() => setIsMenuOpened(false)} isOpened={isMenuOpened} />
    </div>
  );
};

export default App;
