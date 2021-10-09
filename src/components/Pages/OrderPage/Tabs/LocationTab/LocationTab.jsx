import { Map } from 'react-yandex-maps';
import Input from '../../../../commonUi/Input/Input';
import styles from './LocationTab.module.scss';

const LocationTab = ({ pickUpPointSearchData, citySearchData }) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.locationInputsWrapper}>
        <div className={styles.locationInputsContainer}>
          <div>
            <Input
              inputId="city"
              labelText="Город"
              placeholder="Начните вводить город..."
              searchData={citySearchData}
            />
          </div>
          <div className={styles.pickUpPointWrapper}>
            <Input
              inputId="pick-up-point"
              labelText="Пункт выдачи"
              placeholder="Начните вводить пункт..."
              searchData={pickUpPointSearchData}
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
