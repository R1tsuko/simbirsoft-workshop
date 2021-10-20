import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import locationReducer from './slices/locationSlice';

const store = configureStore({
  reducer: { location: locationReducer, car: carReducer },
});

export default store;
