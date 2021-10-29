import { useState } from 'react';
import classNames from 'classnames';
import OrderItems from '../ui/OrderItems/OrderItems';
import styles from './OrderMenu.module.scss';

const OrderMenu = ({ orderData }) => {
  const [isOpened, setIsMenuOpened] = useState(false);
  const toggleMenu = () => setIsMenuOpened(!isOpened);

  return (
    <div
      className={classNames(styles.orderMenu, {
        [styles.openedMenu]: isOpened,
      })}
    >
      <button className={styles.menuToggler} onClick={toggleMenu} type="button">
        {isOpened ? (
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
        ) : (
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
        )}
      </button>

      <section className={styles.content}>
        <h2 className={styles.title}>Ваш заказ:</h2>

        <div className={styles.orderInfoTab}>
          <OrderItems orderData={orderData.items} />
        </div>

        {orderData.price && (
          <div className={styles.price}>
            <span className={styles.title}>Цена: </span>
            <span className={styles.value}>{orderData.price} ₽</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderMenu;
