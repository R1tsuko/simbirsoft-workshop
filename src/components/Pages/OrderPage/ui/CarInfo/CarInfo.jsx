import { format } from 'date-fns';
import styles from './CarInfo.module.scss';

const CarInfo = ({ name, number, tank, img, accessDate }) => {
  return (
    <article className={styles.carInfoContainer}>
      <div className={styles.text}>
        <div className={styles.name}>{name}</div>
        <div className={styles.number}>{number}</div>
        <div className={styles.tank}>
          <span className={styles.title}>Топливо </span>
          <span>{tank}%</span>
        </div>
        <div className={styles.access}>
          <span className={styles.title}>Доступна с </span>
          <span className={styles.subject}>
            {accessDate && format(accessDate, 'dd.MM.yyyy HH:mm')}
          </span>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={img} alt="car" />
      </div>
    </article>
  );
};

export default CarInfo;
