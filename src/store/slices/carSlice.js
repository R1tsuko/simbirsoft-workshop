import { createSlice } from '@reduxjs/toolkit';
import { fetchCarCategories, fetchCars } from '../../api/orderApi';
import { pickCity, pickPoint } from './locationSlice';

const initialState = {
  categories: [],
  cars: [],
  pickedCar: null,
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    pickCar: (state, action) => {
      state.pickedCar = state.cars.find((car) => car.id === action.payload);
    },
  },
  extraReducers: {
    [pickPoint]: (state) => {
      state.pickedCar = null;
    },
    [pickCity]: (state) => {
      state.pickedCar = null;
    },
  },
});

const { setCategories, setCars } = carSlice.actions;
export const { pickCar } = carSlice.actions;

export const selectCategories = (state) => state.car.categories;
export const selectCars = (state) => state.car.cars;
export const selectPickedCar = (state) => state.car.pickedCar;

export const getCategories = () => async (dispatch, getState) => {
  if (getState().car.categories.length === 0) {
    const categories = await fetchCarCategories();
    dispatch(setCategories(categories));
  }
};
export const getCars = () => async (dispatch, getState) => {
  if (getState().car.cars.length === 0) {
    const cars = await fetchCars();
    dispatch(setCars(cars));
  }
};

export default carSlice.reducer;
