import { useState } from 'react';
import classNames from 'classnames';
import OrderItems from '../ui/OrderItems/OrderItems';
import NavItem from '../ui/NavItem/NavItem';
import styles from './OrderMenu.module.scss';

const OrderMenu = ({ locationOrderData, carModelOrderData, extraOrderData }) => {
  const [isOpened, setIsMenuOpened] = useState(false);
  const toggleMenu = () => setIsMenuOpened(!isOpened);

  return (
    <div
      className={classNames(styles.orderMenu, {
        [styles.openedMenu]: isOpened,
      })}
    >
      <button className={styles.menuToggler} onClick={toggleMenu} type="button">
        <svg
          className={styles.icon}
          width="26"
          height="26"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="0 26 13 12 26 26" fill="transparent" />
          <polyline points="0 18 13 4 26 18" fill="transparent" />
        </svg>
      </button>

      <section className={styles.content}>
        <h2 className={styles.title}>Ваш заказ:</h2>

        <div className={styles.orderInfoTab}>
          <NavItem to="/order/location" text="Местоположеие" />
          <OrderItems orderData={locationOrderData} />
        </div>
        <div className={styles.orderInfoTab}>
          <NavItem to="/order/car" text="Модель" />
          <OrderItems orderData={carModelOrderData} />
        </div>
        <div className={styles.orderInfoTab}>
          <NavItem to="/order/extra" text="Дополнительно" />
          <OrderItems orderData={extraOrderData} />
        </div>
        <div className={styles.orderInfoTab}>
          <NavItem to="/order/total" text="Итого" />
        </div>
        <div className={styles.price}>
          <span className={styles.title}>Цена: </span>
          <span className={styles.value}>16 000 ₽</span>
        </div>
      </section>

      <button className={styles.menuToggler} onClick={toggleMenu} type="button">
        <svg
          className={styles.icon}
          width="26"
          height="26"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="0 0 13 14 26 0" fill="transparent" />
          <polyline points="0 8 13 22 26 8" fill="transparent" />
        </svg>
      </button>
    </div>
  );
};

export default OrderMenu;