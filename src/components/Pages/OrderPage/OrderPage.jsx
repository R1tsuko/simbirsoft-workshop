import { Route, Switch } from 'react-router-dom';
import Header from '../../Header/Header';
import Button from '../../commonUi/Button/Button';
import OrderMenu from './OrderMenu/OrderMenu';
import NavItem from './ui/NavItem/NavItem';
import OrderItems from './ui/OrderItems/OrderItems';
import LocationTab from './Tabs/LocationTab/LocationTab';
import CarTab from './Tabs/CarTab/CarTab';
import ExtraTab from './Tabs/ExtraTab/ExtraTab';
import TotalTab from './Tabs/TotalTab/TotalTab';
import styles from './OrderPage.module.scss';
import navArrow from '../../../assets/icons/NavArrow.svg';

const locationOrderData = [{ name: 'Пункт выдачи', text: 'Ульяновск, Нариманова 42' }];
const carModelOrderData = [{ name: 'Модель', text: 'Hyndai, i30 N' }];
const extraOrderData = [
  { name: 'Цвет', text: 'Голубой' },
  { name: 'Длительность аренды', text: '1д 2ч' },
  { name: 'Тариф', text: 'На сутки' },
  { name: 'Полный бак', text: 'да' },
];

const OrderPage = ({ openMenu }) => {
  // eslint-disable-next-line no-console
  console.log('render');
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerWrapper}>
        <Header openMenu={openMenu} />
      </div>

      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <span className={styles.navItemWrapper}>
            <NavItem className={styles.navItem} to="/order/location" text="Местоположеие" />
          </span>
          <img className={styles.navArrow} src={navArrow} alt="arrow" />
          <span className={styles.navItemWrapper}>
            <NavItem className={styles.navItem} to="/order/car" text="Модель" />
          </span>
          <img className={styles.navArrow} src={navArrow} alt="arrow" />
          <span className={styles.navItemWrapper}>
            <NavItem className={styles.navItem} to="/order/extra" text="Дополнительно" />
          </span>
          <img className={styles.navArrow} src={navArrow} alt="arrow" />
          <span className={styles.navItemWrapper}>
            <NavItem className={styles.navItem} to="/order/total" text="Итого" />
          </span>
        </nav>
      </div>

      <main className={styles.main}>
        <div className={styles.tabWrapper}>
          <div className={styles.tabContentWrapper}>
            <Switch>
              <Route path="/order/location">
                <LocationTab />
              </Route>
              <Route path="/order/car">
                <CarTab />
              </Route>
              <Route path="/order/extra">
                <ExtraTab />
              </Route>
              <Route path="/order/total">
                <TotalTab />
              </Route>
            </Switch>
          </div>
        </div>

        <section className={styles.orderInfo}>
          <div className={styles.content}>
            <h2 className={styles.title}>Ваш заказ:</h2>

            <div className={styles.itemList}>
              <OrderItems orderData={locationOrderData} />
              <OrderItems orderData={carModelOrderData} />
              <OrderItems orderData={extraOrderData} />
            </div>

            <div className={styles.price}>
              <span className={styles.title}>Цена: </span>
              <span className={styles.value}>16 000 ₽</span>
            </div>
          </div>

          <div className={styles.actionWrapper}>
            <Switch>
              <Route path="/order/location">
                <Button text="Выбрать модель" orderPage />
              </Route>

              <Route path="/order/car">
                <Button text="Дополнительно" orderPage />
              </Route>

              <Route path="/order/extra">
                <Button text="Итого" orderPage />
              </Route>

              <Route path="/order/total">
                <Button text="Заказать" orderPage />
              </Route>
            </Switch>
          </div>
        </section>
      </main>

      <OrderMenu
        locationOrderData={locationOrderData}
        carModelOrderData={carModelOrderData}
        extraOrderData={extraOrderData}
      />
    </div>
  );
};

export default OrderPage;
