import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLocationData,
  pickCity,
  pickPoint,
  selectCities,
  selectPickedCity,
  selectPickedPoint,
  selectPoints,
} from '../../../../../store/slices/locationSlice';
import SearchInput from '../../ui/SearchInput/SearchInput';
import YandexMap from '../../YandexMap/YandexMap';
import styles from './LocationTab.module.scss';

const LocationTab = () => {
  const cities = useSelector(selectCities);
  const points = useSelector(selectPoints);
  const dispatch = useDispatch();
  const pickedCity = useSelector(selectPickedCity);
  const pickedPoint = useSelector(selectPickedPoint);

  const citiesSearchData = cities.map((el) => el.name);
  const pointsSearchData = (
    pickedCity ? points.filter((el) => el.cityId.id === pickedCity.id) : points
  ).map((el) => el.address);

  useEffect(() => {
    dispatch(getLocationData());
  }, []);

  const onCityFinishSearch = (searchText) => {
    dispatch(pickCity(cities.find((el) => el.name === searchText)?.id));
  };

  const onPointFinishSearch = (searchText) => {
    dispatch(pickPoint(points.find((el) => el.address === searchText)?.id));
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.locationInputsWrapper}>
        <div className={styles.locationInputsContainer}>
          <div>
            <SearchInput
              labelText="Город"
              placeholder="Начните вводить город..."
              searchData={citiesSearchData}
              outerValue={pickedCity?.name}
              onFinishSearch={onCityFinishSearch}
            />
          </div>
          <div className={styles.pickUpPointWrapper}>
            <SearchInput
              labelText="Пункт выдачи"
              placeholder="Начните вводить пункт..."
              searchData={pointsSearchData}
              outerValue={pickedPoint?.address}
              onFinishSearch={onPointFinishSearch}
            />
          </div>
        </div>
      </div>

      <h2 className={styles.title}>Выбрать на карте:</h2>

      <div className={styles.mapWrapper}>
        <YandexMap />
      </div>
    </div>
  );
};

export default LocationTab;
