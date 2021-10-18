import { createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchPoints } from '../../api/orderApi';
import fetchCoordsByAddress from '../../api/ymapsApi';

const initialState = {
  cities: [],
  points: [],
  pointsCoords: [],
  citiesCoords: [],
  pickedCity: null,
  pickedPoint: null,
  isLocationDataFetching: false,
  isLocationDataCoordsFetching: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    pickCity: (state, action) => {
      const pickedCity = state.cities.find((city) => city.id === action.payload);
      state.pickedCity = pickedCity;
      state.pickedPoint = null;
    },
    pickPoint: (state, action) => {
      const pickedPoint = state.points.find((point) => point.id === action.payload);
      state.pickedPoint = pickedPoint;
      if (pickedPoint) {
        state.pickedCity = state.cities.find((city) => city.id === pickedPoint.cityId.id);
      }
    },
    setLocationDataCoords: (state, action) => {
      state.citiesCoords = action.payload.citiesCoords;
      state.pointsCoords = action.payload.pointsCoords;
    },
    setIsLocationDataCoordsFetching: (state, action) => {
      state.isLocationDataCoordsFetching = action.payload;
    },
    setLocationData: (state, action) => {
      state.cities = action.payload.cities;
      state.points = action.payload.points;
    },
    setIsLocationDataFetching: (state, action) => {
      state.isLocationDataFetching = action.payload;
    },
  },
});

const {
  setLocationDataCoords,
  setIsLocationDataCoordsFetching,
  setLocationData,
  setIsLocationDataFetching,
} = locationSlice.actions;
export const { pickCity, pickPoint } = locationSlice.actions;

export const selectCities = (state) => state.location.cities;
export const selectPoints = (state) => state.location.points;
export const selectCitiesCoords = (state) => state.location.citiesCoords;
export const selectPointsCoords = (state) => state.location.pointsCoords;
export const selectPickedCity = (state) => state.location.pickedCity;
export const selectPickedPoint = (state) => state.location.pickedPoint;
export const selectIsLocationDataFetching = (state) => state.location.isLocationDataFetching;
export const selectIsLocationDataCoordsFetching = (state) =>
  state.location.isLocationDataCoordsFetching;

export const getLocationData = () => async (dispatch, getState) => {
  if (getState().location.points.length === 0) {
    dispatch(setIsLocationDataFetching(true));

    const [points, cities] = await Promise.all([fetchPoints(), fetchCities()]);

    dispatch(setLocationData({ cities, points: points.filter((point) => point.cityId) }));
    dispatch(setIsLocationDataFetching(false));
  }
};

export const getLocationDataCoords = (ymaps) => async (dispatch, getState) => {
  if (getState().location.pointsCoords.length === 0) {
    dispatch(setIsLocationDataCoordsFetching(true));
    const cities = selectCities(getState());
    const points = selectPoints(getState());

    const citiesFetchingCoords = cities.map((city) => fetchCoordsByAddress(ymaps, `${city.name}`));
    const pointsFetchingCoords = points.map((point) =>
      fetchCoordsByAddress(ymaps, `${point.cityId.name} ${point.address}`)
    );

    const citiesCoords = (await Promise.all(citiesFetchingCoords)).map((coords, ind) => ({
      coords,
      cityId: cities[ind].id,
    }));
    const pointsCoords = (await Promise.all(pointsFetchingCoords)).map((coords, ind) => ({
      coords,
      pointId: points[ind].id,
    }));

    dispatch(setLocationDataCoords({ citiesCoords, pointsCoords }));
    dispatch(setIsLocationDataCoordsFetching(false));
  }
};

export default locationSlice.reducer;
