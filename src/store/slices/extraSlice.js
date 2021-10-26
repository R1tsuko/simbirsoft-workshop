import { createSlice } from '@reduxjs/toolkit';
import { fetchRates } from '../../api/orderApi';
import { DEFAULT_COLOR } from '../../utils/constants';
import { clearExtraSlice } from '../../utils/helpers';
import { pickCar } from './carSlice';
import { pickCity, pickPoint } from './locationSlice';

const initialState = {
  colors: [],
  rates: [],
  rentStart: null,
  rentEnd: null,
  isLoading: false,
  pickedRate: null,
  controlsState: {
    color: DEFAULT_COLOR,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
    rate: null,
  },
};

export const extraSlice = createSlice({
  name: 'extra',
  initialState,
  reducers: {
    setRentStart: (state, action) => {
      state.rentStart = action.payload;
    },
    setRentEnd: (state, action) => {
      state.rentEnd = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRates: (state, action) => {
      state.rates = action.payload;
    },
    setControlsState: (state, action) => {
      state.controlsState = action.payload;
    },
    pickRate: (state, action) => {
      state.pickedRate = action.payload;
    },
  },
  extraReducers: {
    [pickCar]: (state, action) => {
      clearExtraSlice(state);
      state.colors = action.payload.colors;
    },
    [pickCity]: (state) => {
      clearExtraSlice(state);
    },
    [pickPoint]: (state) => {
      clearExtraSlice(state);
    },
  },
});

const { setIsLoading, setRates } = extraSlice.actions;
export const { setRentStart, setRentEnd, setControlsState, pickRate } = extraSlice.actions;

export const selectColors = (state) => state.extra.colors;
export const selectRates = (state) => state.extra.rates;
export const selectRentStart = (state) =>
  state.extra.rentStart ? new Date(state.extra.rentStart) : null;
export const selectRentEnd = (state) =>
  state.extra.rentEnd ? new Date(state.extra.rentEnd) : null;
export const selectControlsState = (state) => state.extra.controlsState;
export const selectIsFullTank = (state) => state.extra.controlsState.isFullTank;

export const getRates = () => async (dispatch, getState) => {
  if (!getState().extra.rates.length) {
    dispatch(setIsLoading(true));
    const rates = await fetchRates();
    dispatch(setRates(rates));
    dispatch(setIsLoading(false));
  }
};

export default extraSlice.reducer;
