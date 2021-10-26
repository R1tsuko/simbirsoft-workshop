import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  selectCompletedSteps,
  selectIsLoading,
  selectOrderData,
  getOrderStatusIds,
  makeOrder,
  selectCurrentOrderId,
  selectIsOrderCompleted,
  setIsOrderCompleted,
} from '../../../store/slices/orderSlice';
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
import Preloader from './ui/Preloader/Preloader';
import { prepareOrderDataForView } from '../../../utils/helpers';
import styles from './OrderPage.module.scss';
import navArrow from '../../../assets/icons/NavArrow.svg';

const OrderPage = ({ openMenu }) => {
  const completedSteps = useSelector(selectCompletedSteps);
  const orderData = useSelector(selectOrderData);
  const isLoading = useSelector(selectIsLoading);
  const currentOrderId = useSelector(selectCurrentOrderId);
  const isOrderCompleted = useSelector(selectIsOrderCompleted);
  const orderDataForView = prepareOrderDataForView(orderData);
  const [IsConfirmPopupActive, setIsConfirmPopupActive] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onConfirmPopupClick = () => {
    setIsConfirmPopupActive(false);
    dispatch(makeOrder(orderData));
  };
  const onCancelPopupClick = () => {
    setIsConfirmPopupActive(false);
  };
  const onTotalTabSubmit = () => setIsConfirmPopupActive(true);

  useEffect(() => {
    dispatch(getOrderStatusIds());
  }, []);
  useEffect(() => {
    if (isOrderCompleted) {
      history.push(`view/${currentOrderId}`);
    }
  }, [isOrderCompleted]);

  return (
    <div className={styles.pageContainer}>
      <Preloader isLoading={isLoading} />
      <div className={styles.headerWrapper}>
        <Header openMenu={openMenu} />
      </div>
      <div className={styles.navContainer}>
        <Switch>
          <Route path="/order/view">
            <div className={styles.topPageRow}>
              <div className={classNames(styles.row, styles.orderViewRow)}>Заказ номер</div>{' '}
              <div className={classNames(styles.row, styles.orderViewRow)}>{currentOrderId}</div>
            </div>
          </Route>

          <Route path="/order">
            <nav className={styles.topPageRow}>
              <div className={styles.row}>
                <span className={styles.navItemWrapper}>
                  <NavItem
                    className={styles.navItem}
                    to="/order/location"
                    text="Местоположение"
                    accessible
                  />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
                <span className={styles.navItemWrapper}>
                  <NavItem
                    className={styles.navItem}
                    to="/order/car"
                    text="Модель"
                    accessible={completedSteps.location}
                  />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
              </div>
              <div className={styles.row}>
                <span className={styles.navItemWrapper}>
                  <NavItem
                    className={styles.navItem}
                    to="/order/extra"
                    text="Дополнительно"
                    accessible={completedSteps.car}
                  />
                </span>
                <img className={styles.navArrow} src={navArrow} alt="arrow" />
                <span className={styles.navItemWrapper}>
                  <NavItem
                    className={styles.navItem}
                    to="/order/total"
                    text="Итого"
                    accessible={completedSteps.extra}
                  />
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
              <OrderItems orderData={orderDataForView.items} />
            </div>

            {orderDataForView.price ? (
              <div className={styles.price}>
                <span className={styles.title}>Цена: </span>
                <span className={styles.value}>{orderDataForView.price} ₽</span>
              </div>
            ) : null}
          </div>

          <div className={styles.actionWrapper}>
            <Switch>
              <Route path="/order/location">
                <Button
                  text="Выбрать модель"
                  linkTo="/order/car"
                  width="287px"
                  expandOnSmallScreen
                  disabled={!completedSteps.location}
                />
              </Route>

              <Route path="/order/car">
                <Button
                  text="Дополнительно"
                  linkTo="/order/extra"
                  width="287px"
                  expandOnSmallScreen
                  disabled={!completedSteps.car}
                />
              </Route>

              <Route path="/order/extra">
                <Button
                  text="Итого"
                  linkTo="/order/total"
                  width="287px"
                  expandOnSmallScreen
                  disabled={!completedSteps.extra}
                />
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
                <Button
                  text="Отменить"
                  onClick={() => dispatch(setIsOrderCompleted(false))}
                  linkTo="/"
                  width="287px"
                  canceling
                  expandOnSmallScreen
                />
              </Route>
            </Switch>
          </div>
        </section>
      </main>
      <OrderMenu orderData={orderDataForView} />
      {IsConfirmPopupActive ? (
        <ConfirmPopUp onCancelClick={onCancelPopupClick} onConfirmClick={onConfirmPopupClick} />
      ) : null}
    </div>
  );
};

export default OrderPage;
