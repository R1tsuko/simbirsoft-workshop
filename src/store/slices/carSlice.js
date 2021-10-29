import { createSlice } from '@reduxjs/toolkit';
import { fetchCarCategories, fetchCars } from '../../api/orderApi';
import { pickCity, pickPoint } from './locationSlice';

const initialState = {
  categories: [],
  cars: [],
  pickedCar: null,
  isLoading: false,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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

const { setCategories, setCars, setIsLoading } = carSlice.actions;
export const { pickCar } = carSlice.actions;

export const selectCategories = (state) => state.car.categories;
export const selectCars = (state) => state.car.cars;
export const selectPickedCar = (state) => state.car.pickedCar;

export const getCarsData = () => async (dispatch, getState) => {
  if (!getState().car.cars.length) {
    dispatch(setIsLoading(true));
    const [cars, categories] = await Promise.all([fetchCars(), fetchCarCategories()]);
    dispatch(setCars(cars));
    dispatch(setCategories(categories));
    dispatch(setIsLoading(false));
  }
};

export default carSlice.reducer;
