import { useState } from 'react';
import CarCard from '../../ui/CarCard/CarCard';
import RadioButton from '../../ui/RadioButton/RadioButton';
import styles from './CarTab.module.scss';
import fordMustangImg from '../../../../../assets/images/FordMustang.png';

const carClasses = [
  { id: '0', text: 'Все модели' },
  { id: '1', text: 'Эконом' },
  { id: '2', text: 'Премиум' },
];

const carCardsData = [
  { id: 0, name: 'FordMustang11', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 1, name: 'FordMustang22', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 2, name: 'FordMustang33', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 3, name: 'FordMustang44', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 4, name: 'FordMustang55', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 5, name: 'FordMustang66', price: '10 000 - 32 000 ₽', img: fordMustangImg },
  { id: 6, name: 'FordMustang77', price: '10 000 - 32 000 ₽', img: fordMustangImg },
];

const CarTab = () => {
  const [carClassId, setCarClassId] = useState(carClasses[0].id);
  const [carId, setCarId] = useState();

  const onRadioClick = (newCarClassId) => () => setCarClassId(newCarClassId);
  const onCarCardClick = (newCarId) => () => setCarId(newCarId);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.radioGroupContainer}>
        {carClasses.map((el) => (
          <div className={styles.radioWrapper}>
            <RadioButton
              labelText={el.text}
              onClick={onRadioClick(el.id)}
              checked={carClassId === el.id}
              key={el.id}
            />
          </div>
        ))}
      </div>

      <div className={styles.carListContainer}>
        {carCardsData.map((el) => (
          <div className={styles.cardWrapper}>
            <CarCard
              name={el.name}
              price={el.price}
              img={el.img}
              onClick={onCarCardClick(el.id)}
              isSelected={carId === el.id}
              key={el.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarTab;
