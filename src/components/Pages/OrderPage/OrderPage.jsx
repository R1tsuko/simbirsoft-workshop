import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../../Header/Header';
import Button from '../../commonUi/Button/Button';
import OrderMenu from './OrderMenu/OrderMenu';
import NavItem from './ui/NavItem/NavItem';
import OrderItems from './ui/OrderItems/OrderItems';
import LocationTab from './Tabs/LocationTab/LocationTab';
import CarTab from './Tabs/CarTab/CarTab';
import ExtraTab from './Tabs/ExtraTab/ExtraTab';
import TotalTab from './Tabs/TotalTab/TotalTab';
import OrderView from './OrderView/OrderView';
import ConfirmPopUp from './ConfirmPopUp/ConfirmPopUp';
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
  const [IsConfirmPopupActive, setIsConfirmPopupActive] = useState(false);

  const onConfirmPopupClick = () => setIsConfirmPopupActive(false);
  const onTotalTabSubmit = () => setIsConfirmPopupActive(true);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerWrapper}>
        <Header openMenu={openMenu} />
      </div>
      <div className={styles.navContainer}>
        <Switch>
          <Route path="/order/view">
            <div className={styles.topPageRow}>
              <div className={classNames(styles.row, styles.orderViewRow)}>Заказ номер</div>{' '}
              <div className={classNames(styles.row, styles.orderViewRow)}>RU58491823</div>
            </div>
          </Route>

          <Route path="/order">
            <nav className={styles.topPageRow}>
              <div className={styles.row}>
                <span className={styles.navItemWrapper}>
                  <NavItem className={styles.navItem} to="/order/location" text="Местоположение" />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
                <span className={styles.navItemWrapper}>
                  <NavItem className={styles.navItem} to="/order/car" text="Модель" />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
              </div>
              <div className={styles.row}>
                <span className={styles.navItemWrapper}>
                  <NavItem className={styles.navItem} to="/order/extra" text="Дополнительно" />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
                <span className={styles.navItemWrapper}>
                  <NavItem className={styles.navItem} to="/order/total" text="Итого" />
                </span>
              </div>
            </nav>
          </Route>
        </Switch>
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
              <Route path="/order/view">
                <OrderView />
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
                <Button
                  text="Выбрать модель"
                  linkTo="/order/car"
                  width="287px"
                  expandOnSmallScreen
                />
              </Route>

              <Route path="/order/car">
                <Button
                  text="Дополнительно"
                  linkTo="/order/extra"
                  width="287px"
                  expandOnSmallScreen
                />
              </Route>

              <Route path="/order/extra">
                <Button text="Итого" linkTo="/order/total" width="287px" expandOnSmallScreen />
              </Route>

              <Route path="/order/total">
                <Button
                  text="Заказать"
                  onClick={onTotalTabSubmit}
                  width="287px"
                  expandOnSmallScreen
                />
              </Route>

              <Route path="/order/view">
                <Button text="Отменить" linkTo="/" width="287px" canceling expandOnSmallScreen />
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
      {IsConfirmPopupActive ? (
        <ConfirmPopUp onCancelClick={onConfirmPopupClick} onConfirmClick={onConfirmPopupClick} />
      ) : null}
    </div>
  );
};

export default OrderPage;
