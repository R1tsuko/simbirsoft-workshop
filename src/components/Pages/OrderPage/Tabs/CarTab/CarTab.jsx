import { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../../ui/CarCard/CarCard';
import RadioButton from '../../ui/RadioButton/RadioButton';
import styles from './CarTab.module.scss';

const carClasses = [
  { id: '0', text: 'Все модели' },
  { id: '1', text: 'Эконом' },
  { id: '2', text: 'Премиум' },
];

const allCarsClassId = carClasses[0].id;

const CarTab = () => {
  const [carClassId, setCarClassId] = useState(allCarsClassId);
  const [carId, setCarId] = useState();
  const [cars, setCars] = useState(null);

  const onRadioClick = (newCarClassId) => () => setCarClassId(newCarClassId);
  const onCarCardClick = (newCarId) => () => setCarId(newCarId);

  useEffect(() => {
    axios
      .get('https://api-factory.simbirsoft1.com/api/db/car', {
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: 'Bearer e3363ae80588feb12604c114abc2e159789ad6ab',
          user_id: '5fdf6a87935d4e0be16a3e31',
        },
      })
      .then((response) => {
        setCars(response.data.data);
      });
  }, []);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.radioGroupContainer}>
        {carClasses.map((el) => (
          <div className={styles.radioWrapper} key={el.id}>
            <RadioButton
              labelText={el.text}
              onChange={onRadioClick(el.id)}
              checked={carClassId === el.id}
              name="carClass"
            />
          </div>
        ))}
      </div>

      <div className={styles.carListContainer}>
        {cars?.map((el) => (
          <div className={styles.cardWrapper} key={el.id}>
            <CarCard
              carName={el.name}
              price={`${el.priceMin} - ${el.priceMax} ₽`}
              img={el.thumbnail.path}
              onClick={onCarCardClick(el.id)}
              isSelected={carId === el.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarTab;
