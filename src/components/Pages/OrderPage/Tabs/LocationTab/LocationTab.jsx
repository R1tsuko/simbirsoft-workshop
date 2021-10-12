import { useState, useEffect } from 'react';
import axios from 'axios';
import { Map } from 'react-yandex-maps';
import SearchInput from '../../ui/SearchInput/SearchInput';
import styles from './LocationTab.module.scss';

const LocationTab = () => {
  const [cities, setCuties] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    axios
      .get('https://api-factory.simbirsoft1.com/api/db/city', {
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: 'Bearer e3363ae80588feb12604c114abc2e159789ad6ab',
          user_id: '5fdf6a87935d4e0be16a3e31',
        },
      })
      .then((response) => {
        setCuties(response.data.data.map((el) => el.name));
      });
    axios
      .get('https://api-factory.simbirsoft1.com/api/db/point', {
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          Authorization: 'Bearer e3363ae80588feb12604c114abc2e159789ad6ab',
          user_id: '5fdf6a87935d4e0be16a3e31',
        },
      })
      .then((response) => {
        setPoints(response.data.data.map((el) => el.address));
      });
  }, []);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.locationInputsWrapper}>
        <div className={styles.locationInputsContainer}>
          <div>
            <SearchInput
              inputId="city"
              labelText="Город"
              placeholder="Начните вводить город..."
              searchData={cities}
            />
          </div>
          <div className={styles.pickUpPointWrapper}>
            <SearchInput
              inputId="pick-up-point"
              labelText="Пункт выдачи"
              placeholder="Начните вводить пункт..."
              searchData={points}
            />
          </div>
        </div>
      </div>

      <h2 className={styles.title}>Выбрать на карте:</h2>

      <div className={styles.mapWrapper}>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default LocationTab;
