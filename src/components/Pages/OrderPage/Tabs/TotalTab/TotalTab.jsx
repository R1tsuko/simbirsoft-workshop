import { useSelector } from 'react-redux';
import { selectPickedCar } from '../../../../../store/slices/carSlice';
import { selectIsFullTank, selectRentStart } from '../../../../../store/slices/extraSlice';
import CarInfo from '../../ui/CarInfo/CarInfo';
import styles from './TotalTab.module.scss';

const TotalTab = () => {
  const pickedCar = useSelector(selectPickedCar);
  const rentStart = useSelector(selectRentStart);
  const isFullTank = useSelector(selectIsFullTank);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.carInfoWrapper}>
        <CarInfo
          name={pickedCar?.name}
          number={pickedCar?.number}
          tank={isFullTank ? 100 : pickedCar?.tank}
          img={pickedCar?.thumbnail.path}
          accessDate={new Date(rentStart)}
        />
      </div>
    </div>
  );
};

export default TotalTab;
