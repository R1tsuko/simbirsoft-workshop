import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findByField } from '../../../../../utils/helpers';
import {
  getCarsData,
  pickCar,
  selectCars,
  selectCategories,
  selectPickedCar,
} from '../../../../../store/slices/carSlice';
import CarCard from '../../ui/CarCard/CarCard';
import RadioButton from '../../ui/RadioButton/RadioButton';
import { DEFAULT_CAR_CATEGORY_ID } from '../../../../../utils/constants';
import styles from './CarTab.module.scss';

const CarTab = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const pickedCar = useSelector(selectPickedCar);
  const cars = useSelector(selectCars);
  const [carCategoryId, setCarCategoryId] = useState(DEFAULT_CAR_CATEGORY_ID);

  const onRadioClick = (newCarCategoryId) => () => {
    setCarCategoryId(newCarCategoryId);
    dispatch(pickCar(null));
  };
  const onCarCardClick = (newCarId) => () => dispatch(pickCar(findByField(cars, 'id', newCarId)));

  useEffect(() => {
    dispatch(getCarsData());
  }, []);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.radioGroupContainer}>
        <RadioButton
          labelText="Любой"
          onChange={onRadioClick(DEFAULT_CAR_CATEGORY_ID)}
          checked={carCategoryId === DEFAULT_CAR_CATEGORY_ID}
          name="carClass"
        />
        {categories.map((el) => (
          <RadioButton
            labelText={el.name}
            onChange={onRadioClick(el.id)}
            checked={carCategoryId === el.id}
            name="carClass"
            key={el.id}
          />
        ))}
      </div>

      <div className={styles.carListContainer}>
        {cars
          .filter(
            (car) =>
              carCategoryId === DEFAULT_CAR_CATEGORY_ID || car.categoryId?.id === carCategoryId
          )
          .map((el) => (
            <div className={styles.cardWrapper} key={el.id}>
              <CarCard
                carName={el.name}
                price={`${el.priceMin} - ${el.priceMax} ₽`}
                img={el.thumbnail.path}
                onClick={onCarCardClick(el.id)}
                isSelected={pickedCar?.id === el.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarTab;
