import classNames from 'classnames';
import styles from './CarCard.module.scss';

const CarCard = ({ name, price, img, onClick, isSelected }) => {
  return (
    <div
      className={classNames(styles.cardContainer, {
        [styles.selected]: isSelected,
      })}
      tabIndex="0"
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className={styles.title}>{name}</div>

      <div className={styles.price}>{price}</div>

      <div className={styles.carImgWrapper}>
        <img className={styles.img} src={img} alt="car" />
      </div>
    </div>
  );
};

export default CarCard;
