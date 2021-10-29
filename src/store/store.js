import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import locationReducer from './slices/locationSlice';
import extraReducer from './slices/extraSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: { location: locationReducer, car: carReducer, extra: extraReducer, order: orderReducer },
});

export default store;
