import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder, fetchOrderStatus, postOrder } from '../../api/orderApi';
import { findByField, chooseTimeModifier } from '../../utils/helpers';
import { CHILD_CHAIR_PRICE, FULL_TANK_PRICE, RIGHT_WHEEL_PRICE } from '../../utils/constants';
import { pickCar } from './carSlice';
import { pickCity, pickPoint } from './locationSlice';
import { pickRate, setControlsState, setRentEnd, setRentStart } from './extraSlice';

const initialState = {
  orderStatusIds: {
    confirmed: null,
  },
  isLoading: false,
  isOrderCompleted: false,
  currentOrderId: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderStatusIds: (state, action) => {
      state.orderStatusIds.confirmed = action.payload.confirmed;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentOrderId: (state, action) => {
      state.currentOrderId = action.payload;
    },
    setIsOrderCompleted: (state, action) => {
      state.isOrderCompleted = action.payload;
    },
  },
});

const { setOrderStatusIds, setIsLoading } = orderSlice.actions;
export const { setCurrentOrderId, setIsOrderCompleted } = orderSlice.actions;

export const getOrderStatusIds = () => async (dispatch, getState) => {
  if (!getState().order.orderStatusIds.confirmed) {
    dispatch(setIsLoading(true));
    const orderStatusIds = await fetchOrderStatus();
    dispatch(
      setOrderStatusIds({ confirmed: findByField(orderStatusIds, 'name', 'Подтвержденные').id })
    );
    dispatch(setIsLoading(false));
  }
};

export const makeOrder =
  ({
    city,
    point,
    car,
    color,
    dateFrom,
    dateTo,
    rate,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  }) =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const { order } = getState();
    const response = await postOrder({
      orderStatusId: { id: order.orderStatusIds.confirmed },
      cityId: { id: city.id },
      pointId: { id: point.id },
      carId: { id: car.id },
      color,
      dateFrom,
      dateTo,
      rateId: { id: rate.id },
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    });

    dispatch(setCurrentOrderId(response.id));
    dispatch(setIsOrderCompleted(true));
    dispatch(setIsLoading(false));
  };

export const getOrderData = (orderId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const {
    carId,
    cityId,
    pointId,
    color,
    dateFrom,
    dateTo,
    id,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    rateId,
  } = await fetchOrder(orderId);
  dispatch(pickCity(cityId));
  dispatch(pickPoint(pointId));
  dispatch(pickCar(carId));
  dispatch(setRentStart(dateFrom));
  dispatch(setRentEnd(dateTo));
  dispatch(setCurrentOrderId(id));
  dispatch(
    setControlsState({ color, isFullTank, isNeedChildChair, isRightWheel, rate: rateId.id })
  );
  dispatch(pickRate(rateId));
  dispatch(setIsLoading(false));
};

export const selectConfirmedOrderStatusId = (state) => state.order.confirmedOrderStatusId;
export const selectIsLoading = (state) =>
  state.location.isLoading || state.car.isLoading || state.extra.isLoading || state.order.isLoading;
export const selectCompletedSteps = (state) => {
  const { location, car, extra } = state;
  return {
    location: location.pickedPoint,
    car: car.pickedCar,
    extra: Boolean(extra.rentStart && extra.rentEnd && extra.controlsState.rate),
  };
};
export const selectOrderData = (state) => {
  const { location, car, extra } = state;

  let price = null;
  if (extra.rentEnd && extra.rentEnd && extra.pickedRate) {
    const priceWithoutCar =
      Math.ceil(
        (extra.rentEnd - extra.rentStart) / chooseTimeModifier(extra.pickedRate?.rateTypeId.unit)
      ) *
        extra.pickedRate?.price +
      extra.controlsState.isFullTank * FULL_TANK_PRICE +
      extra.controlsState.isNeedChildChair * CHILD_CHAIR_PRICE +
      extra.controlsState.isRightWheel * RIGHT_WHEEL_PRICE;
    if (priceWithoutCar > car.pickedCar.priceMin) {
      if (priceWithoutCar < car.pickedCar.priceMax) {
        price = priceWithoutCar;
      } else {
        price = car.pickedCar.priceMax;
      }
    } else {
      price = car.pickedCar.priceMin;
    }
  }
  return {
    city: location.pickedCity,
    point: location.pickedPoint,
    car: car.pickedCar,
    color: extra.controlsState.color,
    dateFrom: extra.rentStart,
    dateTo: extra.rentEnd,
    rate: extra.pickedRate,
    price,
    isFullTank: extra.controlsState.isFullTank,
    isNeedChildChair: extra.controlsState.isNeedChildChair,
    isRightWheel: extra.controlsState.isRightWheel,
  };
};
export const selectCurrentOrderId = (state) => state.order.currentOrderId;
export const selectIsOrderCompleted = (state) => state.order.isOrderCompleted;

export default orderSlice.reducer;
