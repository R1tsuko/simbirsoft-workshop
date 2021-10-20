import { createSlice } from '@reduxjs/toolkit';
import { fetchCarCategories, fetchCars } from '../../api/orderApi';
import { pickCity, pickPoint } from './locationSlice';

const initialState = {
  categories: [],
  cars: [],
  pickedCar: null,
  isCategoriesFetching: false,
  isCarsFetching: false,
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
      state.pickedCar = action.payload;
    },
    setIsCategoriesFetching: (state, action) => {
      state.isCategoriesFetching = action.payload;
    },
    setIsCarsFetching: (state, action) => {
      state.isCarsFetching = action.payload;
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

const { setCategories, setCars, setIsCarsFetching, setIsCategoriesFetching } = carSlice.actions;
export const { pickCar } = carSlice.actions;

export const selectCategories = (state) => state.car.categories;
export const selectCars = (state) => state.car.cars;
export const selectPickedCar = (state) => state.car.pickedCar;

export const getCategories = () => async (dispatch, getState) => {
  if (getState().car.categories.length === 0) {
    dispatch(setIsCategoriesFetching(true));
    const categories = await fetchCarCategories();
    dispatch(setCategories(categories));
    dispatch(setIsCategoriesFetching(false));
  }
};
export const getCars = () => async (dispatch, getState) => {
  if (getState().car.cars.length === 0) {
    dispatch(setIsCarsFetching(true));
    const cars = await fetchCars();
    dispatch(setCars(cars));
    dispatch(setIsCarsFetching(false));
  }
};

export default carSlice.reducer;
