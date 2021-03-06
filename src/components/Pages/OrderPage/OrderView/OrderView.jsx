import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectRentStart } from '../../../../store/slices/extraSlice';
import CarInfo from '../ui/CarInfo/CarInfo';
import styles from './OrderView.module.scss';
import {
  getOrderData,
  selectCurrentOrderStatusId,
  selectOrderStatusIds,
} from '../../../../store/slices/orderSlice';
import { selectPickedCar } from '../../../../store/slices/carSlice';

const OrderView = () => {
  const car = useSelector(selectPickedCar);
  const accessDate = useSelector(selectRentStart);
  const orderId = useLocation().pathname.split('/').pop();
  const orderStatusId = useSelector(selectCurrentOrderStatusId);
  const orderStatusIds = useSelector(selectOrderStatusIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderData(orderId));
  }, [orderId]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Ваш заказ {orderStatusId === orderStatusIds.confirmed ? 'подтверждён' : 'отменен'}
      </h2>
      <div className={styles.carInfoWrapper}>
        <CarInfo
          name={car?.name}
          number={car?.number}
          tank={car?.tank}
          img={car?.thumbnail.path}
          accessDate={accessDate}
        />
      </div>
    </section>
  );
};

export default OrderView;
