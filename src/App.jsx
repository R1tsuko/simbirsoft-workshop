import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/Pages/MainPage/MainPage';
import Sidebar from './components/Sidebar/Sidebar';
import Menu from './components/Menu/Menu';
import styles from './App.module.scss';
import OrderPage from './components/Pages/OrderPage/OrderPage';

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className={styles.appWrapper}>
      <Sidebar openMenu={() => setIsMenuOpened(true)} />
      <Switch>
        <Route exact path="/">
          <MainPage openMenu={() => setIsMenuOpened(true)} />
        </Route>
        <Route path="/order">
          <OrderPage openMenu={() => setIsMenuOpened(true)} />
        </Route>
      </Switch>
      <Menu closeMenu={() => setIsMenuOpened(false)} isOpened={isMenuOpened} />
    </div>
  );
};

export default App;
