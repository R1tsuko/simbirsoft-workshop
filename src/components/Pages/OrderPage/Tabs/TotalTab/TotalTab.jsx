import { useEffect, useState } from 'react';
import axios from 'axios';
import CarInfo from '../../ui/CarInfo/CarInfo';
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
      <div className={styles.carInfoWrapper}>
        <CarInfo name={car?.name} number={car?.number} tank={car?.tank} img={car?.thumbnail.path} />
      </div>
    </div>
  );
};

export default TotalTab;
