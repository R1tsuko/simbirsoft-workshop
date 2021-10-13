import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TotalTab.module.scss';

const TotalTab = () => {
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get('https://api-factory.simbirsoft1.com/api/db/car/600f4935ad015e0bb6997d30', {
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: 'Bearer e3363ae80588feb12604c114abc2e159789ad6ab',
          user_id: '5fdf6a87935d4e0be16a3e31',
        },
      })
      .then((response) => {
        setCar(response.data.data);
      });
  }, []);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.carInfoContainer}>
        <div className={styles.text}>
          <div className={styles.name}>{car?.name}</div>
          <div className={styles.number}>{car?.number}</div>
          <div className={styles.tank}>
            <span className={styles.title}>Топливо </span>
            <span>{car?.tank}%</span>
          </div>
          <div className={styles.access}>
            <span className={styles.title}>Доступна с </span>
            <span className={styles.subject}>12.06.2019 12:00</span>
          </div>
        </div>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={car?.thumbnail.path} alt="car" />
        </div>
      </div>
    </div>
  );
};

export default TotalTab;
