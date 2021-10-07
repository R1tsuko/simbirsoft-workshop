import styles from './OrderItems.module.scss';

const OrderItems = ({ orderData }) => {
  return orderData.map((el) => (
    <div className={styles.itemContainer} key={el.name}>
      <div className={styles.name}>{el.name}</div>
      <div className={styles.dots} />
      <div className={styles.text}>{el.text}</div>
    </div>
  ));
};

export default OrderItems;
